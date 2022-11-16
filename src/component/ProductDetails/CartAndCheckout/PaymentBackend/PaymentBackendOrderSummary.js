import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../actions";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {OrderInfo} from "../OrderInfo";
const PaymentBackendOrderSummary = () => {

    const dispatch = useDispatch()

    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    const [carts, setCarts] = useState(cart1)
    useEffect(() => setCarts(cart1), [cart1])
    let cartCopy = JSON.parse(localStorage.getItem('cart'))

    useEffect(() => {
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    }, [])

    const initialNum = 0
    const sumNum = cart1.reduce((sum, item) => {
        return sum + item.quantity
    }, initialNum)
    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)

    const [show, setShow] = useState(true)
    const [openState, setOpenState] = useState(true)

    const expendProductDetail = () => {
        setShow(!show)
        setOpenState(!openState)
    }

    return (
        <>
            {/*junkai*/}
            <div className='CheckoutShipping_Main_Orders'>
                <h3>Order summary</h3>
                <div className='CheckoutShipping_Main_Orders_ItemsAndTotal'>
                    <div>
                        <ShoppingBagOutlinedIcon/>
                        <span> {sumNum} items</span>
                        <div onClick={()=>expendProductDetail()}>
                            {(openState ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>)}

                        </div>

                    </div>
                    <span>${sumTotal}</span>
                </div>
                {show &&
                    <div className='CheckoutShipping_Main_Orders_ProductDetailContainer'>
                        {cart1.map((element, index) =>
                            <div className='orderDetails' key={index}>
                                <div className='checkout_img'>
                                    <img src={element.src} width='60px' alt=""/>
                                </div>
                                <div className='checkout_info'>
                                    <p className='checkout_info_productName'
                                    >{element.product}</p>
                                    <p className='checkout_info_color' >{element.color}</p>
                                    <p >Size {element.size} </p>
                                    <p >Quantity {element.quantity}</p>
                                    <p className='checkout_info_quantity'>${element.price * (element.quantity)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {/*div to be clicked to open*/}

                <div className='CheckoutShipping_Main_Orders_Subtotal'
                >
                    <div >
                        <span >Subtotal</span>
                        <p >${sumTotal}</p>
                    </div>
                    <div >
                        <span  >Shipping</span>
                        <p>FREE</p>
                    </div>
                    <div >
                        <span >Tax</span>
                        <p>Calculated at next step</p>
                    </div>
                </div>
                <div className='CheckoutShipping_Main_Orders_OrderTotal'
                >
                        <span
                        >Order Total</span>
                    <p
                    >CAD $ {sumTotal}.00</p>
                </div>
            </div>
        </>
    )
}

export default PaymentBackendOrderSummary;