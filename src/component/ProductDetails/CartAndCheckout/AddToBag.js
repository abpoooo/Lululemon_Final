import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {ProductDetailYouMayLike} from "../ProductDetailYouMayLike";
import './Scss/AddToBag.scss'

export const AddToBag = ({color, size}) => {

    let product = useSelector(state => state?.productReducer.product)
    let colorIDD = useSelector(state => state?.productReducer.updateColorId)
    let dispatch = useDispatch()
    console.log('the color in bagPage is:', colorIDD)
    console.log('the size in bagPage is:', size)
    console.log('the product in bagPage is:', product)
    // let colorIndex = product?.images.findIndex(colorId => colorId === colorIDD)
    let colorIndex = product.images.findIndex(({colorId, colorAlt, mainCarousel, whyWeMadeThis}) => colorId === colorIDD)
    console.log('colorIndex is', colorIndex)

    const cbDisappear = () => {
        dispatch(actions?.addToBagActions?.addToBag())
    }

    let colorNm = product.images[colorIndex]?.colorAlt
    let imageList = product?.images[colorIndex]?.mainCarousel?.media.split('|')[0]
    let priceNum = parseInt(product?.price?.slice(1,-4))
    let totalPrice = parseInt(product?.price?.slice(1,-4))
    let swatches = product?.swatches
    console.log('swatches',swatches)
    // totalPrice = totalPrice * bagItem.quantity
    // const totalPrice =
    let sizeList = product?.sizes
    let Img = product?.images[colorIndex]?.mainCarousel?.media?.split('|')

    localStorage.setItem('bagItem', JSON.stringify({
        product: product?.name,
        color: colorNm,
        size: size,
        price: priceNum,
        src: imageList,
        quantity: 0,
        imageList1: Img,
        colorId: product?.images[colorIndex]?.colorId,
        remove: false,
        images: product?.images,
        productId : product?.productId,
        totalQuantity: 0,
        totalPrice1: totalPrice,
        taxRate: 0.13,
        sizeList: sizeList,
        swatches: swatches,

    }))

    let bagItem = JSON.parse(localStorage.getItem('bagItem'))

    // if (!localStorage.getItem('cart')) {
    //     localStorage.setItem('cart', '[]')
    // }
    if (localStorage.getItem('cart')===null){
        localStorage.setItem('cart', '[ ]')
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log('cart', cart)

    // Add to cart
    let existingItem = cart.find(cartItem => cartItem?.product === bagItem?.product && cartItem?.color === bagItem?.color && cartItem?.size === bagItem?.size)
    if (existingItem) {
        existingItem.quantity +=1
        // existingItem.totalQuantity += 1

    } else if (bagItem===null){
        console.log('nothing')
    }
    else {

        cart.push(bagItem)
        // setCartEmpty(false)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    cart = JSON.parse(localStorage.getItem('cart'))
    console.log('cart is here', cart)



    const initialNum = 0
    const sumTotal = cart.reduce((subtotal, item)=> {
        return subtotal + item.price
    },initialNum)
    console.log('sumTotal is', sumTotal)

    const sumNum = cart.reduce((sum, item) => {
        return sum + item.quantity
    },initialNum)
    console.log('sum is ', sumNum)

    const cbClose = () => {
        dispatch(actions?.addToBagActions?.addToBag())
    }

    useEffect(() => localStorage.setItem('cartNum', sumNum))
    // console.log('cart',cart)
    // console.log('cart price array', cart[0].price)

    //
    // function getTotal(arr) {
    //     let total = 0
    //     arr.forEach(function(item) {
    //         total += item.price;
    //     });
    //     return total
    // }



    // const subTotal = arr =>{
    // let total
    // arr.forEach(item => total+=item.price)
    //     return total
    // }

    // const test = subTotal(cart)
    // console.log('test', test)
    // const test1 = test.slice()
    // console.log('test1 is', test1)
    // const initialValue = 0;
    // const sumWithInitial = test.reduce(
    //     (previousValue, currentValue) => previousValue + currentValue,
    //     initialValue
    // );
    // console.log('sumWithInitial',sumWithInitial)
    // let subTotal = 0
    // // if ( < cart.length)
    // const cbSubs = index => {
    //     let i = 0
    //     i +=1
    //     i < cart.length && subTotal+=cart.price[index]
    // }
    // for (let i =0; i<cart.length; i++){
    //
    //     subTotal += cart.price[i]
    // }
    // console.log('sub',subTotal)

    return (
        <div className='addToBag'>
            <div className='addToBag_Bg'>
                <div className='addToBag_Bg_close' onClick={cbClose}><CloseIcon/></div>
                <div className='addToBag_Bg_addToBag'>
                    <div className='addToBag_Bg_addToBag_head'>
                        <div className='addToBag_Bg_addToBag_head_Title'>
                            Added to Your Bag
                        </div>
                        <div className='addToBag_Bg_addToBag_head_bag'>
                            <div className='addToBag_Bg_addToBag_head_bag_container'>
                                <svg height="32" width="32" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg" className="bag-icon"
                                     focusable="false" role="img" aria-hidden="true">
                                    <path
                                        d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 00-.75.75v12A4.75 4.75 0 008 23.75h8A4.75 4.75 0 0020.75 19V7a.76.76 0 00-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0116 22.25H8A3.26 3.26 0 014.75 19V7.75H7l-.24 2.16.49.06a1 1 0 001.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 001.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                                <div
                                    className='addToBag_Bg_addToBag_head_bag_container_Item'>{sumNum} {sumNum > 1 ? 'Items' : 'Item'}</div>
                            </div>
                        </div>
                    </div>

                    <div className='addToBag_Bg_addToBag_content'>
                        <div className='addToBag_Bg_addToBag_content_Product'>
                            <div className='addToBag_Bg_addToBag_content_Product_Img'>
                                <img src={product?.images[colorIndex]?.mainCarousel?.media.split('|')[0]}  alt={product?.images[colorIndex]?.mainCarousel.alt}/>
                            </div>
                            <div className='addToBag_Bg_addToBag_content_Product_details'>
                                <div className='addToBag_Bg_addToBag_content_Product_details_name'>{product.name}</div>
                                <div className='addToBag_Bg_addToBag_content_Product_details_size'>Size:{size}</div>
                                <div className='addToBag_Bg_addToBag_content_Product_details_price'>{product.price}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className='addToBag_Bg_addToBag_content_tails'>
                            <div className='addToBag_Bg_addToBag_content_tails_subtotal'>
                                <span>Subtotal</span>
                                <span>${sumTotal} CAD</span>
                            </div>
                            <div className='addToBag_Bg_addToBag_content_tails_checkout' onClick={() => window.location.href = '/logIn'}>VIEW BAG & CHECKOUT</div>
                            <div  className='addToBag_Bg_addToBag_content_tails_continue' onClick={cbDisappear}>Continue Shopping</div>
                        </div>

                    </div>


                    <div className='addToBag_Bg_addToBag_goesWellWith'>
                        <div className='addToBag_Bg_addToBag_goesWellWith_title'>
                            Goes well With
                        </div>
                        <ProductDetailYouMayLike/>
                    </div>

                </div>
            </div>
        </div>
    )
}