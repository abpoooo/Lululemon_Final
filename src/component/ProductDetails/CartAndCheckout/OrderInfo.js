
import {MenuItem, Divider} from "@mui/material";
import React, {useState, useEffect} from "react";
import Select from "@mui/material/Select";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import toBackendAction from "../../../actions/toBackendAction";
import actions from "../../../actions";
import {element} from "prop-types";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './OrderInfo.scss'


export const OrderInfo = () => {


    // environment
    const navigate = useNavigate()
    const dispatch = useDispatch()
// email
    const [email, setEmail] = useState("")
    const [isEmailEntered, setIsEmailEntered] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)

    function emailValidate(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        setIsEmailEntered(true)
        emailValidate(email) ? setIsEmailValid(true) : setIsEmailValid(false)
        console.log('email', e.target.value)
        setOrders(prevState => ({
            ...prevState,
            email: email                                                       //newly added
        }))

    };

    // firstName, lastName, Address, city, province, postalCode, phoneNumber
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [postalCode, setPostCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    // object package
    const [orders, setOrders] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city:'',
        province: '',
        postalCode: '',
        phoneNumber: 0
    })

    localStorage.setItem('info', JSON.stringify(orders))
    let Info = JSON.parse(localStorage.getItem('info'))
    console.log('information shipping address', Info)                                //newly added


    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName)
        console.log('firstName', firstName)
        setOrders(prevState => ({
            ...prevState,
            firstName: firstName
        }))                                                            //newly added
    }

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName)
        console.log('lastName', lastName)
        setOrders(prevState => ({
            ...prevState,
            lastName: lastName
        }))                                                            //newly added
    }

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address)
        console.log('address', address)
        setOrders(prevState => ({
            ...prevState,
            Address: address
        }))                                                           //newly added
    }

    const onChangeCity = (e) => {
        const city = e.target.value;
        setCity(city)
        console.log('city', city)
        setOrders(prevState => ({
            ...prevState,
            City: city
        }))                                                           //newly added
    }

    const onChangeProvince = (e) => {
        const province = e.target.value;
        setProvince(province)
        console.log('province', province)
        setOrders(prevState => ({
            ...prevState,
            Province: province
        }))                                                           //newly added
    }

    const onChangePostCode = (e) => {
        const postCode = e.target.value;
        setPostCode(postCode)
        console.log('postCode', postCode)
        setOrders(prevState => ({
            ...prevState,
            PostalCode: postCode
        }))                                                           //newly added
    }

    const onChangePhoneNumber = (e) => {
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber)
        console.log('phone number', phoneNumber)
        setOrders(prevState => ({
            ...prevState,
            PhoneNumber: phoneNumber
        }))                                                           //newly added
    }

    //junkai edit

    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    const [carts, setCarts] = useState(cart1)
    useEffect(() => setCarts(cart1), [cart1])
    // let cartCopy = JSON.parse(localStorage.getItem('cart'))

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

    //junkai edit



    // //junkai edit
    // const cart = JSON.parse(localStorage.getItem('cart'))
    // const order = useSelector(state => state?.checkoutReducer?.orderList)
    //
    // const [productID, setProductID] = useState(null)
    // const [color, setColor] = useState(null)
    // const [size, setSize] = useState(null)
    // const [isRemove, setIsRemove] = useState(false)
    // const [quantity, setQuantity] = useState(null)
    // let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    // const [carts, setCarts] = useState(cart1)
    // useEffect(() => setCarts(cart1), [cart1])
    // let cartCopy = JSON.parse(localStorage.getItem('cart'))
    //
    // useEffect(() => {
    //     dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    // }, [])
    //
    // const initialNum = 0
    // const sumNum = cart1.reduce((sum, item) => {
    //     return sum + item.quantity
    // }, initialNum)
    // const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)
    //
    // const [openState, setOpenState] = useState(true)
    // const [show, setShow] = useState(false)
    //
    // const expendProductDetail = () => {
    //     setShow(!show)
    //     setOpenState(!openState)
    // }
    //
    // //junkai edit

    return (
        <>
            <div className='CheckoutShipping'>
                <div className='logoContainer'>
                    <img className='logo'
                         src="data:image/png;base64,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"
                         alt=""/>
                </div>
                <h2 className='Checkout_Big'>
                    Checkout
                </h2>

                <div className='CheckoutShipping_Main'>
                    <div className='CheckoutShipping_Main_Info'>
                        <div className='CheckoutShipping_Main_Info_Contact'>
                            <h2>
                                Contact information
                            </h2>
                            <label>Email address (for order notification)</label>
                            <div className='CheckoutShipping_Main_Info_Contact_email'>
                                <input type="text" name='email' id='input' value={email}
                                       onChange={onChangeEmail}/>
                            </div>
                            <div className='CheckoutShipping_Main_Info_Contact_SignIn'>
                                <input type='checkbox' id='myCheck'/>
                                <span>Sign me up for lululemon emails(you can unsubscribe at any time).
                            See our privacy policy for details.</span>
                            </div>
                        </div>

                        <div className='CheckoutShipping_Main_Info_Shipping'>
                            <h2>
                                Shipping Address
                            </h2>
                            <div className='CheckoutShipping_Main_Info_Shipping_Names'>

                                <div className='CheckoutShipping_Main_Info_Shipping_Names_first'>
                                    <label>First Name</label>
                                    <input type="text" name='firstName' id='input' value={firstName}
                                           onChange={onChangeFirstName}/>
                                </div>

                                <div className='CheckoutShipping_Main_Info_Shipping_Names_last'>
                                    <label>Last Name</label>
                                    <input type="text" name='lastName' id='input' value={lastName}
                                           onChange={onChangeLastName}/>
                                </div>
                            </div>


                            <div className='CheckoutShipping_Main_Info_Shipping_PhoneNumber'>
                                <label>Phone Number</label>
                                <input type="text" name='phoneNumber' id='input' value={phoneNumber}
                                       onChange={onChangePhoneNumber}/>
                                <p >This will be only used for delivery related issues.</p>
                            </div>



                            <div className='CheckoutShipping_Main_Info_Shipping_Address'>
                                <label>Address</label>
                                <input type="text" name='address' id='input' value={address}
                                       onChange={onChangeAddress}/>
                            </div>

                            <div className='CheckoutShipping_Main_Info_Shipping_Location'>

                                <div className='CheckoutShipping_Main_Info_Shipping_Location_City'>
                                    <label>City</label>
                                    <input type="text" name='city' id='input' value={city}
                                           onChange={onChangeCity}/>
                                </div>


                                <div
                                    className='CheckoutShipping_Main_Info_Shipping_Location_Province'>
                                    <label>Province</label>
                                    <Select
                                        labelId='CheckoutShipping_Main_Info_Shipping_Location_Province_label'
                                        value={province}
                                        onChange={onChangeProvince}
                                    >
                                        <MenuItem value={'Select'}>Select..</MenuItem>
                                        <MenuItem value={"Alberta"}>Alberta</MenuItem>
                                        <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
                                        <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
                                        <MenuItem value={"New Brunswick"}>New Brunswick</MenuItem>
                                        <MenuItem value={"NewFoundLand and Labour"}>NewFoundLand and Labour</MenuItem>
                                        <MenuItem value={"Northwest Territories"}>Northwest Territories</MenuItem>
                                        <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
                                        <MenuItem value={"Nunavut"}>Nunavut</MenuItem>
                                        <MenuItem value={"Ontario"}>Ontario</MenuItem>
                                        <MenuItem value={"Prince Edward Island"}>Prince Edward Island</MenuItem>
                                        <MenuItem value={"Quebec"}>Quebec</MenuItem>
                                        <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
                                        <MenuItem value={"Yukon Territory"}>Yukon Territory</MenuItem>
                                    </Select>
                                </div>

                                <div className='CheckoutShipping_Main_Info_Shipping_Location_PostalCode'>
                                    <label>Postal Code</label>
                                    <input type="text" name='postCode' id='input' value={postalCode}
                                           onChange={onChangePostCode}/>
                                </div>
                            </div>
                        </div>

                        <div className='CheckoutShipping_Main_Info_Gift'>
                            <div className='Gift_Heading'>
                                <h2>
                                    Shipping & gift options
                                </h2>
                                <button>Change</button>
                            </div>

                            <h4>2-6 business days</h4>
                            <p>Standard Shipping <strong>(FREE)</strong></p>
                            <div className='CheckoutShipping_Main_Info_Gift_Message'>
                                <input type='checkbox' id='myCheck'/>
                                <span>This is a gift, add a message</span>
                            </div>
                        </div>


                        <div className='CheckoutShipping_Main_Info_Next'>
                            <button onClick={() => {
                                navigate('/stripe')
                                dispatch(actions.toBackendAction.Shipping())
                            }}>
                                GO TO NEXT STEP
                            </button>
                            <p>Proceed to step 2 of 3</p>
                        </div>

                    </div>

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
                    {/*junkai*/}


                    {/*/!*junkai*!/*/}
                    {/*<div className='CheckoutShipping_Main_Orders'>*/}
                    {/*    <h3>Order summary</h3>*/}
                    {/*    <div className='checkoutShipping_Main_Orders_ItemsAndTotal'*/}
                    {/*         style={{*/}
                    {/*             display: 'flex',*/}
                    {/*             justifyContent: 'space-between',*/}
                    {/*             alignItems: 'center',*/}
                    {/*             paddingBottom: '7px',*/}
                    {/*         }}>*/}

                    {/*        <div style={{display: 'flex', alignItems: 'center'}}>*/}
                    {/*            <ShoppingBagOutlinedIcon/>*/}
                    {/*            <span> {sumNum} items</span>*/}
                    {/*            <KeyboardArrowUpIcon onClick={()=>expendProductDetail()}/>*/}
                    {/*        </div>*/}
                    {/*        <span>${sumTotal}</span>*/}
                    {/*    </div>*/}
                    {/*    {show &&  <div className='CheckoutShipping_Main_Orders_ProductDetailContainer'*/}
                    {/*                   style={{*/}
                    {/*                       borderBottom: 'lightgrey solid 1px',*/}
                    {/*                       borderTop: 'lightgrey solid 1px',*/}
                    {/*                       maxHeight:'484px',*/}
                    {/*                       overflow:"hidden",*/}
                    {/*                       overflowY:"scroll"*/}
                    {/*                   }}>*/}
                    {/*        {cart1.map((element, index) =>*/}
                    {/*            <div className='orderDetails' key={index}*/}
                    {/*                 style={{display: "flex", margin: '10px 0px 10px 0px'}}>*/}
                    {/*                <div className='checkout_img' style={{margin: '0'}}>*/}
                    {/*                    <img src={element.src} width='60px' alt=""/>*/}
                    {/*                </div>*/}
                    {/*                <div className='checkout_info' style={{position: "relative"}}>*/}
                    {/*                    <p className='checkout_info_productName' style={{*/}
                    {/*                        fontSize: '14px',*/}
                    {/*                        fontWeight: "bold",*/}
                    {/*                        width: '200px'*/}
                    {/*                    }}>{element.product}</p>*/}
                    {/*                    <p className='checkout_info_color' style={{fontSize: '12px'}}>{element.color}</p>*/}
                    {/*                    <p style={{fontSize: '12px'}}>Size {element.size} </p>*/}
                    {/*                    <p style={{fontSize: '12px'}}>Quantity {element.quantity}</p>*/}
                    {/*                    <p style={{*/}
                    {/*                        fontSize: '12px',*/}
                    {/*                        position: "absolute",*/}
                    {/*                        bottom: '23px',*/}
                    {/*                        right: 0*/}
                    {/*                    }}>${element.price * (element.quantity)}</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div> }*/}
                    {/*    /!*div to be clicked to open*!/*/}



                    {/*    <div className='CheckoutShipping_Main_Orders_Subtotal' style={{borderBottom:'lightgrey 1px solid'}}>*/}
                    {/*        <div style={{display: 'flex', position: "relative", margin: '10px 0 10px 0px'}}>*/}
                    {/*            <span style={{ fontSize:'10px'}} >Subtotal</span>*/}
                    {/*            <span style={{ fontSize:'10px',position: "absolute", right: '0px'}}>${sumTotal}</span>*/}
                    {/*        </div>*/}
                    {/*        <div style={{display: 'flex', position: "relative", margin: '10px 0 10px 0px'}}>*/}
                    {/*            <span style={{ fontSize:'10px'}} >Shipping</span>*/}
                    {/*            <span style={{ fontSize:'10px',position: "absolute", right: '0px'}}>FREE</span>*/}
                    {/*        </div>*/}
                    {/*        <div style={{display: 'flex', position: "relative", margin: '10px 0 10px 0px'}}>*/}
                    {/*            <span style={{ fontSize:'10px'}}>Tax</span>*/}
                    {/*            <span style={{ fontSize:'10px', position: "absolute", right: '0px'}}>Calculated at next step</span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div style={{display: 'flex', position: "relative", margin: '10px 0 10px 0px'}}>*/}
                    {/*        <span style={{ fontSize:'12px', fontWeight:"bold"}}>Order Total</span>*/}
                    {/*        <span style={{ fontSize:'12px', fontWeight:'bold' ,position: "absolute", right: '0px'}}>CAD $ {sumTotal}.00</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*junkai*!/*/}

                    {/*<div className='CheckoutShipping_Main_Orders'>*/}

                    {/*</div>*/}
                </div>

                <div className='footer'>
                    <span><strong>Contact Us</strong></span>
                    <span><strong>Live Chat</strong></span>
                    <span><strong>1.877.263.9300</strong></span>
                    <div style={{margin: "10px 0"}}>
                        <Divider/>
                    </div>
                    <span>Shipping Policy</span>
                    <span>Privacy Policy(Last Updated: 9/10/20)</span>
                    <span>Terms of Use</span>
                    <span>Accessibility Statement</span>
                    <p>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                </div>

            </div>


            {/*//Media Responsive*/}

            <div className='Media_CheckoutShipping'>
                <div className='logoContainer'>
                    <img className='logo'
                         src="data:image/png;base64,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"
                         alt=""/>
                    <br/>
                </div>
                {/*<h2 className='Checkout_Big'>*/}
                {/*    Checkout*/}
                {/*</h2>*/}

                <div className='CheckoutShipping_Main'>
                    <div className='CheckoutShipping_Main_Info'>

                        <div className='CheckoutShipping_Main_Orders'>
                            {/*<h3>Order summary</h3>*/}
                            <div className='CheckoutShipping_Main_Orders_ItemsAndTotal'>
                                <div>
                                    <ShoppingBagOutlinedIcon/>
                                    <span> {sumNum} items</span>
                                    <div onClick={()=>expendProductDetail()}>
                                        {(openState ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>)}

                                    </div>

                                </div>
                                <span><strong>${sumTotal}.00</strong></span>
                            </div>
                            {show &&
                                <div className='CheckoutShipping_Main_Orders_ProductDetailContainer'>
                                    {cart1.map((element, index) =>
                                        <div className='orderDetails' key={index}>
                                            <div className='checkout_img'>
                                                <img src={element.src} width='80px' alt=""/>
                                            </div>
                                            <div className='checkout_info'>
                                                <p className='checkout_info_productName'
                                                >{element.product}</p>
                                                <p className='checkout_info_color' >{element.color}</p>
                                                <p >Size {element.size} </p>
                                                <p >Quantity {element.quantity}</p>
                                                <p className='checkout_info_quantity'>${element.price * (element.quantity)}.00</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            {/*div to be clicked to open*/}
                        </div>


                        <div className='CheckoutShipping_Main_Info_Contact'>
                            <h2>
                                Contact information
                            </h2>
                            <label>Email address (for order notification)</label>
                            <div className='CheckoutShipping_Main_Info_Contact_email'>
                                <input type="text" name='email' id='input' value={email}
                                       onChange={onChangeEmail}/>
                            </div>
                            <div className='CheckoutShipping_Main_Info_Contact_SignIn'>
                                <input type='checkbox' id='myCheck'/>
                                <span>Sign me up for lululemon emails(you can unsubscribe at any time).
                            See our privacy policy for details.</span>
                            </div>
                        </div>

                        <div className='CheckoutShipping_Main_Info_Shipping'>
                            <h2>
                                Shipping Address
                            </h2>
                            <div className='CheckoutShipping_Main_Info_Shipping_Names'>

                                <div className='CheckoutShipping_Main_Info_Shipping_Names_first'>
                                    <label>First Name</label>
                                    <input type="text" name='firstName' id='input' value={firstName}
                                           onChange={onChangeFirstName}/>
                                </div>

                                <div className='CheckoutShipping_Main_Info_Shipping_Names_last'>
                                    <label>Last Name</label>
                                    <input type="text" name='lastName' id='input' value={lastName}
                                           onChange={onChangeLastName}/>
                                </div>
                            </div>


                            <div className='CheckoutShipping_Main_Info_Shipping_PhoneNumber'>
                                <label>Phone Number</label>
                                <input type="text" name='phoneNumber' id='input' value={phoneNumber}
                                       onChange={onChangePhoneNumber}/>
                                <p >This will be only used for delivery related issues.</p>
                            </div>



                            <div className='CheckoutShipping_Main_Info_Shipping_Address'>
                                <label>Address</label>
                                <input type="text" name='address' id='input' value={address}
                                       onChange={onChangeAddress}/>
                            </div>

                            <div className='CheckoutShipping_Main_Info_Shipping_Location'>

                                <div className='CheckoutShipping_Main_Info_Shipping_Location_City'>
                                    <label>City</label>
                                    <input type="text" name='city' id='input' value={city}
                                           onChange={onChangeCity}/>
                                </div>


                                <div
                                    className='CheckoutShipping_Main_Info_Shipping_Location_Province'>
                                    <label>Province</label>
                                    <Select
                                        labelId='CheckoutShipping_Main_Info_Shipping_Location_Province_label'
                                        value={province}
                                        onChange={onChangeProvince}
                                    >
                                        <MenuItem value={'Select'}>Select..</MenuItem>
                                        <MenuItem value={"Alberta"}>Alberta</MenuItem>
                                        <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
                                        <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
                                        <MenuItem value={"New Brunswick"}>New Brunswick</MenuItem>
                                        <MenuItem value={"NewFoundLand and Labour"}>NewFoundLand and Labour</MenuItem>
                                        <MenuItem value={"Northwest Territories"}>Northwest Territories</MenuItem>
                                        <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
                                        <MenuItem value={"Nunavut"}>Nunavut</MenuItem>
                                        <MenuItem value={"Ontario"}>Ontario</MenuItem>
                                        <MenuItem value={"Prince Edward Island"}>Prince Edward Island</MenuItem>
                                        <MenuItem value={"Quebec"}>Quebec</MenuItem>
                                        <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
                                        <MenuItem value={"Yukon Territory"}>Yukon Territory</MenuItem>
                                    </Select>
                                </div>

                                <div className='CheckoutShipping_Main_Info_Shipping_Location_PostalCode'>
                                    <label>Postal Code</label>
                                    <input type="text" name='postCode' id='input' value={postalCode}
                                           onChange={onChangePostCode}/>
                                </div>
                            </div>
                        </div>

                        <div className='CheckoutShipping_Main_Info_Gift'>
                            <div className='Gift_Heading'>
                                <h2>
                                    Shipping & gift options
                                </h2>
                                <button>Change</button>
                            </div>

                            <h4>2-6 business days</h4>
                            <p>Standard Shipping <strong>(FREE)</strong></p>
                            <div className='CheckoutShipping_Main_Info_Gift_Message'>
                                <input type='checkbox' id='myCheck'/>
                                <span>This is a gift, add a message.</span>
                            </div>
                        </div>


                        <div className='CheckoutShipping_Main_Info_Next'>
                            <button onClick={() => {
                                navigate('/billing')
                                dispatch(actions.toBackendAction.Shipping())
                            }}>
                                GO TO NEXT STEP
                            </button>
                            <p>Proceed to step 2 of 3</p>
                        </div>

                    </div>

                    {/*junkai*/}
                    <div className='CheckoutShipping_Main_Orders'>
                        {/*/!*<h3>Order summary</h3>*!/*/}
                        {/*<div className='CheckoutShipping_Main_Orders_ItemsAndTotal'>*/}
                        {/*    <div>*/}
                        {/*        <ShoppingBagOutlinedIcon/>*/}
                        {/*        <span> {sumNum} items</span>*/}
                        {/*        <div onClick={()=>expendProductDetail()}>*/}
                        {/*            {(openState ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>)}*/}

                        {/*        </div>*/}

                        {/*    </div>*/}
                        {/*    <span>${sumTotal}</span>*/}
                        {/*</div>*/}
                        {/*{show &&*/}
                        {/*    <div className='CheckoutShipping_Main_Orders_ProductDetailContainer'>*/}
                        {/*        {cart1.map((element, index) =>*/}
                        {/*            <div className='orderDetails' key={index}>*/}
                        {/*                <div className='checkout_img'>*/}
                        {/*                    <img src={element.src} width='60px' alt=""/>*/}
                        {/*                </div>*/}
                        {/*                <div className='checkout_info'>*/}
                        {/*                    <p className='checkout_info_productName'*/}
                        {/*                    >{element.product}</p>*/}
                        {/*                    <p className='checkout_info_color' >{element.color}</p>*/}
                        {/*                    <p >Size {element.size} </p>*/}
                        {/*                    <p >Quantity {element.quantity}</p>*/}
                        {/*                    <p className='checkout_info_quantity'>${element.price * (element.quantity)}</p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {/*/!*div to be clicked to open*!/*/}

                        <div className='CheckoutShipping_Main_Orders_Subtotal'>
                            <div >
                                <span >Subtotal</span>
                                <p >${sumTotal}.00</p>
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
                        <div className='CheckoutShipping_Main_Orders_OrderTotal'>
                        <span
                        >Order Total</span>
                            <p
                            >CAD $ {sumTotal}.00</p>
                        </div>
                    </div>
                    {/*junkai*/}

                </div>

                <div className='footer'>
                    <span><strong>Contact Us</strong></span>
                    <span><strong>Live Chat</strong></span>
                    <span><strong>1.877.263.9300</strong></span>
                    <div style={{margin: "10px 0"}}>
                        <Divider/>
                    </div>
                    <span>Shipping Policy</span>
                    <span>Privacy Policy(Last Updated: 9/10/20)</span>
                    <span>Terms of Use</span>
                    <span>Accessibility Statement</span>
                    <p>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                </div>

            </div>

        </>

    )
}