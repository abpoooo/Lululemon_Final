import { PaymentElement } from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {loadStripe} from '@stripe/stripe-js';
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";


export const CheckoutForm = () =>{


    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const orderList = JSON.parse(localStorage.getItem('cart'))
    console.log('order list ', orderList)


    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    let totalQuantity = JSON.parse(localStorage.getItem('cartNum'))
    console.log(totalQuantity)
    const initialNum = 0
    const sumNum = cart1.reduce((sum, item) => {
        return sum + item.quantity
    }, initialNum)

    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)

    console.log('subtotal', sumTotal)

    let navigate = useNavigate()

    let successMessage = useSelector(state => state.checkoutReducer.successMessage)

    useEffect(() => {
        console.log(successMessage)
        successMessage && navigate('/succeed')
    },[successMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/succeed`,
            },
            redirect: "if_required"
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment status:" +paymentIntent.status)
            // payment to db
            // await dispatch(actions?.toBackendAction?.OrderInfo(6))
            await dispatch(actions.toBackendAction?.TransactionId(paymentIntent.id))
            console.log('payment method', paymentIntent)
            fetch(`/stripe12/${paymentIntent.payment_method}`).then(async (r) => {
                const {payment} = await r.json()
                console.log(payment)


                // call api
                try {
                    let res = await axios({
                        method: 'post',
                        url: "http://localhost:3001/payment",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "cardNumber": payment.last4,
                            "expiryMonth": payment.exp_month,
                            "expiryYear": payment.exp_year,
                            "status": 2,
                            "types": 2
                        })
                    })

                    const {data: {data}} = res

                    try {
                        await axios({
                            method: 'post',
                            url: "http://localhost:3001/order",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                "beforeTax": sumTotal,
                                "taxRate": 0.13,
                                "tax": sumTotal * 0.13,
                                "quantity": totalQuantity,
                                "subtotal": sumTotal + sumTotal * 0.13,
                                "products": orderList,
                                "orderStatus": 1,
                                "payment": 2
                            })
                        })


                    } catch (e) {
                        console.log(e)
                    }

                    dispatch(actions.CheckoutAction.PaymentSuccess())
                }catch (e){
                    console.log(e)
                }

            })
            // order to db
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}