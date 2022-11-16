import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {saveRecentViewed, toMatrix} from "../../Helper";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import '../../Scss_styles/ProductAlsoLikeProduct.scss'
import {Link} from "react-router-dom";
import actions from "../../actions";


export const ProductDetailsYouMayAlsoLikeProducts = ({product, colorID}) => {

    const dispatch = useDispatch()
    // useEffect(() => dispatch(actions.productActions.fetchEachProduct(product.productId)),[product])
    //current display image
    const [displayImage, setDisplayImage] = useState(product?.one)
    // console.log('display image ',displayImage)

    let navigate = useNavigate()
    //Carousel Bar show or not
    const [carouselBar, setCarouselBar] = useState(false)

    //updated images
    const [updateImages, setUpdateImages] = useState({
        one: product?.one,
        two: product?.two
    })
    const [isLink, setIsLink] = useState(false)
    // border index
    const [borderIndex, setBorderIndex] = useState(0)
    useEffect(() =>setDisplayImage(product?.one) ,[])
    // update border color
    const updateBorderColor = event => {
        const imageTags = document.querySelectorAll('.ProductDetailYouMayAlsoLikeProducts_Image_Bar_Swatches_Swatch')
        imageTags.forEach((element, index) => {
            element.dataset.color === event.target.dataset.color && setBorderIndex(index)
        })
    }
    const [colorID1, setColorID1] = useState(product?.swatches[0].colorId)
    const [productID, setProductID] = useState(product?.productId)

    //callback update to update images and display image
    const cbUpdateImages = evt => {
        updateBorderColor(evt)
        const activeImages = images.filter(element => element.colorId === evt.target.dataset.color)
        setDisplayImage(activeImages[0].one)
        // console.log('evt target', evt.target.dataset.color)
        // console.log('evt productId',evt.target.dataset)
        setColorID1(evt.target.dataset.color)
        setUpdateImages(updateImages => ({
            ...updateImages,
            one: activeImages[0].one,
            two: activeImages[0].two
        }))
    }

    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media.split('|')
        element.one = imageList[0]
        element.two = imageList[1]
        return element
    })

    // set each carousel as 7 inside you may also like product lists
    let NumberOfSlide = 7
    let NumOfSwatch = product?.swatches?.length
    let NumOfBar = Math.ceil(NumOfSwatch / NumberOfSlide)
    // console.log("number of swatches", NumOfSwatch)
    // console.log('Number of Bar', NumOfBar)
    const [selectedBar, setSelectedBar] = useState(0)
    const cbRight = () => {
        selectedBar < NumOfBar - 1 && setSelectedBar(selectedBar + 1)
    }
    const cbLeft = () => {
        selectedBar !== 0 && setSelectedBar(selectedBar - 1)
    }


    // let swatches = product?.swatches?.swatch !== 0 && product?.swatches


    return (
        <div className='ProductDetailYouMayAlsoLikeProducts'>

            <div className='ProductDetailYouMayAlsoLikeProducts_Image'
                 onMouseEnter={() => {
                     setDisplayImage(updateImages?.two)
                     setCarouselBar(true)
                 }}
                 onMouseLeave={() => {
                     setDisplayImage(updateImages?.one)
                     setCarouselBar(false)
                 }}
            >
                <Link
                    to={`/product/productInfo/&${product?.name}&${product?.productId}&${colorID1}`}
                    onClick ={event => {
                        if (isLink){
                            event.preventDefault()
                        }
                        if (!isLink){
                            window.location.href = `/product/productInfo/&${product.name}&${product.productId}&${colorID1}`
                            saveRecentViewed(product)
                        }

                    }}
                >
                {<img src={displayImage} width='300px' height='360px' alt=""/>}
            </Link>
                {carouselBar &&
                    <div className='ProductDetailYouMayAlsoLikeProducts_Image_Bar'
                         onMouseEnter={ ()=> {
                             setDisplayImage(updateImages?.one)

                         }}
                         onMouseLeave={() => {
                             setDisplayImage(updateImages?.two)
                         }}
                    >
                        <div className='Swatch_Container'>
                            {NumOfBar !== 0 && <div className='icon forwards' onMouseEnter={()=>setIsLink(false)} onMouseLeave={() => setIsLink(true)} onClick={cbRight} style={selectedBar === NumOfBar - 1 ? {color: "lightgray"} : {color: "black", cursor: "pointer"}}><ArrowForwardIosOutlinedIcon className='ProductDetailYouMayAlsoLikeProducts_Image_Bar_Arrow back'/></div>}
                            {NumOfBar !== 0 && <div className='icon backwards' onMouseEnter={()=>setIsLink(false)} onMouseLeave={() => setIsLink(true)} onClick={cbLeft} style={selectedBar === 0 ? {color: "lightgray"} : {color: "black", cursor: "pointer"}}><ArrowBackIosNewOutlinedIcon className='ProductDetailYouMayAlsoLikeProducts_Image_Bar_Arrow forwards'/></div>}
                            <div className='SwatchBar' style={{
                                overflow: 'hidden',
                                // border:'yellow 2px solid',
                                // margin:'10px',
                                display: 'flex',
                                position: 'relative',
                                // width: '265px',
                                // margin-top: 5px;
                            }}>
                                <div className='swipe' style={{
                                    // border:'green 1px solid',
                                    display:'flex',
                                    position:'relative',
                                    // overflow:'hidden',
                                    width: `${NumOfBar}00%`,
                                    left: `-${selectedBar}00%`
                                }}>
                                <div className='ProductDetailYouMayAlsoLikeProducts_Image_Bar_Swatches'>
                                    {
                                        product?.swatches?.map((element, index) =>
                                            (index === borderIndex) ?
                                                <img
                                                    className='ProductDetailYouMayAlsoLikeProducts_Image_Bar_Swatches_Swatch Border'
                                                    src={element?.swatch}
                                                    alt=""
                                                    key={index}
                                                    data-color={element?.colorId}
                                                    data-id = {element?.productId}
                                                    onMouseEnter={cbUpdateImages}
                                                />
                                                :
                                                <img
                                                    className='ProductDetailYouMayAlsoLikeProducts_Image_Bar_Swatches_Swatch'
                                                    src={element?.swatch}
                                                    alt=""
                                                    key={index}
                                                    data-color={element?.colorId}
                                                    data-id = {element?.productId}
                                                    onMouseEnter={cbUpdateImages}
                                                />
                                        )
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className='ProductDetailYouMayAlsoLikeProducts_Name'>{product?.name}</div>
            <div className='ProductDetailYouMayAlsoLikeProducts_Price'>{product?.price}</div>
        </div>
    )


}