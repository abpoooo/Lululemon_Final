import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import actions from "../../../actions";
// import {AddToBag} from "./AddToBag";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {useNavigate} from "react-router";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
// import './ProductDetailSimple.scss'
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import {saveRecentViewed} from "../../../Helper";


export const ProductDetailSimple = ({product, colorId, size}) => {

    // console.log('the color in bagPage is:', color)
    // console.log('the size in bagPage is:', size)

    let products = useSelector(state => state?.productReducer?.all)
    let colorID = useSelector(state => state?.productReducer?.updateColorId)
    console.log('products in edit', products)

    let [imgIndex, setImgIndex] = useState(0)

    const displayItem = products?.images.filter(element => element?.colorId === colorID)

    const imageList = displayItem && displayItem[0]?.mainCarousel?.media?.split(" | ")


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cbDisappear = () => {
        dispatch(actions?.addToBagActions?.Edit())
    }


    const [selectedColor, setSelectedColor] = useState(colorID)

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
                {/*<div className='sizeGuide'>Size guide</div>*/}
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

    const WhatSize = () => {
        return <div className='Products_details_Main_Product_Contents_WhatSize'>
            <div className='Logo'><FormatSizeIcon/></div>
            <div className='WhatSize'>What's My Size?</div>
        </div>
    }

    let modal = useSelector(state => state.modalReducer)


    return (
        <div className='Edit_Main'>


            <div className='Content_Left'>
                <div className="Products_details_Main_Single_Product">
                    <img src={imageList && imageList[imgIndex]} alt=""
                         width='300px' className="Products_details_Main_Single_Product_Img"
                    />
                    <div className="action_icon" style={{display: 'flex', justifyContent: "space-between"}}>
                        <div className='left' onClick={cbPrev}><ArrowBackIosIcon/></div>
                        <div className='right' onClick={cbNext}><ArrowForwardIosIcon/></div>
                    </div>

                </div>
            </div>



            <div className='Content_Right'>
                {/*<div className='addToBag_Bg_close' onClick={cbDisappear}><CloseIcon/></div>*/}
                <div className='Products_details_Main_Product_Contents'>
                    <div className='Products_details_Main_Product_Contents_name'>
                        {products?.name}
                    </div>
                    <div className='Products_details_Main_Product_Contents_price'>
                        {products?.price}
                    </div>

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
                        {/*<WhatSize/>*/}
                    </div>


                    <div className='Update_Item' onClick={() => {
                        // !selectSize && setIsAddToBagClicked(true)
                        // selectSize && dispatch(actions?.addToBagActions?.addToBag())
                    }}>
                        {/*<button>UPDATE ITEM</button>*/}
                        <div className='addToBag_Bg_addToBag_content_tails_checkout' onClick={() => window.location.href = '/checkout'}>UPDATE ITEM</div>

                        {/*<div className='Product_Details_AddToBag'>*/}
                        {/*    {modal.addToBagPage && <AddToBag color={colorID} size={selectSize}/>}*/}
                        {/*</div>*/}
                    </div>




                    <div className='View_Detail'>
                        <div className='Swatch'>
                            <Link onClick={() => {
                                dispatch(actions?.productActions?.fetchEachProduct(product?.productId))
                                dispatch(actions?.productActions?.updateColor(colorID))
                                saveRecentViewed(product)
                            }} to={`/product/productInfo/&${product?.name}&${product?.productId}&${colorID}&${product.size}`}>
                                {/*{product.images &&*/}
                                {/*    <img src={isHover ? imageFront1 : imageBack1 ? imageBack1 : imageFront1}  width='311px'*/}
                                {/*         alt={product.name}/>}*/}
                                {/*{product.images && <img src={imgSure2}   alt='' className={isHover ? "hover" : "hide"}/>}*/}
                            </Link>
                        </div>
                        <button>View product details</button>
                    </div>




                </div>
            </div>

        </div>
    )
}


