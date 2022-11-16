import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useSelector} from "react-redux";
import {useState} from "react";
import '../Scss_styles/ProductCarousel.scss'
import {useDispatch} from "react-redux";
import actions from "../actions";

export const ProductCarousel = ({product}) =>{
    const dispatch = useDispatch()
    let colorId = useSelector(state => state?.productReducer?.updateColorId)


    const ChangeImg = (index) => {
        dispatch(actions.productActions.updateColor(product.swatches[index].colorId))
    }
    let swatchChangeImg = (product?.swatches.map(({swatch}, index) => {
        return (
            <div key={index}>
                <div
                    onClick={() => ChangeImg(index)}
                >
                    <img src={swatch} alt=""/>
                </div>
            </div>
        )
    }))

    // console.log('swatchchangecolor',swatchChangeImg)





    const productImgSelected = product?.images.filter(ele =>ele?.colorId === colorId)
    // console.log('selected product base on colorid',productImgSelected)

    const productImg = productImgSelected[0]?.mainCarousel?.media?.split('|')
    // console.log('get url array of all img on the selected pic', productImg)

    const size = product && product?.sizes[0].details
    // console.log('size', size)

    const displaySwatch = product?.swatches
    // console.log('displayswatch', displaySwatch)
    // const swatchMap = displaySwatch && displaySwatch.map(({colorId, swatch}, index) => {
    //     return (
    //         <div key={index} colorid={colorId} >
    //             <img className='ColorSwatch' src={swatch} alt={''}/>
    //         </div>
    //     )
    // })




    let [sliderUrl,setSliderUrl] = useState('')
    let [imgIndex,setImgIndex] = useState(0)
    let [pop,setPop] = useState(false)
    let [previewList, setPreviewList] = useState([])

    if (product.length !==0){
        setTimeout(()=>{
            setSliderUrl(productImg[imgIndex])
        },200);
    }

    const handleClick = (index)=>{
        setImgIndex(index)
        const slider = productImg[index];
        setSliderUrl(slider)
    }

    const cbPrev = function () {
        if (productImg !==0 && imgIndex > 0) {
            setImgIndex(state => state - 1)
            // console.log('cbPrev index change to', imgIndex)
        } else {
            setImgIndex(productImg.length - 1)
        }
    }

    const cbNext = function () {
        if (productImg !== 0 && imgIndex < productImg.length - 1) {
            setImgIndex(state => state + 1)
            // console.log('cbNext index change to', imgIndex)
        } else {
            setImgIndex(0)
        }
    }

    const openImg = () => {
        let imgs = productImg.filter((item) => {
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

    return(
        <div className='productDetail_mainCarousel'>
            <div className='productDetail_left'>
                <div className="productDetail_mainCarousel_Container">
                <img  src={productImg && productImg[imgIndex]} alt="" className="productDetail_mainCarousel_Container_imgs" onClick={()=>{openImg()}} />
                <div className="action_icon"  style={{display:'flex', justifyContent:"space-between"}}>
                    <div className='left' onClick={cbPrev}><ArrowBackIosIcon/></div>
                    <div className='right' onClick={cbNext}><ArrowForwardIosIcon/></div>
                </div>

            </div>
                <div className="imagesCarousel_Bar">
                {productImg && productImg.map((url,i) =>

                    <div className="imageCarousel_Bar_Image" key={i}>
                        <img className={sliderUrl === i?"clicked":""}

                             className="ImageCarousel_List"
                             src={url} alt="" onClick={()=>{handleClick(i)}}
                             width="40px" height="50px"/>
                    </div>)}
            </div>

                {
                    pop ? (
                        <div className='preview_img'>
                        <div>
                            <div className='view_head'>
                                <div onClick={() => {
                                    closeOpen()
                                }}> Back to Product
                                </div>

                                <div>{product?.name}</div>
                                <div onClick={() => {
                                    closeOpen()
                                }}>x
                                </div>
                            </div>
                            <div className='view_cont'>
                                {previewList && previewList.map((url, i) => {
                                    return (
                                        <img src={url} key={i} alt={''}/>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    ) : null
                }
            </div>
            <div className='productDetail_middle' style={{display:'flex', flexDirection:'column', width:'537px', border:'green 2px solid'}}>
                {/*<div className='productDetail_category'>*/}

                {/*</div>*/}
                {/*<div className='productDetail_name'>*/}
                {/*    {product?.name}*/}
                {/*</div>*/}
                {/*<div className='productDetail_price'>*/}
                {/*    {product?.price}*/}
                {/*</div>*/}
                <div className='productDetail_color_carousel'>
                    <div>
                        colour
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {swatchChangeImg}
                    </div>
                </div>
                {/*<div className='productDetail_size'>*/}
                {/*    <div style={{display:'flex', justifyContent:'space-between'}}>*/}
                {/*        <div><span>Select Size</span></div>*/}
                {/*        <div><span>Size Guide</span></div>*/}
                {/*    </div>*/}
                {/*    <div className='available size' style={{display:'flex', }}>*/}
                {/*        {size.map((details,index)=>{*/}
                {/*            return(*/}
                {/*                <div key={index} style={{display:'flex',margin:'0 2%',border:'black 1px solid'}}>*/}
                {/*                    {details}*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })}*/}

                {/*    </div>*/}
                {/*    <div><span>Size sold out? Select size to get notified</span></div>*/}
                {/*    <div style={{display:'flex' }}>*/}
                {/*        <div>T</div>*/}
                {/*        <div><span>What's My Size?</span></div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className='productDetail_shoppingOption'>*/}
                {/*    <div><span>Ship it to me</span></div>*/}
                {/*    <div><span>Pick up in-store +</span></div>*/}
                {/*    <div><button>ADD TO BAG</button></div>*/}
                {/*    <div><span>Check All Store Inventory</span></div>*/}
                {/*</div>*/}
            </div>
        </div>
    )


}
