import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {ProductDetailsYouMayAlsoLikeProducts} from "./ProductDetailsYouMayAlsoLikeProducts";
import '../../Scss_styles/ProductAlsoLike.scss'
import {useEffect, useRef} from "react";
import actions from "../../actions";


export const ProductDetailYouMayAlsoLike = () => {
    let allProducts = useSelector(state => state?.productReducer?.totalProducts)
    const dispatch = useDispatch()
    // useEffect(() => actions.productActions.fetchEachProduct)
    //get url parameters
    let params = useParams()
    let {productInformation} = params
    // console.log('all products are', allProducts)

    // store parameters in to array
    productInformation = productInformation?.split('&')

    let sourceName = productInformation[1]?.split(" ")
    let colorID = productInformation[3]
    // console.log('colorID is',colorID)
    // console.log('info ', productInformation)
    // get similar products
    const similarProducts = allProducts?.filter(product => {
        const targetName = product?.name.split(" ")
        return (product?.productId !== productInformation[2] && sourceName.some(value => targetName.includes(value)))
    })
    // console.log('similar products are',similarProducts)

    // set front and back images from mainCarousel for similar products
    similarProducts.forEach(object => {
        // console.log('object is :',object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split('|')
        object.one = imageList[0]
        object.two = imageList[1]
    })

    // slice and take only 4 images
    const takeFourSimilarProducts = similarProducts?.length > 4 && similarProducts?.slice(0, 4)
    // console.log('four projects selected are', takeFourSimilarProducts)
    const takeOnlyProducts =
        similarProducts?.length < 4 && similarProducts?.slice(0, 3)
    const takeEightSimilarProducts = similarProducts?.length > 8 && similarProducts?.slice(0, 8)

    // console.log('only product',takeOnlyProducts)

    useEffect(() => dispatch(actions.productActions.fetchEachProduct(similarProducts.productId)),[similarProducts])


    //
    const ref = useRef(null)
    let isDown = false;
    let startX;
    let scrollLeft;
    useEffect(() => {
        const element = ref.current
        // console.log(element)
        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.classList.add('active');
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });
        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mouseup', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            element.scrollLeft = scrollLeft - walk;
        });
    }, [])
    //

    return (
        <div>
            <div className='Products_details_YouMayAlsoLIke'>
                <div className='Products_details_YouMayAlsoLIke_Header'>You may also like</div>
                <div className='Products_details_YouMayAlsoLIke_ListProducts' ref={ref}>
                    {takeFourSimilarProducts && takeFourSimilarProducts?.map((product, index) =>
                        <ProductDetailsYouMayAlsoLikeProducts product={product} key={index}/>
                    )}
                    {!takeFourSimilarProducts && takeOnlyProducts?.map((product, index) =>
                            <ProductDetailsYouMayAlsoLikeProducts product={product} index={index} colorID={colorID} key={index}/>)}
                </div>
            </div>


        </div>


    )
}
{/*<div className='Products_details_YouMayAlsoLIke_media' >*/
}
{/*    <div className='Products_details_YouMayAlsoLIke_Header_Media'>You may also like</div> */
}
{/*    <div className='Products_details_YouMayAlsoLIke_ListProducts_media'>*/
}
{/*        {takeEightSimilarProducts && takeEightSimilarProducts?.map((product, index) =>*/
}
{/*            <ProductDetailsYouMayAlsoLikeProducts product={product} key={index}/>*/
}
{/*        )} */
}
{/*    </div>*/
}
{/*</div>*/
}