import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {NavBar} from "../NavBar";
import {Footer} from "../Footer";
import {useLocation} from 'react-router-dom';
import {ProductDetailYouMayAlsoLike} from "./ProductDetailYouMayAlsoLike";
// import '../../Scss_styles/ProductDetails.scss'
import {ProductDetailYouMayLike} from "./ProductDetailYouMayLike";
import {RecentViewProducts} from "./RecentViewProducts";
import {useEffect, useMemo, useState} from "react";
import actions from "../../actions";
import './ProductDetailSCSS/ProductDetails.scss'
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AdjustIcon from '@mui/icons-material/Adjust';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {ProductMainCarouselResponsive} from "./ProductMainCarouselResponsive";
import {AddToBag} from "./CartAndCheckout/AddToBag";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
import SwiperCore, {Pagination} from "swiper";
// import 'swiper/swiper-bundle.css';
// import 'swiper/components/pagination/pagination.scss';
// import 'c61-lulu-ecommerce/lululemon_project/'
// import './ProductCarousel.scss'


SwiperCore.use([Pagination])
export const ProductDetails = () => {
    let products = useSelector(state => state?.productReducer?.product)
    let colorID = useSelector(state => state?.productReducer?.updateColorId)
    let params = useParams()
    let allProduct = useSelector(state => state?.productReducer?.allProductList)
    // console.log('each product details', products)
    let {productInformation} = params
    const dispatch = useDispatch()
    // console.log('before split', productInformation)
    productInformation = productInformation.split("&")
    const productId = productInformation[2]
    const colorIDDD = productInformation[3]
    // console.log('product info', productInformation)
    const navigate = useNavigate()
    // useEffect(() => {
    //     dispatch(actions?.productActions.fetchEachProduct(productId))
    //     dispatch(actions?.productActions.updateColor(productInformation[3]))
    // },[] )

    const displayItem = products?.images.filter(element => element?.colorId === colorID)
    const displayImages = displayItem && displayItem[0]?.mainCarousel?.media?.split(" | ")

    //carousel
    const imageList = displayItem && displayItem[0]?.mainCarousel?.media?.split(" | ")
    // Swatches
    const displaySwatch = products?.swatches
    const swatchList = displaySwatch && displaySwatch
    const swatchMap = swatchList && swatchList.map(({colorId, swatch, swatchAlt}, index) => {
        return (
            <div key={index} className='Products_details_Main_Product_Contents_Swatches_Swatch' colorid={colorId}>
                <img src={swatch} width='34px' height='34px' alt=''/>
            </div>
        )
        // [[][][]]
    })
    // console.log('map of swatches are:', swatchMap)
    // console.log('my swatches are',swatchList)
    //



    const [selectedColor, setSelectedColor] = useState(colorID)
    //
    // const Color = () => {
    //     return <div className='Products_details_Main_Product_Contents_color'>
    //         <div className='Color_Title'>
    //             <span>
    //                 Color
    //             </span>
    //             {products?.swatches?.filter(({
    //                                              colorId,
    //                                              swatch,
    //                                              swatchAlt
    //                                          }) => colorID === colorId.map(({
    //                                                                             colorId,
    //                                                                             swatch,
    //                                                                             swatchAlt
    //                                                                         }) => <div>{swatchAlt}</div>
    //                 )
    //             )}
    //         </div>
    //     </div>
    // }

    const ChangeImg = (index) => {
        dispatch(actions.productActions.updateColor(products.swatches[index].colorId))
    }
    let swatchChangeImg = (products?.swatches.map(({colorId, swatch, swatchAlt}, index) => {
        return (
            <div key={index} style={colorId === products?.swatches?.colorId ? {border: "solid black 2px"} : {}}>
                <div onClick={() => {
                    ChangeImg(index)
                    setSelectedColor(colorId)
                }}
                     className='Products_details_Main_Product_Contents_Swatches_Swatch'
                >
                    <img src={swatch} width='34px' style={colorID === colorId ? {border: "solid black 5px"} : {}}
                         height='34px' alt={swatchAlt}/>
                </div>
            </div>
        )
    }))
// copied code
//     const productImgSelected = products?.images.filter(ele => ele?.colorId === colorID)
//     // console.log('selected product base on colorid',productImgSelected)
//
//     const productImg = productImgSelected[0]?.mainCarousel?.media?.split('|')
//     // console.log('get url array of all img on the selected pic', productImg)
//
//
    let [sliderUrl, setSliderUrl] = useState('')
    let [imgIndex, setImgIndex] = useState(0)
    let [pop, setPop] = useState(false)
    let [previewList, setPreviewList] = useState([])

    // if (products.length !== 0) {
    //     setTimeout(() => {
    //         setSliderUrl(imgIndex[imgIndex])
    //     }, 200);
    // }

    const handleClick = (index) => {
        setImgIndex(index)
        const slider = imageList[index];
        setSliderUrl(slider)
    }

    const cbPrev = function () {
        if (imageList !== 0 && imgIndex > 0) {
            setImgIndex(state => state - 1)
            // console.log('cbPrev index change to', imgIndex)
        } else {
            setImgIndex(imgIndex.length - 1)
        }
    }

    const cbNext = function () {
        if (imageList !== 0 && imgIndex < imageList.length - 1) {
            setImgIndex(state => state + 1)
            // console.log('cbNext index change to', imgIndex)
        } else {
            setImgIndex(0)
        }
    }
//
    const openImg = () => {
        let imgs = imageList.filter((item) => {
            return item !== sliderUrl
        })
        imgs.unshift(sliderUrl)
        setPreviewList(imgs)
        setPop(true)
    }
    //close preview
    const closeOpen = () => {
        setPop(false)
    }
    // end of copied code

    const [isAddToBagClicked, setIsAddToBagClicked] = useState(false)
    const [selectSize, setSelectSize] = useState(null)
    const Size = () => {
        return <div className='Products_details_Main_Product_Contents_Size'>
            <div className='title1'>
                {selectSize ?
                    <div className='sizeContainer'>
                    <span>
                        Size {selectSize}
                        {/*<div className='size'>*/}

                        {/*</div>*/}
                    </span>

                    </div> :
                    products?.sizes[0].title}
                <div className='sizeGuide'>Size guide</div>
            </div>
            <div className='sizeBar'>
                {products?.sizes[0].details.map(size =>
                    <div className='sizeCell' onClick={() => {
                        setSelectSize(size)
                        // navigate(`/product/productInfo/&${productId}&${colorIDDD}&${size}`)
                        navigate((`/product/productInfo/&${products?.name}&${products.productId}&color=${colorID}&size=${size}`))
                    }} style={selectSize === size ? {backgroundColor: "black", color: 'white'} : {}}>
                        {size}
                    </div>
                )}
            </div>
        </div>
    }
    const img1 = <path
        d="M10.53,2.46999997 L15.53,7.46999997 C15.812193,7.75768334 15.8166089,8.21694356 15.54,8.51 L15.54,8.51 L10.54,13.51 L10.19,13.16 C10.0006874,12.9722334 9.89420169,12.7166376 9.89420169,12.45 C9.89420169,12.1833625 10.0006874,11.9277666 10.19,11.74 L10.19,11.74 L13.19,8.74 L4.99999998,8.74 C4.44771523,8.74 3.99999998,8.29228475 3.99999998,7.74 L3.99999998,7.74 L3.99999998,7.24 L13.18,7.24 L10.18,4.23999998 C9.99068736,4.05223338 9.88420169,3.79663751 9.88420169,3.52999997 C9.88420169,3.26336243 9.99068736,3.00776657 10.18,2.81999997 L10.18,2.81999997 L10.53,2.46999997 Z M1.99999995,7.25 C2.55228472,7.25 2.99999995,7.69771525 2.99999995,8.25 L2.99999995,8.25 L2.99999995,8.75 L0.99999995,8.75 C0.447715203,8.75 -5.00001567e-08,8.30228475 -5.00001567e-08,7.75 L-5.00001567e-08,7.75 L-5.00001567e-08,7.25 Z"
        fill="currentColor"></path>
    const WhatSize = () => {
        return <div className='Products_details_Main_Product_Contents_WhatSize'>
            <div className='Logo'><FormatSizeIcon/></div>
            <div className='WhatSize'>What's My Size?</div>
        </div>
    }
    console.log('prices are :', (products?.price?.split("")[0] / 4))
    const useQuery = () => {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    let modal = useSelector(state => state.modalReducer)
    let query = useQuery()
    // let dispatch = useDispatch()
    return (
        <>

            <div className='Product_Details_Content'>
                {/*<NavBar/>*/}

                <div className='Products_details_Main'>
                    {/*<div className='Products_details_Main_Single_Product'>*/}
                    {/*    <h1>Product Details</h1>*/}
                    {/*    <div>*/}
                    {/*        {displayImages &&*/}
                    {/*            <img className='Products_details_Main_Single_Product_Img' src={displayImages[0]} alt=""*/}
                    {/*                 width='300px'/>}*/}
                    {/*        <div className="action_icon" style={{display: 'flex', justifyContent: "space-between"}}>*!/*/}
                    {/*            <div className='left' onClick={cbPrev}><ArrowBackIosIcon/></div>*/}
                    {/*            <div className='right' onClick={cbNext}><ArrowForwardIosIcon/></div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*<div className='Products_details_Main_Single_Product_Carousel'>*/}
                    {/*    {imageList?.map((element, index) => {*/}
                    {/*        return (*/}
                    {/*            <div key={index}>*/}
                    {/*                {<img src={element} alt="" width='30px'/>}*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}

                    {/*</div>*/}
                    {/*<div className='productDetail_left'>*/}
                    <div className="Products_details_Main_Single_Product">
                        <img src={imageList && imageList[imgIndex]} alt=""
                             width='300px' className="Products_details_Main_Single_Product_Img" onClick={() => {
                            openImg()
                        }}/>
                        <div className="action_icon" style={{display: 'flex', justifyContent: "space-between"}}>
                            <div className='left' onClick={cbPrev}><ArrowBackIosIcon/></div>
                            <div className='right' onClick={cbNext}><ArrowForwardIosIcon/></div>
                        </div>
                        <div className="Products_details_Main_Single_Product_Carousel">
                            {imageList && imageList.map((url, i) =>

                                <div className="imageCarousel_Bar_Image" key={i}>
                                    <img className={sliderUrl === i ? "clicked" : ""}
                                         className="ImageCarousel_List"
                                         src={url} alt="" onClick={() => {
                                        handleClick(i)
                                    }}
                                         width="40px" height="50px"/>
                                </div>)}
                        </div>
                    </div>


                    {pop ? (
                        <div className='preview_img'>
                            <div>
                                <div className='view_head'>
                                    <div onClick={() => {
                                        closeOpen()
                                    }}> Back to Product
                                    </div>

                                    <div>{products?.name}</div>
                                    <div onClick={() => {
                                        closeOpen()
                                    }}>x
                                    </div>
                                </div>
                                <div className='view_cont'>
                                    {previewList && previewList.map((url, i) => {
                                        return (
                                            <img src={url} key={i} width='600px' alt={''}/>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
                    }


                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className='Products_details_Main_Product_Contents'>
                        <div className='Products_details_Main_Product_Contents_name'>
                            {products?.name}
                        </div>
                        <div className='Products_details_Main_Product_Contents_price'>
                            {products?.price}
                        </div>

                        <div className='payment'>

                            or 4 payments
                            of {(products?.price?.split("  ")[0].replace(/\D/g, '') / 4).toFixed(2)} with <svg
                            className="afterPay" height="20" width="100" viewBox="360.60 308.93 1148.88 220.83"
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
                        {/*<div className='Products_details_Main_Product_Contents_Swatches'>*/}
                        {/*<Color/>*/}

                        <div className='Products_details_Main_Product_Contents_Swatches'>
                            <div className='color'>
                                {products?.swatches?.swatchAlt}
                            </div>
                            {/*{Color}*/}
                            {/*{swatchMap}*/}
                            {swatchChangeImg}
                            {/*<div>*/}
                            {/*    colour*/}
                            {/*</div>*/}
                            {/*<div style={{display: 'flex', flexWrap: 'wrap'}}>*/}


                            {/*</div>*/}
                        </div>
                        {/*</div>*/}
                        <div className='sizes'>
                            <Size/>
                            <WhatSize/>
                        </div>
                        <div className='ShipOrNot'>
                            <div className='Ship'>
                                <h2><AdjustIcon className='Icon1'/>Ship it to me</h2>
                                <h5>Free shipping and returns</h5>
                            </div>
                            <div className='PickUp'>
                                <img src="c61-lulu-ecommerce/lululemon_project/src/component/ProductDetails/ProductDetails" alt=""/>
                                <h4><HouseSidingIcon className='Icon'/>Pick up in-store</h4>
                            </div>
                        </div>

                        <div className='AddToBag' >
                            <button onClick={() => {
                                !selectSize && setIsAddToBagClicked(true)
                                selectSize && dispatch(actions?.addToBagActions?.addToBag())
                            }}>ADD TO BAG</button>
                            <div className='Product_Details_AddToBag'>
                                {modal.addToBagPage && <AddToBag color={colorID} size={selectSize}/>}
                            </div>
                        </div>
                        <div className='HeartAndStart'>
                            <div className='Heart'>
                                <FavoriteBorderOutlinedIcon className='Icon'/>
                                <div className='text'> Add to Wish List</div>
                                {/*<div>Review</div>*/}
                            </div>
                            <div className='star'>
                                <StarBorderIcon className='Icon'/>
                                <div>Review</div>
                            </div>
                        </div>
                        <div className='details'>
                            <h2>Details</h2>
                            {products?.featureTitles?.map((element, index) => (
                                <div className='details_row' key={index}>
                                    <img src={element.iconPath} alt=""/>
                                    <div>{element.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className='Questions'>
                            <div className='h2AndIcon'>

                                <h2>Questions? Bring them on (all of them) </h2>
                                <ArrowRightAltIcon className='Icon_Arrow'/>
                                {/*<div><ArrowRightAltIcon className='Icon_Arrow'/></div>*/}
                                <img src={img1} alt=""/>
                            </div>

                            <h4>Virtual shop with one of educators</h4>
                        </div>
                    </div>
                    <div className='Products_details_Main_Product_YouMayLike'>
                        <ProductDetailYouMayLike/>
                    </div>


                    {/*<ProductDetailYouMayAlsoLike/>*/
                    }
                    {/*<RecentViewProducts/>*/
                    }
                </div>

            </div>

            <div className='Responsive'>
                <div className='Responsive_Contents'>
                    <div className='Responsive_Contents_name'>
                        {products?.name}
                    </div>
                    <div className='Responsive_Contents_price'>
                        {products?.price}
                    </div>
                    <div className='Responsive_payment'>

                        or 4 payments of {(products?.price?.split("  ")[0].replace(/\D/g, '') / 4).toFixed(2)} with <svg
                        className="afterPay" height="20" width="100" viewBox="360.60 308.93 1148.88 220.83"
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

                    <div className='ProductDetail_MainCarousel_Responsive_SlideStyles'>


                        <Swiper
                            // effect={"coverflow"}
                            // autoplay={{
                            //     delay: 2500,
                            //     disableOnInteraction: false,
                            // }}
                            Pagination={{clickable: true}}
                            slidesPreview={1}
                            className='ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs'
                        >
                            {
                                imageList?.map((element, index) => {
                                    return (
                                        <SwiperSlide key={index} >
                                            <img src={element} height='200px' width='160px'
                                                 className='ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs' alt=""/>
                                        </SwiperSlide>
                                    )
                                })
                            }

                        < /Swiper>
                    </div>



                    {/*<div className='Products_details_Main_Product_Contents_Swatches'>*/}
                    {/*<Color/>*/}
                    {/*<div className='Responsive_Carousel'>*/}
                    {/*    <div className='Responsive_Carousel_Images'>*/}
                    {/*        {*/}
                    {/*            products && <ProductMainCarouselResponsive product={products}*/}
                    {/*                                                       className = 'Responsive_Carousel'/>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className='Responsive_Contents_Swatches'>
                        <div className='color'>
                            {products?.swatches?.swatchAlt}
                        </div>
                        {/*{Color}*/}
                        {/*{swatchMap}*/}
                        {swatchChangeImg}
                        {/*<div>*/}
                        {/*    colour*/}
                        {/*</div>*/}
                        {/*<div style={{display: 'flex', flexWrap: 'wrap'}}>*/}


                        {/*</div>*/}
                    </div>
                    {/*</div>*/}
                    <div className='Responsive_sizes'>
                        <Size/>
                        <WhatSize/>
                    </div>
                    <div className='ResponsiveShipOrNot'>
                        <div className='Ship'>
                            <h2><AdjustIcon className='Icon1'/>Ship it to me</h2>
                            <h5>Free shipping and returns</h5>
                        </div>
                        <div className='PickUp'>
                            <img src="c61-lulu-ecommerce/lululemon_project/src/component/ProductDetails/ProductDetails" alt=""/>
                            <h4><HouseSidingIcon className='Icon'/>Pick up in-store</h4>
                        </div>
                    </div>

                    <div className='ResponsiveAddToBag' >
                        <button onClick={()=> {
                            !selectSize && setIsAddToBagClicked(true)
                            selectSize && dispatch(actions.addToBagActions.addToBag())
                        }}>
                            ADD TO BAG
                        </button>
                    </div>
                    <div className='ResponsiveHeartAndStart'>
                        <div className='Heart'>
                            <FavoriteBorderOutlinedIcon className='Icon'/>
                            <div className='text'> Add to Wish List</div>
                            {/*<div>Review</div>*/}
                        </div>
                        <div className='star'>
                            <StarBorderIcon className='Icon'/>
                            <div>Review</div>
                        </div>
                    </div>
                    {/*<div className='Responsive_details'>*/}
                    {/*    <h2>Details</h2>*/}
                    {/*    {products?.featureTitles?.map((element, index) => (*/}
                    {/*        <div className='details_row' key={index}>*/}
                    {/*            <img src={element.iconPath} alt=""/>*/}
                    {/*            <div>{element.title}</div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div className='Responsive_Questions'>
                        <div className='h2AndIcon'>

                            <h2>Questions?                        Bring them on (all of them) </h2>
                            <ArrowRightAltIcon className='Icon_Arrow'/>
                            {/*<div><ArrowRightAltIcon className='Icon_Arrow'/></div>*/}
                            <img src={img1} alt=""/>
                        </div>

                        <h4>Virtual shop with one of educators</h4>
                        <br style={{color: '1px solid black'}}/>
                    </div>

                </div>
            </div>
        </>
    )
}