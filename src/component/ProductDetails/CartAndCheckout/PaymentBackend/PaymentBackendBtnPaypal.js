import paypalLogo from "../paypal-seeklogo.com.svg";
import {Payment} from "../Payment";
import React from "react";
import {isExpired} from "react-jwt";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
{/*Xinhan*/}

export const PaymentBackendBtnPaypal = () => {

    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    let token = localStorage.getItem('tokens') !== null && localStorage.getItem('tokens')
    const taxRate = 0.13
    const orderList = [...cart1]
    const isMyTokenExpired = isExpired(token)
    const navigate = useNavigate()

    const itemList = orderList.map(order => ({
        name: order.product,
        description: `${order.color} ${order.size}`,
        price: order?.price,
        quantity: order?.quantity,
        tax: order?.price * taxRate,
        sku: order?.productId,
        currency: 'CAD'
    }))

    const orderItems = orderList.map(order => ({
        quantity: order?.quantity,
        productId: order?.productId,
        colorId: order?.colorID,
        size: order?.size
    }))

    const initialNum = 0
    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)
    const amount = {
        total: (sumTotal + sumTotal * taxRate).toFixed(2),
        currency: 'CAD',
        details: {
            subtotal: sumTotal.toFixed(2),
            tax: (sumTotal * taxRate).toFixed(2),
        }}

    return (
        <>
            <div className='orderSummary_Btn_Paypal'>
                {isMyTokenExpired ?
                    <div className='paypal_expired'
                         onClick={() => {
                             navigate('/login')
                         }}
                    >
                        <img className="paypal_expired_Logo" width='250px' height='60px' src={paypalLogo} alt=""/>
                        The Login Session has expired, pls Login again
                    </div>
                    :
                    <Payment itemList={itemList} orderItems={orderItems} amount={amount}/>}
            </div>
        </>
    )
}

export default PaymentBackendBtnPaypal;