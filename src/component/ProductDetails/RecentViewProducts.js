import {useSelector} from "react-redux";
import {ProductDetailsYouMayAlsoLikeProducts} from "./ProductDetailsYouMayAlsoLikeProducts";
import {getRecentViews} from "../../Helper";
import './ProductDetailSCSS/ProductRecentReview.scss'
import {useState} from "react";
import {useEffect, useRef} from "react";

export const RecentViewProducts = () => {
    // let recentViewProducts = useSelector(state => state?.productReducer?.recentView)
    let recentViewProducts = getRecentViews()
    console.log('review????',recentViewProducts)
    const ref = useRef(null)
    let isDown = false;
    let startX;
    let scrollLeft;
    let product = useSelector(state => state?.productReducer?.allProductList)
    const [imageFront1, setImageFront1] = useState(product?.images?.whyWeMadeThis[0])
    const [imageFront, setImageFront] = useState()
    useEffect(() => setImageFront1(product?.images?.mainCarousel?.media.split('|')[0]),[])
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

    return (
        <div className='Product_RecentReview'>
            <div>
                <div className='Product_RecentReview_Header'>Recent viewed</div>
                <div className='Product_RecentReview_ListProducts'>
                    <div className='item' ref={ref}>
                        {recentViewProducts?.map((product, index) =>
                            <ProductDetailsYouMayAlsoLikeProducts product={product} key={index}/>
                        )}
                    </div>

                </div>
            </div>


        </div>
    )
}