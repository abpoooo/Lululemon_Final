import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {ProductDetails} from "./ProductDetails";
import {ProductDetailYouMayAlsoLike} from "./ProductDetailYouMayAlsoLike";
import {NavBar} from "../NavBar";
import {Footer} from "../Footer";
import {Features} from "./Features";
import {useEffect, useMemo} from "react";
import {RecentViewProducts} from "./RecentViewProducts";
import actions from "../../actions";
// import {Features} from "../Fe";
import './ProductDetailSCSS/ProductPage.scss'
import {Review} from "./Review/Review";
import {VirtualShopping} from "./VirtualShopping";
import {useLocation} from "react-router-dom";
import {AddToBag} from "./CartAndCheckout/AddToBag";
import {useState} from "react";


export const ProductPage = () => {
    const dispatch = useDispatch()
    let params = useParams()

    let {productInformation} = params
    productInformation = productInformation.split("&")
    let products = useSelector(state => state?.productReducer?.product)
    let colorID = useSelector(state => state?.productReducer?.updateColorId)

    // productInformation = productInformation.split("&")
    let colorId = productInformation[3]
    // console.log('fetch information product id',productInformation[2])
    // console.log('colorId in this page is',colorId)
    useEffect(() => {
        dispatch(actions?.productActions.fetchEachProduct(productInformation[2]))
        dispatch(actions?.productActions.updateColor(productInformation[3]))
    }, [])

    const useQuery = () => {
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search])
    }
    let query = useQuery()
    let modal = useSelector(state => state.modalReducer)
    // const size={query.get("size")
    const [selectSize, setSelectSize] = useState(null)
    const Size1 = () => {
        return <div className='Products_details_Main_Product_Contents_Size'>
            <div className='title'>
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
                        // navigate((`/product/productInfo/&${products?.name}&${products.productId}&color=${colorID}&size=${size}`))
                    }}
                         // style={selectSize === size ? {backgroundColor: "black", color: 'white'} : {}}
                    >
                        {size}
                    </div>
                )}
            </div>
        </div>
    }



    return (
        <div className='Product_Details'>
            <div className='Product_Details_Header'>
                <NavBar/>
            </div>
            <div className='Product_Details_MainContent'>
                <ProductDetails/>
            </div>

            <div className='Product_Details_Features'>
                <Features products={products} color={colorId}/>
            </div>
            <div className='Product_Details_YouMayAlsoLikeProducts'>
                <ProductDetailYouMayAlsoLike/>
            </div>
            <div className='Product_Details_RecentViewProducts'>
                {/* RecentView*/}
                <RecentViewProducts/>
            </div>
            <div className='Product_Details_Reviews'>
                <Review/>
            </div>
            <div className='Product_Details_Virtual'>
                {/*    Virtual*/}
                <VirtualShopping/>
            </div>
            <div className='Product_Details_Footer'>
                <Footer/>
            </div>
            {/*<div className='Product_Details_AddToBag'>*/}
            {/*    {modal.addToBagPage && <AddToBag color={colorID} size={query.get("size")}/>}*/}
            {/*</div>*/}

        </div>
    )
}