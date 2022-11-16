import {useState} from "react";
import {Link} from "react-router-dom";
import {saveRecentViewed} from "../../Helper";

export const ProductDetailsYouMayLikeProducts =({product}) =>{
    const [displayImage, setDisplayImage] = useState(product?.one)
    const [isLink, setIsLink] = useState(false)
    const [colorID1, setColorID1] = useState(product?.swatches[0].colorId)

    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media.split('|')
        element.one = imageList[0]
        element.two = imageList[1]
        return element
    })

    return(
        <div className='ProductDetailYouMayLikeProducts'>
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

                <div className='ProductDetailYouMayLikeProducts_Image'>
                    {<img src={displayImage} width='60px' height='90px' alt=""/>}
                </div>
                </Link>
        </div>
    )
}