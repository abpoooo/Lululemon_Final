import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import { ThemeProvider,createTheme } from '@mui/material/styles'
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import CheckoutAction from "../../../actions/CheckoutAction";
import Payactions from '../../../actions'
import {useNavigate} from "react-router";

export const Payment =({itemList, amount}) => {
    // 打包transaction
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState({
        transactions: [{
            amount: null,
            description:'Mark2win Full Stack Developer Bootcamp Ultimate version',
            custom: '90048630024435',
            payment_options: {
                allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
            },
            soft_descriptor: 'ECHI5786786',
            item_list: {
                items: null,
                shipping_address: {
                    recipient_name: 'Mark Xu',
                    line1: '50 Acadia Ave, Markham, ON L3R 0B3',
                    line2: 'Unit #200',
                    city: 'Toronto',
                    country_code: 'CA',
                    postal_code: 'L3R 0B3',
                    phone: '6474017219',
                    state: 'Ontario'
                }
            }
        }],
        note_to_payer: 'Contact us markxu@mark2win.com for any questions on your order.'
    })
    // console.log('my amount ?', amount)
    // console.log('my itemList', itemList)


    useEffect(() => {
        setTransactions(state => (state.transactions[0].amount = amount, state))
        setTransactions(state => (state.transactions[0].item_list.items = itemList, state))
    },[itemList, amount])




    // const itemList = useSelector(state => state?.checkoutReducer?.itemList)
    const dispatch = useDispatch()
    useEffect(() => {
        window.PAYPAL.Button.render(paypalIntegrate(window.PAYPAL, () => {

        }), '#paypal-button');
    }, [])
    const paypalIntegrate = (paypal, PaymentSuccess) => {
        return {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'large',
                color: 'blue',
                shape: 'rect',
                tagline: 'false',
                label: 'paypal'
                // layout: 'vertical',
                // fundingicons: 'true',
            },
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create(transactions);
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function (res) {
                    // Show a confirmation message to the buyer
                    // call your action to tackle after payment process
                    console.log('payment returned results', res)
                    dispatch(Payactions.CheckoutAction.PaymentSuccess()) // call my PaymentSucess action
                    res.state === "approved" && navigate('/paymentSuccess');
                    res.state === "approved" && localStorage.setItem('cart', JSON.stringify([]))
                    res.state === "approved" && localStorage.setItem('bagItem', JSON.stringify([]))
                    res.state === "approved" && localStorage.setItem('cartNum', JSON.stringify(null))
                    localStorage.setItem('paymentInfo',JSON.stringify(res))
                });
            }

        }
    }


    return (
        <div id="paypal-button"></div>
    )

}