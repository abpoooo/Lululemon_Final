import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useSelector} from "react-redux";
import {useState} from "react";
import '../Scss_styles/ProductCarousel.scss'
import {dialogClasses} from "@mui/material";
// jack
export const ProductCarousel = ({product, color}) =>{
    let productImgs = product?.images
    // console.log('img array', productImgs)
    let colorId = useSelector(state => state?.productReducer?.updateColorId)


    const productImgSelected = product?.images.filter(ele =>ele?.colorId === colorId)
    // console.log('selected product base on colorid',productImgSelected)

    const productImg = productImgSelected[0]?.mainCarousel?.media?.split('|')
    // console.log('get url array of all img on the selected pic', productImg)


    let [sliderUrl,setSliderUrl] = useState('')
    let [imgIndex,setImgIndex] = useState(0)
    let [popShow,setPopShow] = useState(false)
    let [priviewList, setPriviewList] = useState([])

    // console.log('imageindex', imgIndex)

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
        setPriviewList(imgs)
        setPopShow(true)
    }
    //close preview
    const closeOpen = () => {
        setPopShow(false)
    }

    return(
        <div className='productDetail_mainCarousel'>
            {/*<h1>Product Detail</h1>*/}
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
                popShow ? (
                    <div className='priview_img'>
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
                                {priviewList && priviewList.map((url, i) => {
                                    return (
                                        <img src={url} key={i}/>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </div>
    )


}
