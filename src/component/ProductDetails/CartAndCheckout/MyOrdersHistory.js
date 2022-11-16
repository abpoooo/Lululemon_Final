import {OrderHistory} from "./OrderHistory";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {element} from "prop-types";


export const MyOrdersHistory = ({orderInfo}) => {
    const dispatch = useDispatch()
    // const orderInfo = useSelector(state => state?.toBackendReducer?.orderInfo)
    // console.log('order information', orderInfo)
    useEffect(() => {
        dispatch(actions?.toBackendAction.OrderInfo())
    }, [])
    // useEffect(() => {
    //     dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    // }, [])

    // const products = orderInfo[0]?.products
    // console.log('products', products)


    return (
        <>
            <div className='orderHistory_Main'>
                <div className='orderHistory_Main_orderDetail'>
                    <div className='orderHistory_Main_orderDetail_OrderNumber'>
                        Order Number: {orderInfo?.orderNumber}
                    </div>
                    <div className='orderHistory_Main_orderDetail_OrderDate'>
                        Order Date: {orderInfo?.createAt}
                    </div>
                    <div className='orderHistory_Main_orderDetail_OrderStatus'>
                        Order Status: {orderInfo?.orderStatus}
                    </div>

                    <div className='orderHistory_Main_orderDetail_ProductDetail'>
                        {orderInfo?.products && orderInfo.products.map((element, index) =>
                            <div className='orderHistory_Main_orderDetail_ProductDetail_Products' key={index}>
                                <div className='orderHistory_Main_orderDetail_ProductDetail_Products_top'>
                                    <img className='orderHistory_Main_orderDetail_ProductDetail_Products_top_images'
                                         src={element?.imageList1[0]} alt=""/>
                                </div>
                                <div className='orderHistory_Main_orderDetail_ProductDetail_Products_name'>
                                    <div>
                                        <div>Size: {element?.size}</div>
                                        <div>Name: {element?.product}</div>
                                        <div>Color: {element?.color}</div>
                                    </div>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Products_quantity'>
                                        Quantity: {element?.quantity}
                                    </div>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Products_Price'>
                                        ${element?.price}
                                    </div>

                                </div>
                            </div>
                        )}
                        <div className='orderHistory_Main_orderDetail_ProductDetail_Total'>
                            <div className='orderHistory_Main_orderDetail_ProductDetail_Total_ItemTotal'>
                                <div>Item Total:</div>
                                <div>${orderInfo?.beforeTax}</div>
                            </div>
                            <div className="orderHistory_Main_orderDetail_ProductDetail_Total_Shipping">
                                <div>Shipping:</div>
                                <div className="Free">Free</div>
                            </div>
                            <div className='orderHistory_Main_orderDetail_ProductDetail_Total_tax'>
                                <div>Estimated Tax rate:{100 * orderInfo?.taxRate}</div>
                                <div>${orderInfo?.tax}</div>
                            </div>
                            <div className='orderHistory_Main_orderDetail_ProductDetail_Total_Subtotal'>
                                <div>Subtotal:</div>
                                <div>${orderInfo?.subtotal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>)}

