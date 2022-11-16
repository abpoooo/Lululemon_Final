import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {FeatureList} from "./FeatureList";
// import {useWindowSize} from "../customHooks";
import './ProductDetailSCSS/Features.scss'

export const Features = ({products, color}) => {
    let product = useSelector(state => state?.productReducer?.product)
    let colorIDDDD = useSelector(state => state?.productReducer?.updateColorId)
    // onClick{()=> dispatch(action?.productAction?.updateColor(colorId)}
    let params = useParams()
    // console.log('products are', products)
    // console.log('product1111 is', product)
    // console.log('colorIDDDDD is', colorIDDDD)
    let {productInformation} = params
    productInformation = productInformation.split("&")
    const colorId = productInformation[3]
    // console.log("colorId", colorId)
    const imgs = product?.images
    const imgSelected = imgs?.find(img => img.colorId === colorIDDDD)
    const images = imgSelected?.mainCarousel?.media.split('|')
    // console.log('images are', images)
    // const imageFront = images[0]
    // const imageBack = images[1]
    // const {width} = useWindowSize

    return (
        <div className='Features'>
            <div className='Features_WhyWeMadeThis'>
                <div className='WhyWeMadeThisIntro'>
                    <h2>Why we made this</h2>
                    <div className='Features_WhyWeMadeThis_tags'>
                        <hr/>
                        <p>
                            {product?.whyWeMadeThis}
                        </p>
                    </div>
                </div>
                <div className='Features_WhyWeMadeThis_Img'>
                    {product &&
                        <div className='Features_WhyWeMadeThis_Img_Res'
                            //  style={{
                            //      backgroundImage:
                            //      `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(255, 255, 255, 255) 100%),
                            // url('${images[0]}')`
                            //  }}
                             // src={images[0]}
                             alt=""></div>}
                    {images &&
                        <img className='Features_WhyWeMadeThis_Img_Gallery'  src={images[0]}
                             alt=""/>}
                    {images &&
                        <img className='Features_WhyWeMadeThis_Img_GallerySecond'  style={{}}
                             src={images[1]} alt=""/>}
                </div>
            </div>
            <div className='panels'>
                {product?.featurePanels.map((element, index) =>
                    <FeatureList featurePanels={element} key={index}/>
                )}
            </div>

        </div>
    )
}