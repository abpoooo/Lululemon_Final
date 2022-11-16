import "./OrderHistory.scss"
import {React, useEffect, useRef, useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
// import {Divider} from "@mui/material";
// import React, { useRef } from 'react';
import {useReactToPrint} from 'react-to-print';
import {MyOrdersHistory} from "./MyOrdersHistory";
import {useNavigate} from "react-router-dom";

export const OrderHistory = () => {


    const dispatch = useDispatch()

    // console.log('order information', orderInfo)


    // const date = orderInfo[0].createAt
    // date = date.toDateString()
    // console.log('Date is',date)
    useEffect(() => {
        dispatch(actions?.toBackendAction.OrderInfo())
    }, [])
    useEffect(() => {
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    }, [])
    const orderInfo = useSelector(state => state?.toBackendReducer?.orderInfo)


    const toDate = element => {
        let date = new Date(element.createAt)
            date = date.toDateString()
            console.log(date)
        return date
    }


    // const products = orderInfo[0]?.products
    // console.log('products', products)
    // const initialNum = 0
    // const sumNum = cart1.reduce((sum, item) => {
    //     return sum + item.quantity
    // }, initialNum)
    // const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)
    // const tax = sumTotal * 0.13
    // const totalPrice = sumTotal + tax


    // const [checked,setChecked ] = useState(false)

    // const printRef = useRef()
    // const handleDownloadPdf = async () => {
    //
    //
    //     window.scrollTo(0,0)
    //     const element = printRef.current;
    //     const canvas = await html2canvas(element);
    //     const data = canvas.toDataURL('image/png');
    //
    //     const pdf = new jsPDF('p', 'pt', 'a4');
    //     const imgProperties = pdf.getImageProperties(data);
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight =
    //         (imgProperties.height * pdfWidth) / imgProperties.width;
    //
    //     pdf.addImage(data, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    //     pdf.save('print.pdf');
    //
    //
    // };

    const navigate = useNavigate()
    const elementRef = useRef()
    const elementRef1 = useRef()
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // })


    const PDFFile =  () => {
        const invoice = elementRef.current
        let PDFWidth = 1200
        let PDFHeight = 800
        console.log('invoice', invoice)
        let opt = {
            margin: 1,
            filename: 'OrderHistory.pdf',
            //Image Type
            image: {type: 'jpg', quality: 0.3},
            //useCORS is to allow to access the outside API
            html2canvas: {useCORS: true, scale: 1},
            // allowTaint: true,
            jsPDF: {unit: 'px', format: [PDFWidth, PDFHeight], orientation: 'portrait'}
        };
        orderInfo.length > 0 && orderInfo && window.html2pdf().set(opt).from(invoice).save();

    }

    const PDFFile1 =  () => {
        const invoice1 = elementRef1.current
        let PDFWidth = 1200
        let PDFHeight = 800
        console.log('invoice1', invoice1)
        let opt = {
            margin: 1,
            filename: 'OrderHistory.pdf',
            //Image Type
            image: {type: 'jpg', quality: 0.3},
            //useCORS is to allow to access the outside API
            html2canvas: {useCORS: true, scale: 1},
            // allowTaint: true,
            jsPDF: {unit: 'px', format: [PDFWidth, PDFHeight], orientation: 'portrait'}
        };
        orderInfo.length > 0 && orderInfo && window.html2pdf().set(opt).from(invoice1).save();

    }
    const pageStyle = `{ size: 2.5in 4in }`;
    const handlePrint = useReactToPrint({

        content: () => elementRef.current,
        documentTitle: 'OrderHistory.pdf',
        onAfterPrint: () => alert('Print Success'),
        pageStyle: {pageStyle}
    });
    return <>
        <div className='media' id='invoice' ref={elementRef}>
            {/*<div className='header' >*/}
            {/*    /!*<div className='logo' onClick={() =>navigate('/')}>*!/*/}
            {/*    /!*    <img src="https://s3-symbol-logo.tradingview.com/lululemon-athletica--600.png" alt=""/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <div className='headerNav'>*/}
            {/*        <ArrowBackIosIcon/>*/}
            {/*        <span style={{fontSize: '20px'}}>ORDERS</span>*/}
            {/*        <ShoppingCartOutlinedIcon/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className='timeFilter'>
                <div>
                    <input type="checkbox"
                           onChange={() => {
                               dispatch(actions?.toBackendAction.OrderInfo(2))
                           }}
                    />

                    Last 6 months
                </div>
                <label>
                    <input type="checkbox"
                           onChange={() => {
                               dispatch(actions?.toBackendAction.OrderInfo(3))
                           }
                           }
                    />
                    Last Year
                </label>
                <label>
                    <input type="checkbox"
                           onChange={() => {
                               dispatch(actions?.toBackendAction.OrderInfo(1))
                           }
                           }
                    />
                    All Time
                </label>
                {/*    {(orderInfo && orderInfo?.map((element, index)=>*/}
                {/*    // <MyOrdersHistory key={index} orderInfo={element}/>*/}
                {/*))}*/}
            </div>

            <div>
                {(orderInfo && orderInfo?.map((element, index) =>
                    // <MyOrdersHistory key={index} orderInfo={element}/>

                    <div className='orderHistory_Main'>
                        <div className='orderHistory_Main_orderDetail' key={index}>
                            <div className='orderHistory_Main_orderDetail_OrderNumber'>
                                Order Number: {element?.orderNumber}
                            </div>
                            <div className='orderHistory_Main_orderDetail_OrderDate'>
                                Order Date: {toDate(element)}
                            </div>
                            <div className='orderHistory_Main_orderDetail_OrderStatus'>
                                Order Status: {element?.orderStatus.status}
                            </div>

                            <div className='orderHistory_Main_orderDetail_ProductDetail'>
                                {element?.products && element.products.map((order, index) =>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Products' key={index}>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Products_top'>
                                            <img
                                                className='orderHistory_Main_orderDetail_ProductDetail_Products_top_images'
                                                src={order?.imageList1[0]} alt=""/>
                                        </div>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Products_name'>
                                            <div>
                                                <div>Name: {order?.product}</div>
                                                <div>Size: {order?.size}</div>
                                                <div>Color: {order?.color}</div>
                                            </div>
                                            <div
                                                className='orderHistory_Main_orderDetail_ProductDetail_Products_quantity'>
                                                Quantity: {order?.quantity}
                                            </div>
                                            <div className='orderHistory_Main_orderDetail_ProductDetail_Products_Price'>
                                                ${order?.price}
                                            </div>

                                        </div>
                                    </div>
                                )}
                                <div className='orderHistory_Main_orderDetail_ProductDetail_Total'>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Total_ItemTotal'>
                                        <div>Item Total:</div>
                                        <div>${element?.beforeTax}</div>
                                    </div>
                                    <div className="orderHistory_Main_orderDetail_ProductDetail_Total_Shipping">
                                        <div>Shipping:</div>
                                        <div className="Free">Free</div>
                                    </div>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Total_tax'>
                                        <div>Estimated Tax rate:{100 * element?.taxRate}</div>
                                        <div>${(element?.tax).toFixed(2)}</div>
                                    </div>
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Total_Subtotal'>
                                        <div>Subtotal:</div>
                                        <div>${element?.subtotal}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className='orderNumber'>
                <button type='button' id='download' onClick={() =>
                    handlePrint()
                }>
                    Download as PDF
                </button>
            </div>


            <div className="OrderHistoryFooter">
                <LocalOfferOutlinedIcon style={{color: 'white'}}/>
                <AccountCircleOutlinedIcon style={{color: 'white'}}/>
                <TravelExploreOutlinedIcon style={{color: 'white'}}/>
                <LocationOnOutlinedIcon style={{color: 'white'}}/>
                <HelpOutlineOutlinedIcon style={{color: 'white'}}/>
            </div>


        </div>









        <div id='invoice1' ref={elementRef1}>
            <div className='desktop' >


                {/*<div className='header' >*/}

                {/*    <div className='logo' onClick={() => navigate('/')}>*/}
                {/*        <img*/}
                {/*            src="data:image/png;base64,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"*/}
                {/*            alt=""/>*/}
                {/*    </div>*/}
                {/*    <div className='headerNav'>*/}
                {/*        <ArrowBackIosIcon/>*/}
                {/*        <span style={{fontSize: '20px'}}>ORDERS</span>*/}
                {/*        <ShoppingCartOutlinedIcon/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className='timeFilter'>
                    <div>
                        <input type="checkbox"
                               onChange={() => {
                                   dispatch(actions?.toBackendAction.OrderInfo(2))
                               }}
                        />

                        Last 6 months
                    </div>
                    <label>
                        <input type="checkbox"
                               onChange={() => {
                                   dispatch(actions?.toBackendAction.OrderInfo(3))
                               }
                               }
                        />
                        Last Year
                    </label>
                    <label>
                        <input type="checkbox"
                               onChange={() => {
                                   dispatch(actions?.toBackendAction.OrderInfo(1))
                               }
                               }
                        />
                        All Time
                    </label>
                    {/*    {(orderInfo && orderInfo?.map((element, index)=>*/}
                    {/*    // <MyOrdersHistory key={index} orderInfo={element}/>*/}
                    {/*))}*/}
                </div>

                <div>
                    {(orderInfo && orderInfo?.map((element, index) =>
                        // <MyOrdersHistory key={index} orderInfo={element}/>

                        <div className='orderHistory_Main'>
                            <div className='orderHistory_Main_orderDetail' key={index}>
                                <div className='orderHistory_Main_orderDetail_OrderNumber'>
                                    Order Number: {element?.orderNumber}
                                </div>
                                <div className='orderHistory_Main_orderDetail_OrderDate'>
                                    Order Date: {toDate(element)}
                                </div>
                                <div className='orderHistory_Main_orderDetail_OrderStatus'>
                                    Order Status: processing
                                </div>

                                <div className='orderHistory_Main_orderDetail_ProductDetail'>
                                    {element?.products && element.products.map((order, index) =>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Products'
                                             key={index}>
                                            <div className='orderHistory_Main_orderDetail_ProductDetail_Products_top'>
                                                <img
                                                    className='orderHistory_Main_orderDetail_ProductDetail_Products_top_images'
                                                    src={order?.imageList1[0]} alt=""/>
                                            </div>
                                            <div className='orderHistory_Main_orderDetail_ProductDetail_Products_name'>
                                                <div>
                                                    <div>Name: {order?.product}</div>
                                                    <div>Size: {order?.size}</div>
                                                    <div>Color: {order?.color}</div>
                                                </div>
                                                <div
                                                    className='orderHistory_Main_orderDetail_ProductDetail_Products_quantity'>
                                                    Quantity: {order?.quantity}
                                                </div>
                                                <div
                                                    className='orderHistory_Main_orderDetail_ProductDetail_Products_Price'>
                                                    ${order?.price}
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    <div className='orderHistory_Main_orderDetail_ProductDetail_Total'>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Total_ItemTotal'>
                                            <div>Item Total:</div>
                                            <div>${element?.beforeTax}</div>
                                        </div>
                                        <div className="orderHistory_Main_orderDetail_ProductDetail_Total_Shipping">
                                            <div>Shipping:</div>
                                            <div className="Free">Free</div>
                                        </div>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Total_tax'>
                                            <div>Estimated Tax rate:{100 * element?.taxRate}</div>
                                            <div>${(element?.tax).toFixed(2)}</div>
                                        </div>
                                        <div className='orderHistory_Main_orderDetail_ProductDetail_Total_Subtotal'>
                                            <div>Subtotal:</div>
                                            <div>${element?.subtotal}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='BTN'>
                    <button type='button' id='download' onClick={() =>
                        handlePrint()
                    }>
                        Download as PDF
                    </button>

                </div>

                <div className='orderNumber'>
                </div>
                <div className='footer'>
                    <span><strong>Contact Us</strong></span>
                    <span><strong>Live Chat</strong></span>
                    <span><strong>1.877.263.9300</strong></span>
                    <div style={{margin: "10px 0"}}>
                        {/*<Divider/>*/}
                    </div>
                    <span>Shipping Policy</span>
                    <span>Privacy Policy(Last Updated: 9/10/20)</span>
                    <span>Terms of Use</span>
                    <span>Accessibility Statement</span>
                    <p>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                </div>
            </div>
        </div>
    </>
}