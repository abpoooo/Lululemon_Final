import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";
import './Scss/HoverDropDetail.scss'



export const HoverDropDetail =()=> {

    const dispatch = useDispatch()
    const [productID, setProductID] = useState(null)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [isRemove, setIsRemove] = useState(false)
    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    const [carts, setCarts] = useState(cart1)
    useEffect(() => setCarts(cart1), [cart1])

    const removeProduct = () => {
        let removeCart = [...cart1]
        let findIndex = removeCart.find(cartItem => cartItem?.productId === productID && cartItem?.colorId === color && cartItem?.size === size)
        removeCart = removeCart.filter(item => item !== findIndex)
        localStorage.setItem('cart', JSON.stringify(removeCart))
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    }
    const initialNum = 0
    const sumNum = cart1.reduce((sum, item) => {
        return sum + item.quantity
    }, initialNum)
    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)



    return(
        <>
            <div className="shopBagListContent">

                {cart1.map((element, index) =>
                    <div className='orderDetails' key={index} style={{display:"flex", margin:'10px'}}>
                        <div className='checkout_img' style={{ margin:'0'}} >
                            <img src={element.src} width='70px'  alt=""/>
                        </div>
                        <div className='checkout_info' style={{position:"relative"}} >
                            <p className='checkout_info_productName' style={{fontSize:'14px', fontWeight:"bold", width:'200px'}} >{element.product}</p>
                            <p className='checkout_info_color'style={{fontSize:'12px'}}>{element.color}</p>
                            <p style={{fontSize:'12px'}}>Size {element.size} </p>
                            <p style={{fontSize:'12px'}}>Quantity {element.quantity}</p>
                            <p style={{fontSize:'12px', position:"absolute", bottom:'23px', right:0}}>${element.price * (element.quantity)}</p>
                            <span style={{position:"absolute", top:0, right:0}}

                                  onClick={() => {
                                      setIsRemove(!isRemove)
                                      setProductID(element.productId)
                                      setColor(element.colorId)
                                      setSize(element?.size)
                                      removeProduct(cart1)
                                  }}
                            >x</span>
                        </div>
                    </div>
                )}
                <Divider/>
                <div style={{display:'flex', position:"relative", margin:'10px 0 10px 10px'}}>
                    <span style={{fontSize:'12px', fontWeight:'bold'}}>Subtotal({sumNum} {sumNum > 1 ? "Items" : "Item"})</span>
                    <span style={{fontSize:'12px', fontWeight:'bold', position:"absolute",  right:'10px'}}>${sumTotal}.00</span>
                </div>
                <div style={{display:'flex', position:"relative", margin:'10px 0 10px 10px'}}>
                    <span style={{fontSize:'12px', fontWeight:'bold'}}>Shipping</span>
                    <span style={{fontSize:'12px', fontWeight:'bold', position:"absolute",  right:'10px'}}>FREE</span>
                </div>

                <div style={{margin:'20px'}}>
                    <Link to={`/login`}>
                        <button className='checkoutBTN'
                        >VIEW BAG & CHECKOUT</button>
                    </Link>
                </div>
            </div>
        </>
    )
}