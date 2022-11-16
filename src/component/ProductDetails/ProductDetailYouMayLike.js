import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {ProductDetailsYouMayAlsoLikeProducts} from "./ProductDetailsYouMayAlsoLikeProducts";
import {ProductDetailsYouMayLikeProducts} from "./ProductDetailsYouMayLikeProducts";
import './ProductDetailSCSS/MayLike.scss'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';


export const ProductDetailYouMayLike = () => {
    let allProducts = useSelector(state => state?.productReducer?.totalProducts)
    let params = useParams()
    let {productInformation} = params
    // console.log('all products are', allProducts)

    // store parameters in to array
    productInformation = productInformation?.split('&')

    let sourceName = productInformation[1]?.split(" ")

    // get similar products
    const similarProducts1 = allProducts?.filter(product => {
        const targetName = product?.name.split(" ")
        return(product?.productId !== productInformation[2] && sourceName.some(value => targetName.includes(value)))
    })
    // console.log('similar products are',similarProducts)

    // set front and back images from mainCarousel for similar products
    similarProducts1.forEach(object =>{
        // console.log('object is :',object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split('|')
        object.one = imageList[0]
        object.two = imageList[1]
    })

    // slice and take only 4 images
    const takeFourSimilarProducts1 = similarProducts1?.length > 4 && similarProducts1?.slice(0,4)

    return(
        <div className='Product_details_YouMayLike'>
            {/*<div><ShoppingBagOutlinedIcon/></div>*/}
            <div className='Products_details_YouMayLIke_Header'>You may like</div>
            <div className='Products_details_YouMayLIke_ListProducts'>
                {takeFourSimilarProducts1 && takeFourSimilarProducts1?.map((product, index) =>
                    <div className='Products_details_YouMayLIke_Products'>
                        <div className='Products_details_YouMayLIke_Products_list'>
                            <ProductDetailsYouMayLikeProducts product={product} key={index}/>
                        </div>
                        <div className='Products_details_YouMayLIke_Products_Name'>
                            <p>{product.name}</p>
                        </div>

                    </div>

                )}
                {/*{*/}
                {/*    !takeFourSimilarProducts && takeOnlyProducts?.map((product, index) =>*/}
                {/*        <ProductDetailsYouMayAlsoLikeProducts product={product} index={index} colorID={colorID} key={index}/>*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </div>
    )
}