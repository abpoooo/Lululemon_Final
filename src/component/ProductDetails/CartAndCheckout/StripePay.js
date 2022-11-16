import React, {useEffect, useState} from "react";
// import "./StripePay.css"
import {useStripe, useElements, PaymentElement,Elements, CardElement} from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';
import {CheckoutForm} from "./CheckoutForm"
import {useSelector} from "react-redux";


const stripeAPIKey = 'pk_test_51LwXYfKsWwHv6sipXnRAUm83zZGDf5aL6jW7TbJa2HCUbmlEJweAwy3aFXLlyVIK98OxHyRGF3tekMWdquPE2lOq008KEFI5vi'
const stripeTestPromise = loadStripe(stripeAPIKey)




export const StripePay = () => {

    const [clientSecret, setClientSecret] = useState("");

    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    const initialNum = 0
    const sumNum = cart1.reduce((sum, item) => {
        return sum + item.quantity
    }, initialNum)

    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)
    useEffect(() => {
        fetch("/stripe12", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                total: sumTotal*100
            }),
        }).then(async (result) => {
            let {clientSecret} = await result.json();
            setClientSecret(clientSecret);
            console.log(clientSecret)
            console.log(result)
        });
    }, []);
    return (<>
            {/*<div className="addCard"></div>*/}
            {clientSecret &&(
            <Elements stripe={stripeTestPromise} options={{clientSecret}}>
                <CheckoutForm />
            </Elements>)}
        </>
    )}
