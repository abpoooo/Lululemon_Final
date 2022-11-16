
import {Divider} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './checkout.scss'
import {useEffect} from "react";
import actions from "../../../actions";
import {Payment} from "./Payment";
import Select from '@mui/material/Select'
import {InputLabel, MenuItem} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {Edit} from "./Edit";
import {isExpired, useJwt} from "react-jwt";
import {useNavigate} from "react-router-dom";
import paypalLogo from './paypal-seeklogo.com.svg';


export const Checkout = () => {

    const cart = JSON.parse(localStorage.getItem('cart'))
    const order = useSelector(state => state?.checkoutReducer?.orderList)
    // console.log('order list is',order)

    // console.log('my cart for order',cart)
    const image11 = cart.src
    // console.log('src is ', image11)
    const dispatch = useDispatch()
    // dispatch()
    // useEffect(() => dispatch(actions?.CheckoutAction?.orderList(cart)), [])

///////////////////////

    const [productID, setProductID] = useState(null)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [isRemove, setIsRemove] = useState(false)
    const [quantity, setQuantity] = useState(null)
    let cart1 = useSelector(state => state.checkoutReducer?.cart1)
    const [carts, setCarts] = useState(cart1)
    useEffect(() => setCarts(cart1), [cart1])
    let cartCopy = JSON.parse(localStorage.getItem('cart'))

    useEffect(() => {
        // window.addEventListener('click', () => {
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
        // })
    }, [])

    // remove

    const removeProduct = () => {
        let removeCart = [...cart1]
        let findIndex = removeCart.find(cartItem => cartItem?.productId === productID && cartItem?.colorId === color && cartItem?.size === size)
        // findIndex.remove = isRemove
        removeCart = removeCart.filter(item => item !== findIndex)
        // removeCart = removeCart.splice(findIndex, 1)
        localStorage.setItem('cart', JSON.stringify(removeCart))
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    }


    // change quantity
    const initNum = 0
    const sum = (cart1.length ?
            cart1.reduce((sum, item) => {
                return sum + item.quantity
            }, initNum) :
            cartCopy.reduce((sum, item) => {
                return sum + item.num
            }, initNum)
    )

    const changeQuantity = () => {
        let carCopy = [...cart1]
        let existing = carCopy.find(cartItem => cartItem?.productId === productID && cartItem?.colorId === color && cartItem?.size === size)
        if (existing) {
            existing.quantity = quantity

        }
        localStorage.setItem('cart', JSON.stringify(carCopy))
        dispatch(actions?.CheckoutAction?.updateLocalStorageState(JSON.parse(localStorage.getItem('cart'))))
    }




    const initialNum = 0
    const sumNum = cart1.reduce((sum, item) => {
        return sum + item.quantity
    }, initialNum)
    let itemNumber = sumNum
    let totalPrice = useSelector(state => state.checkoutReducer.totalPrice)
    //


    const sumTotal = cart1.reduce((subtotal, item) => subtotal + item.price * item.quantity, initialNum)
    // console.log('sumTotal is', sumTotal)

    const afterPay = sumTotal / 4

    // dispatch(actions?.LogIn?.logIn(token))
    //Payment package

    const taxRate = 0.13
    const orderList = [...cart1]
    // console.log('orderList copied ?', orderList)

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

    const amount = {
        total: (sumTotal + sumTotal * taxRate).toFixed(2),
        currency: 'CAD',
        details: {
            subtotal: sumTotal.toFixed(2),
            tax: (sumTotal * taxRate).toFixed(2),
        }

    }


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    let allProduct = useSelector(state => state.productReducer?.allProductList)


    let token = localStorage.getItem('tokens') !== null && localStorage.getItem('tokens')
    const isMyTokenExpired = isExpired(token)
    console.log(isMyTokenExpired)

    const date = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))

    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    };
    const navigate = useNavigate()

    return (
        <>
            <div className='desktopCheckout'>
                <div className='logoContainer'>
                    <img className='logo'
                         src="data:image/png;base64,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"
                         alt=""/>
                </div>
                <div className='checkoutContainer' style={{display: 'flex', maxWidth: '1200px'}}>
                    <div className='checkout-left'>
                        <h3 style={{padding: '0 30px', marginBottom: '0'}}>My BAG
                            ({sumNum} {sumNum > 1 ? "Items" : "Item"})</h3>
                        <div className='Checkout_Details'>
                            {cart1.map((element, index) =>
                                <div className='orderDetails' key={index}
                                     onClick={() => {
                                         dispatch(actions?.CheckoutAction?.addSingleOrder(element))
                                     }}
                                >
                                    <div className='checkout_img' style={{margin: '0'}}>
                                        <img src={element.imageList1[0]} width='200px' alt=""/>
                                    </div>
                                    <div className='checkout_info' style={{width: '600px', marginLeft: '20px'}}>
                                        <h3 className='checkout_info_productName'
                                            style={{marginTop: '0', marginBottom: '5px'}}>{element.product}</h3>
                                        <p className='checkout_info_color'
                                           style={{margin: '0 0 5px 0'}}>{element.colorName}</p>
                                        <div style={{display: 'flex', position: 'relative'}}>
                                            <div className='checkout_info_size'
                                                 style={{display: 'flex', flexDirection: 'column'}}>
                                                <div style={{marginBottom: '15px'}}>Size {element.size} </div>
                                                <span className='edit' onClick={() => {
                                                    dispatch(actions?.CheckoutAction?.showUpdatedItem(true))
                                                    dispatch(actions?.CheckoutAction?.addSingleOrder(element))
                                                    handleOpen()
                                                    console.log('my element in edit is ', element)
                                                }}>
                                                Edit</span>
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                right: 0,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '250px'
                                            }}>
                                                <div className='checkout_info_price'
                                                     style={{display: 'flex', flexDirection: 'column'}}>
                                                    <span style={{marginBottom: '15px'}}>Item Price  </span>
                                                    <div>${element.price} CAD</div>
                                                </div>
                                                <div className='checkout_info_quantity'
                                                     style={{display: 'flex', flexDirection: 'column'}}>
                                                    <span style={{marginBottom: '15px'}}>Quantity </span>
                                                    <Select
                                                        className="myBag_items_content_priceContainer_pricePart_quantity_select"
                                                        labelId="myBag_items_content_priceContainer_pricePart_quantity"
                                                        id="myBag_items_content_priceContainer_pricePart_quantity"
                                                        value={element.quantity}
                                                        label="quantity"
                                                        onChange={(event) => {
                                                            setProductID(element.productId)
                                                            setColor(element.colorId)
                                                            setSize(element.size)
                                                            setQuantity(event.target.value)
                                                            changeQuantity(cart1)

                                                        }
                                                        }>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                    </Select>
                                                </div>
                                                <div className='checkout_info_totalPrice'
                                                     style={{display: 'flex', flexDirection: 'column'}}>
                                                    <span style={{marginBottom: '15px'}}>Total Price </span>
                                                    <div>${element.price * (element.quantity)} CAD</div>
                                                </div>
                                            </div>


                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                paddingTop: '100px'
                                            }}>
                                            <span>Free Shipping + Free Returns</span>
                                            <div style={{display: 'flex',}}>
                                                <span className='save'>Save for Later</span>
                                                <Divider orientation='vertical'/>
                                                <span
                                                    className='remove'

                                                    onClick={() => {
                                                        setIsRemove(!isRemove)
                                                        setProductID(element.productId)
                                                        setColor(element.colorId)
                                                        setSize(element?.size)
                                                        removeProduct(cart1)

                                                    }}
                                                >Remove</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                        <h3 style={{margin: '50px 30px 0 30px'}}>Save For Later</h3>
                        <span style={{margin: '5px 30px 90px 30px'}}>
                            <span className='signIn' style={{borderBottom: '1px black solid'}}>Sign in</span> or <span
                            className='account' style={{borderBottom: '1px black solid'}}>create an account</span> to view your saved items.</span>
                    </div>
                    <div className='orderSummary'>
                        <h3>Order Summary</h3>

                        <div style={{margin: '10px 0'}}>
                            <span>Subtotal</span>
                            <span style={{position: "absolute", right: 0}}>${sumTotal}</span>
                        </div>
                        <div><Divider/></div>

                        <div style={{margin: '10px 0'}}>
                            <span>Shipping</span>
                            <span style={{position: "absolute", right: 0}}>Free</span>
                        </div>
                        <div><Divider/></div>

                        <div style={{margin: '10px 0'}}>
                            <span>Tax</span>
                            <span style={{position: "absolute", right: 0}}>Calculated at checkout</span>
                        </div>
                        <div><Divider/></div>

                        <div style={{margin: '10px 0 0 0 '}}>
                            <span>Estimated Total</span>
                            <span style={{position: "absolute", right: 0}}>CAD ${sumTotal}</span>
                        </div>


                        <div style={{display: "flex", alignItems: 'center'}}>
                            <div style={{fontSize: '10px'}}>or 4 payments of ${afterPay} with</div>
                            <svg
                                className="afterPay" height="20" width="50" viewBox="360.60 308.93 1148.88 220.83"
                                focusable="false" role="img" aria-hidden="false" aria-label="afterpay">
                                <path
                                    d="M1492,353.5l-34.6-19.8l-35.1-20.1c-23.2-13.3-52.2,3.4-52.2,30.2v4.5c0,2.5,1.3,4.8,3.5,6l16.3,9.3 c4.5,2.6,10.1-0.7,10.1-5.9V347c0-5.3,5.7-8.6,10.3-6l32,18.4l31.9,18.3c4.6,2.6,4.6,9.3,0,11.9l-31.9,18.3l-32,18.4 c-4.6,2.6-10.3-0.7-10.3-6l0-5.3c0-26.8-29-43.6-52.2-30.2l-35.1,20.1l-34.6,19.8c-23.3,13.4-23.3,47.1,0,60.5l34.6,19.8l35.1,20.1 c23.2,13.3,52.2-3.4,52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1,0.7-10.1,5.9v10.7c0,5.3-5.7,8.6-10.3,6l-32-18.4 l-31.9-18.3c-4.6-2.6-4.6-9.3,0-11.9l31.9-18.3l32-18.4c4.6-2.6,10.3,0.7,10.3,6v5.3c0,26.8,29,43.6,52.2,30.2l35.1-20.1l34.6-19.8 C1515.3,400.5,1515.3,366.9,1492,353.5z"></path>
                                <path
                                    d="M1265,360.1L1184,527.4h-33.6l30.3-62.5L1133,360.1h34.5l30.6,70.2l33.4-70.2H1265z"></path>
                                <path
                                    d="M455.1,419.5c0-20-14.5-34-32.3-34s-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34S455.1,439.5,455.1,419.5 M455.4,478.9 v-15.4c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2 v118.8H455.4z"></path>
                                <path
                                    d="M626.6,452.5c-10.2,0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10,3.8-13.8,14.3-13.8h6.6v-23 h-14.4c-24.7,0-36.4,8.1-36.4,32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0,24.2,9.3,34.7,33.5,34.7h15.4v-26.4H626.6z"></path>
                                <path
                                    d="M734,408.8c-2.1-15.4-14.7-24.7-29.5-24.7c-14.7,0-26.9,9-29.9,24.7H734z M674.3,427.3c2.1,17.6,14.7,27.6,30.7,27.6 c12.6,0,22.3-5.9,28-15.4h30.7c-7.1,25.2-29.7,41.3-59.4,41.3c-35.9,0-61.1-25.2-61.1-61.1c0-35.9,26.6-61.8,61.8-61.8 c35.4,0,61.1,26.1,61.1,61.8c0,2.6-0.2,5.2-0.7,7.6H674.3z"></path>
                                <path
                                    d="M956.5,419.5c0-19.2-14.5-34-32.3-34c-17.8,0-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34 C942,453.5,956.5,438.8,956.5,419.5 M862.4,527.4V360.1h29.2v15.4c8.8-10.9,21.9-17.6,37.5-17.6c32.1,0,57.3,26.4,57.3,61.3 c0,34.9-25.7,61.5-58,61.5c-15,0-27.3-5.9-35.9-15.9v62.5H862.4z"></path>
                                <path
                                    d="M1091.7,419.5c0-20-14.5-34-32.3-34c-17.8,0-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34 C1077.2,453.5,1091.7,439.5,1091.7,419.5 M1092,478.9v-15.4c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3 c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2v118.8H1092z"></path>
                                <path
                                    d="M809.7,371.7c0,0,7.4-13.8,25.7-13.8c7.8,0,12.8,2.7,12.8,2.7v30.3c0,0-11-6.8-21.1-5.4c-10.1,1.4-16.5,10.6-16.5,23 v70.3h-30.2V360.1h29.2V371.7z"></path>
                            </svg>
                        </div>

                        <div className='orderSummary_Btn'>
                            <button className='orderSummary_Btn_Red'>CHECKOUT</button>

                            <div style={{display: "flex", justifyContent: 'center', padding: '5px 0'}}>
                                <span style={{fontSize: '12px'}}>or checkout quickly with</span>
                            </div>

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
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <span>Contact Us</span>
                    <span>Live Chat</span>
                    <span>1.877.263.9300</span>
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

            <div className='mediaCheckout'>
                <div className='logoContainer'>
                    <img className='logo'
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABCFBMVEX////kHDj6///5/////v/jACbmGzj2///8/vzjACriHTjoGjj//f/kHDnjACPlACXjETLjABzjEDHnACH1/P/iHD3iHjPsEjXnACvnADHrACrlDi7iACT43Nr2xMPeABn69fT41dj3ztLz3+HpZG/1qKvoiI3nLEf78PPrparrXGnvztDuvcDnABb039rsm6LlQlX16ePnb3jyt7jvTGPubn/xe4flL0vlgor27/fkPl3yprPeQFHwr7bpT2Lvm5/mfoLz4/HdNkDcXWf1ydDnWm/pgpDvgI3ll6LxT2nlWW3qkJ3sy9fsn5rttb390dbpdHfvXmf6s77ebn7aNEvqqqrsuLbjiZXSF7YBAAAWS0lEQVR4nO1deVvbuNZ3ZFve98RxogQcErJA0iRQoNwOoQstM9DhTm+37/9Nrg0tW6IjyQnQ+7785o/yzPNE1tFy9nMkSc94xjOe8YxnPOMZz3jG/xsgRbFtG11CknRdf+oJrRxKRmROW47sXyTZTzufh8Bhs7WxdomTjVarnT71fJaEopR1/XLT+u2TcbfTM9YD13Ubao5Gw3WjIHD+tXP+utWWUb6p/2vnVsnPoZxubO794ddVo0aIZZXuIfarqmF4tcrk9KidZqvxv0WidLj2cVZ3DeLHpumYpZJZwvcotLCZ/U8zjuPQiCpbx9vaU8+ZBxm3LCNJax1PApX493cNAA4NN/hw1M7YkK7/xkwIKZqkbHR7kRE6AuRdn9t6OBm3r1nubwnU6vaCeqlSxXEBCi3TIok3GfefmoxFyOSbLPUHX0fk/nUThm+MOsOypuQj/kaQkdZ8U22E5rL05XBIcjCeIs1WnpqsW5C3tzwS41KRwzmPiuN7/v7b3+Q+2rIt6xfvonAltN0Ah+udNpKRIj/1TmaSfW3SqK7keN6F5Xt7TYTsJ9/K7VkQmuacyrICCrFpJDtv0dPtoaJLitx+H5HVE3eD0D1PUfmJuGqmvNjn9eqKuAsNVq0y1J9sG4c9z4xFlLMCMLE1Ops+AXGKJPc/rC8t3vkQjsZyZl89LstB+gUJq49DYIbo5QvtkY9quh/F1iNtYQZMjIH0aAakouioFSaPRt1PNLb6mv0ohlVuv489y3oAGQ8CE3yiPQ6Fkt1xcx73yBSWSMkbPzx5dnYXWuaDyniIxuS9XX5gjqojdOE9FYGZzVGfTB+cwoH76DfwGnGmqVaaD0qfJL/x+CeEsZNpJHFMYj8MQ2IYRpKoSZJk/5BLVMPQyZU+zH+rLTwaPtwuZkd0JxLQQi2f1A0jqpV6k8mHvf2P5+PB5uYgw3jcPd3/MJt97Vmh6hkGEeLM0dHDKeKok8R8i41DorqjXqc7OGm3+3Yes8inde1Hky//0NN+szUcf5yRwOX0Ppoly3GPH4S6TMzbM7aYzzbDJEbU6xwPmwJLnW7vfpwlbj0/smxHZHCOyqunMNN7Z3X2WYoN1+kMpql0GW7ihSJnW4rSjeOXVZVwWNPR+CHuor5VY1lKmETOx0+5xFKy/wTUSF2yUW46INQf7iUu0+cTR+crJ0+Xz2rQN7PTGUb4dHsV3xp2SGI68IUPjlfMbpDUqYNc1Kw2JkeptoLDg2xFmnarBuNGuEerPajoYx3kor73bqghpKzAwLF1TVbk9DiBVScnGi7/rZ9QkC0fR9D+WaS3u/Krf9j1SKYw0D5qmaOmvKKPIkm+IBB/I7VX6arjmwrS5eZZRICzip3pimSGLbcMKCAROmsotxpXC0XJRMifAXVlM9FvTFZkLsppBZASTrR1yBJ9yM4UBtn+tQqyjDJZoivsHUCtCqEH6sz6e2klVr/2l0EnsBScliWmWzpPWpDlTElrt5rNZruf6khj/yr7tNZ/l1B1HOwk45VY/V0VuITuR62ssKd6uDHem/VqkZshihp+r3O622QfbEVB6YQqh+MKcU+Wjv7r0jCg04e9j6zf69kkv80C1wj9W+Im08wNt3F6kim7DBaF7AkpUbmAj/u6tBwL0KaQz9DYYyyhrmgvXlnuIkaFsZV4B2OWn1fX+iE9sEzIloj+uxBngOD1D1Lm8OdePbbwAlZlmTg2LfeAIbjLNvqkUjmdiRsDbQlBVVbQIKpQCcRRS4Yuum3L7R7L4PKDfR3BN1kD9Q3jRXECJQ29CAiVlVnhuQyLQe2EgKrCFby/Upiv2toEEFfk5RI6uI1mPl3HxxXdBmeGPnk+5nBPeJnkhsbRtW2I27lLeFG1AeR3ii4gNpPxyL7P6X0hHZlxl87oR6nkjKZK0W3sW4DFhHsgG8ymPCO8ntVowOCo23S5n6mNZ3pRBXXHA8Ylf4OCSNcu+D2rOGTkQcnQTSwVdDCWEXT6q2bwFvy5rff4IxsV75UEJuyhby7wc6uSKgUSGso6tG5WOGMolsMGN4El7Cc6qNyU0zr0c3KOCuSIoe8jaFLqAFYmtA8i4Q3LPZIgvoUyrk7/daY4iCelZOYN6LfEKiN+MBULofpboJWgS8fggoX/iOZsZpL8GBTWfiWFR7jwxAI4fh/mzBvwoU/agqdUkQ7VEui5mDB07m5dLIk22gAp1PsA28sp3BOk0EbHkNlbKtVfMUaYQbJ00RRZIjGKoSUzvbaYkVFOKzCvTzahn2ffSgQpJKcMCg9ACrHfEWOn2muVMaEj6Oc2skeCyWDxjDG/DqgDWtb6WyGPRrnHiB14J9CSK1IbktCLQCYMCrsM5kzeCHHTocdQSNx/Q+PZqClKoX/AmGDXgKeEcSqyhxNAl7+isAVT2BKlMO4x9vCcQWHJG3N7pXS7BbNmDgr/LbyHPYYBxaTQ73FbGIq8z9S4Vr6Hfo95ShkjOAl/rCb1mWaBBwpoWxK+h/EBY1JMCitki5vCI8jzcwUVDDbZ6G1Ad3IupvBfjEm9SZgDjvplPmajvWSXFqgseci8yfcQfmDMaotdjmOMOUNgbY7U2AR0/9gIRaBaOw+yz+ClBzFzQH/GQ6GNpDGH7RqyvN3vBOsTjHNoQM1GLseSRS84pL5so0nI9j+QGWOcDhTcXAD1P6CSZKfrczWa84BP1k/Y8tuRyT6l5IAlvjiSb27DPYGkGZK2XZM9YMhiV5erJW2y2HKOuMqoEPgGxeQWIAJDIEjaZZgCl/DDNpvCMtriSjBTGakzLVUoiRj3wLIRXeryuH3MOsjif1KY8mXQqQN4nL5YqULYAUdDWodnWlbMkjkZtA22uM/gxPsMXxvL/roL0gWHQykjR+oXAnZZBjrncpI5fgX2l6I9oWRpleG2bnJ6X91ttkh8yVfIhEeMFIwBD8O6RgDnb8vfIY/wLRjHTAqnVU73g7oGUmi3uU77FSzsw7NCbGvnCv4Wk8IT3qUnH8H8Spn35uTA4RcGhQecsgdXUpZaM2ar8FfwJ2AAGMkdflaDYUU+U5VVerD9LkZtmEJF+sARl76CB46lZ2vFrXxXIlBSK9KYR95fzQrOysx2xWJbvz+RgKnISGrxxw+rX8EDn6vKvBQy/K6KdDjiVifJDBpLtuUGd/ke2YdmZWtvgwovifEEplBjBEBuw4GPliTts3xH13CHoGhlhRjuUFhh2JkCUsysd+Gxvke856GWQoaFBsZq71NYg9cdnQpoItUQXq6pzzkxhhCTNwRcIqa3Ac1JkbkU3F9Qd+HI64zz8hhwAFjriJgp6muQQpHzkBkEM7B2BW1yqbiWGbTBfJopN3sv5UYPWIphl8VsHrcFjYamXIqbWX0ngcbhuSrgLqjUd6A5SVMxRy7pgP4o+Q+eExGrUKWWbusNesb+gtGqsCejKaAul3JeAzEuWebi8pYBDaLLg8QR2EPsOxCB6ESMQqxColq321xMcAJOqVzxRTqnOHEADScdcet/PzGa2tBB7XE0/apvgloImD24CAEYR/wmZLaWcn0LjC3zWCp1sDBEPxDtXpSpWgBnHotSWEpAC6PNzjnxX4J9kl4L5uVcBv7oFCJmCGsOxj+QYiPPGDoS9t0B/Zwj3TaEuxc1WsAeCiltV7ASUA/cZFzs2Iz69CVH2TEXLo5vbEB7yOsOuYFDQBdlyjgUcfUMyGO3U0u8PUVjCFEo5gK8QrBNz5pTUCcELX1n/T/A+sjiZ+rSRUZnDYUo9GcylRlq0nYDPmZWClA4nW97+hQUlgJ69lBZRrClD1v3O9xOI14KpUIUmj0EuE4/qpADFkhJLNvtES7QI+YBKKySTcDD30yAWfoH9EKCsrYVrpzCArw0n6ZDgJIQeQLcQ3JMnw3aCHARChsghT+EJf4ljGO6KYxeUy0yXBm9pSo0SJ8Ua4TjbkDVWOJa29VU/Sld/06pJZI4nAGNH78LxsmvKWwhgMJBwRZe3imVQk3aoenOljuUKLNBimyx00sWU9gEKEQXotbTT/hqm9bqQ8+MTkp9Vwikw6O/i00Fl4JDgJUikTKQ27D8PaQsXjld0i2KCZvQk8U1Vho2fSrrdPry6nDRhLufwNX1NuWc2hrqUrIWPHqxMzovxhFKpmVAcU25L+bFuIWwQ7dZmuHCPfSpqd2K1C/cUpP06PTlCQFgixYQHr2nkLa4pMcYUESFgqRurWjHO8LI6jgo3Eov6VApRN8XHv7RIZXCw8I908waGE0pa58Lnw7Ta9EuAEoX6CaxsUebBrOeBYBjgLltirRfuGs1ztgppaZDWWjn1akhFLkwI829+nAuNCqo1OQUWiNaTYeOFjlO6Yndmlimyl0K66BXRbfXCgrEHKRLdx/05ipeMl2WOo9e8ebEsQ8W3OqSSBbMfWCHnukxmLOhDHpy45pa5PGIK/h/QATm2cui+dm30TiiaqeH9XvpIuEZPWa4RXhzS+ZBqPzrF3ijmovg07ME5M4dXmNWG0doMYW21h8V38KSAccIMvxgtREDYNF7VGi7d5iHE1NLm3W5OLcr5dYhg0DpIihOYexRI4HluyIR1/ckig9Sl6CiZibqzKyv9v0LIwAgmovkndqtGhNr/YI2ASQYpb0Lf8Yuef5a/JkDywxoLnp0Vw5hnFIpFI7w3QZ5xezXWMwZ9QvqkBJm0XUUODdrF+7QeVIhf9/1BNaYe1jYzL8EOaW3Tty7VdPo0ZOgBNOn7yB2AmZrNancX4bC8Iyu1gxvpUgBSVBTqzijwWTC0VoNbiPC+gRQVDC96YcFJUE1xcoY7qBqHPPUrJ+TJfqt11J6uPMmhdLYpE9k2Cj+9UoEJvj8nIe0HS3RsdtIqXawfFMU4gJBzN0l9tBkldrmsG15sVeFDwld4KKj63z7oE/fw2WERcLIlvyFLr0/GgeF1Kmj4a+8EdDhtyZYMHUbI7B29waCJUu3gQ/onAZt/KIQu8DXl+A0uMfRT/NyKgeF9xAqX0LbXBT2a4W5AOly9lAs7I3NK3HpShO6+DWsE0ANIQuGnEpxJWjxtsaYFqQwzxSlK03oP9c8JEiB9R0XfeAl/EqLLNyHJp0VU5wy2wIBaW43/VLcJl3zkIWbhvwEbgx4G33q0oVbyMo2R1SbKMfe9dHI9GMqS7ClnVCgoOgGcZX78Utd0bFfhGXXwAoM6et1AjJUM2VrbaAdJQCD1fbo9jfQOCryjQYt/nSJ/k0Wnz+jt+JGNthSlI5I5DEGKa0JvxfnxNERoNcrmbJys2oErGvW/sk+L7rEIdwP7T7QK86Kxltf8LoSveu8gjL2dXPyVfCdEU2f8VbQ/YJlRoKvFvDlL99GoysD7UwV6TC4FYwgZxCFNiq/gx8qmEPGxmWhJvQK2iFzwXezShxK2X8lDgBZL+X8+e/bQtY32hLYWtfuePHCpLY4tkjNnGtjbjZANr4A2gvVun8T6n92E2OxQqdaa/AKIv1OZBInbyQwNVjXzt1FzUx8sxod7L6fe/c0nAj2S5YV9GXerfhO64/9BS+IYHfWR/Dz7/LFnYR0bK0fghNAOjoh86oVVqM/LrRWY24PgzXx3pf9ZO4m1D8iGa3t1VQSVy0cOxXsmNmeqpVvjLEUSa/cW3Wyz3So2G9ckjchwRhXHLMUh4lb6bZlVJ7rjBqTGdiVejHQj/sacAVHa7KGULq711NVIwlj0ydq1BvT7forZCzoeO7IAYkYV9AV1HxTXU+qcRznb2H5B90NLZfWe/frE/xSxkgL9C/t39ed8jeb+7pdLstauXnU7Uws6+Dz8YausXbD1t5Gc3eKnDFZX6bF9y9+zCpOZbJ/vpapE3myE5pXKePqe553CO5D1zLV4v5YzqQM37fFQ6HP85e3Ev2JCrxsgNrzjWMZcV/qtBT0de4qxsmeJP5aZqYEzs2q5JCgKQsfLdRf4Aj0zgt1u9Yl9Gk+FovdAo9JfVpU2IMd3EuFhyovsI+zcYq+HoBOF+hujU1NB/s234Outdcp5XXVWVkR6TpaluWtOYUZV9eHhR+5KC/q/FBNBkjk3RztRc+n9G6L8yiiwHx01KmV7qscVvhBKvyOj44u5tXTOHaFHq5tHxBabiI26/QY1AIoHSOeq5iNSb8II73GziJTze0indUJ/3JG2YebBugRMbZSWhLtPZRR+sdcslumO0cXy71RkvYWeL5CtWNzHIz8Xd1dxru6Fum1wULua6AXvfrcWTAt8mXJl6bQ2gIzyolrB4wWIpcUSvZOxHhX1yR+wtG9KsNR4pN4brH8kBm3Z0CXz705IyMf2f1TRjrttaX8ZQ8Zoe8Wj+sz9rbaWsadqTPNPqL1t7K1mp8H9jiCTSwKpQlZUMJu4miyLdHeKFFy46A14bNi/VK1ftrWED1oJSsDa3Gt7AqeelQoD3H4lRIJOvQFVL7NooQvDon9uETUnW16eurRgbc4S4qweybxQDvxSoufBgtHs2GKtKv3UxVFyZ+wz/6Wyyf7nmj8KozM4zzfSM8MzYwHX455edan49BbPJZJTHbUngdIe+3ixe69zOB2vuymv66QnFGbTo/2Km4sHHswLawaX7vDVEeydukvyP7Vm99mNYPGja2ktZQkvEZu71MyFh0zjhMjOuh0N7+vra19O97fqowMEmPxukHTxKZlETcb7HSwO1xb2x2ffsCNel6fSTnt7hD29QgR+blmAa0n8zfG1AwGCTkagzLwa7BsNKjjB85UqxU+uqilk9rTPce9EHH9jZB6zICNDuNlovsPgGRHFjJx2GhXfPGy6ocCMZPOyh8+RU3H/20OqlmfrfKIXsGWm41l8j5XimRmi/tSOHC5i0+/jTiubbFeTSwIuVkJf4ODiuvv9ZUf0SvYqP07cNT6XhnuK7UUDic1WvjpkWBFr1aiqdGA0s8RR9ugh0NIjlfPRW/D1uQvwRNS6BsX2sOw0VuQB4bzRNtoGRX45dPVwNY2/CINOVYA9a+U8fLpaii0telkiQq3wsBBV4NSBVaLH8ESxVdFqHMqhsX/jMzS0GW01luijE8cDonOGE8VrBS5QybdCR7R0vBHA4nHy75aXDgJdh6DqWIzmnE4oFcPLd335rI+HgKeNSgQll0B9DL69HU+Pr9q+MHOVCv84O+yQOg1JnHx0nImdWE8mgjmq60Yitb/kdSL9BzjgkPw9wcyBXmRMVXU/6IuU9ZKBzaMcRmVn+qA3gJ6sRPUY2elG+ngUK0cw5lhjwdFk9qvapFIx2YmiNd7naLVOO2XhywpmeE4dhbk9BUDDoPJsJwpoStz2q8ESB+eGYaPl3KrVnGp6rv+/tJxz4dAHoyfnh+oKhy4h2GGjfDlUfoIRmAB2EjXMgHZekUiUtCx6hujybipSUC++G8Beft8oqqGVcF8ncZNxzJxHBpRrbP59mmFHyfsvKPWxc7XepBwsR7TjxO1+vLHSYqQTG/B9xshm2SmskpSe/hjFkUNI6SKEeyHxGiMrA/jkz5CqGzr9u95AwGg9tp4//OBHzXUumoYYUguYRiG6rmuNemcHm38LmK9GFC+oxpK+63hxWD8Y38vx/5pdzw4OmlO01zn/G3EejHYui4pZQnJymW6TE7QJfK/kS0pSlkHWkE/4xnPeMYznvGMZzzjGf938F+mi9qGJ+vg9AAAAABJRU5ErkJggg=="
                         alt=""/>
                </div>
                <div className="orderDetail">
                    <div className='orderDetail_BagAndTotal'
                         style={{display: "flex", justifyContent: 'space-between', width: '70vw'}}>
                        <h3>My BAG ({sumNum} {sumNum > 1 ? "Items" : "Item"})</h3>
                        <h3>${sumTotal}</h3>
                    </div>
                    <button className='orderSummary_Btn_Red'>
                        <img className='logo2'
                             src='https://logodix.com/logo/1208979.jpg'
                             alt=""/>CHECKOUT
                    </button>
                    <div className='shipment'>
                        <div style={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
                            <span><LocationOnOutlinedIcon/>Ship to </span>
                            <span style={{marginLeft: '5px'}}>Arrives by</span>
                        </div>
                    </div>

                    <div className='Checkout_Details'>
                        {cart1.map((element, index) =>
                            <div className='orderDetails' key={index} style={{position:'relative'}}>
                                <div className='checkout_img'>
                                    <img src={element.src} width='100px' alt=""/>
                                </div>
                                <div className='checkout_info' >
                                    <p className='checkout_info_productName'>{element.product}</p>
                                    <p className='checkout_info_color'>{element.color}</p>
                                    <p>Size {element.size} </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        margin: '0 5px'
                                    }}>
                                        <div className='checkout_info_quantity'>
                                            <span>Quantity </span>
                                            <Select
                                                className="myBag_items_content_priceContainer_pricePart_quantity_select"
                                                labelId="myBag_items_content_priceContainer_pricePart_quantity"
                                                id="myBag_items_content_priceContainer_pricePart_quantity"
                                                value={element.quantity}
                                                label="quantity"
                                                onChange={(event) => {

                                                    setProductID(element.productId)
                                                    setColor(element.colorId)
                                                    setSize(element.size)
                                                    setQuantity(event.target.value)
                                                    changeQuantity(cart1)
                                                }
                                                }>
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={9}>9</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                            </Select>
                                        </div>
                                        <p className='price'>${element.price * (element.quantity)}</p>
                                    </div>
                                    <div style={{margin: '0 5px', display: 'flex'}}>
                                        <span className='edit'
                                              onClick={() => {
                                                  dispatch(actions?.CheckoutAction?.showUpdatedItem(true))
                                                  dispatch(actions?.CheckoutAction?.addSingleOrder(element))
                                                  handleOpen()}}
                                        >Edit</span>
                                        <div style={{borderLeft: '1px solid lightgrey', margin: '0 10px'}}></div>

                                        <span className='save'></span>
                                    </div>
                                    <span>Free Shipping + Free Returns</span>

                                </div>
                                <p style={{position:'absolute', right:'0'}}

                                   onClick={() => {
                                       setIsRemove(!isRemove)
                                       setProductID(element.productId)
                                       setColor(element.colorId)
                                       setSize(element?.size)
                                       removeProduct(cart1)}}
                                >x</p>
                            </div>
                        )}
                    </div>

                </div>
                <div className='summary'>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0'}}>
                        <span>Subtotal</span>
                        <span>${sumTotal}</span>
                    </div>
                    <Divider/>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0'}}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <Divider/>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0'}}>
                        <span>Tax</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <Divider/>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0'}}>
                        <span>Estimated Total</span>
                        <span>${sumTotal}</span>
                    </div>
                    <div style={{display: "flex", alignItems: 'center'}}>
                        <div style={{fontSize: '10px'}}>or 4 payments of ${afterPay} with</div>
                        <svg
                            className="afterPay" height="20" width="50" viewBox="360.60 308.93 1148.88 220.83"
                            focusable="false" role="img" aria-hidden="false" aria-label="afterpay">
                            <path
                                d="M1492,353.5l-34.6-19.8l-35.1-20.1c-23.2-13.3-52.2,3.4-52.2,30.2v4.5c0,2.5,1.3,4.8,3.5,6l16.3,9.3 c4.5,2.6,10.1-0.7,10.1-5.9V347c0-5.3,5.7-8.6,10.3-6l32,18.4l31.9,18.3c4.6,2.6,4.6,9.3,0,11.9l-31.9,18.3l-32,18.4 c-4.6,2.6-10.3-0.7-10.3-6l0-5.3c0-26.8-29-43.6-52.2-30.2l-35.1,20.1l-34.6,19.8c-23.3,13.4-23.3,47.1,0,60.5l34.6,19.8l35.1,20.1 c23.2,13.3,52.2-3.4,52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1,0.7-10.1,5.9v10.7c0,5.3-5.7,8.6-10.3,6l-32-18.4 l-31.9-18.3c-4.6-2.6-4.6-9.3,0-11.9l31.9-18.3l32-18.4c4.6-2.6,10.3,0.7,10.3,6v5.3c0,26.8,29,43.6,52.2,30.2l35.1-20.1l34.6-19.8 C1515.3,400.5,1515.3,366.9,1492,353.5z"></path>
                            <path
                                d="M1265,360.1L1184,527.4h-33.6l30.3-62.5L1133,360.1h34.5l30.6,70.2l33.4-70.2H1265z"></path>
                            <path
                                d="M455.1,419.5c0-20-14.5-34-32.3-34s-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34S455.1,439.5,455.1,419.5 M455.4,478.9 v-15.4c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2 v118.8H455.4z"></path>
                            <path
                                d="M626.6,452.5c-10.2,0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10,3.8-13.8,14.3-13.8h6.6v-23 h-14.4c-24.7,0-36.4,8.1-36.4,32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0,24.2,9.3,34.7,33.5,34.7h15.4v-26.4H626.6z"></path>
                            <path
                                d="M734,408.8c-2.1-15.4-14.7-24.7-29.5-24.7c-14.7,0-26.9,9-29.9,24.7H734z M674.3,427.3c2.1,17.6,14.7,27.6,30.7,27.6 c12.6,0,22.3-5.9,28-15.4h30.7c-7.1,25.2-29.7,41.3-59.4,41.3c-35.9,0-61.1-25.2-61.1-61.1c0-35.9,26.6-61.8,61.8-61.8 c35.4,0,61.1,26.1,61.1,61.8c0,2.6-0.2,5.2-0.7,7.6H674.3z"></path>
                            <path
                                d="M956.5,419.5c0-19.2-14.5-34-32.3-34c-17.8,0-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34 C942,453.5,956.5,438.8,956.5,419.5 M862.4,527.4V360.1h29.2v15.4c8.8-10.9,21.9-17.6,37.5-17.6c32.1,0,57.3,26.4,57.3,61.3 c0,34.9-25.7,61.5-58,61.5c-15,0-27.3-5.9-35.9-15.9v62.5H862.4z"></path>
                            <path
                                d="M1091.7,419.5c0-20-14.5-34-32.3-34c-17.8,0-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34 C1077.2,453.5,1091.7,439.5,1091.7,419.5 M1092,478.9v-15.4c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3 c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2v118.8H1092z"></path>
                            <path
                                d="M809.7,371.7c0,0,7.4-13.8,25.7-13.8c7.8,0,12.8,2.7,12.8,2.7v30.3c0,0-11-6.8-21.1-5.4c-10.1,1.4-16.5,10.6-16.5,23 v70.3h-30.2V360.1h29.2V371.7z"></path>
                        </svg>
                    </div>

                    <div className='orderSummary_Btn'>
                        <button className='orderSummary_Btn_R'>CHECKOUT</button>

                        <div style={{display: "flex", justifyContent: 'center', padding: '5px 0'}}>
                            <span style={{fontSize: '12px'}}>or checkout quickly with</span>
                        </div>
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
                                <Payment className='RD_paypal' itemList={itemList} orderItems={orderItems} amount={amount}/>}
                        </div>
                    </div>
                    <h3 style={{margin:'0'}}>Save For Later</h3>
                    <span style={{margin: '0 0 30px 0'}}>
                            <span className='signIn' style={{borderBottom: '1px black solid'}}>Sign in</span> or <span
                        className='account' style={{borderBottom: '1px black solid'}}>create an account</span> to view your saved items.</span>
                    <div className='mediaFooter' style={{display: 'flex', flexDirection: 'column'}}>
                        <span>Contact Us</span>

                        <span>1.877.263.9300</span>

                        <span>Shipping Policy</span>
                        <span>Privacy Policy(Last Updated: 9/10/20)</span>
                        <span>Terms of Use</span>
                        <span>Accessibility Statement</span>
                        <p style={{margin:'0', fontSize:'12px'}}>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                    </div>


                </div>


            </div>
            <Edit/>
        </>
    )
}