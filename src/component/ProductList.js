import {useDispatch, useSelector} from "react-redux";
import {ProductComponent} from './productComponent'
import {dividerClasses} from "@mui/material";
import {useEffect, useState} from "react";
import actions from "../actions";
import '../Scss_styles/ProductList.scss'
import {allProducts, toMatrix} from "../Helper";
import AddIcon from '@mui/icons-material/Add';


export const ProductList = () => {
    const dispatch = useDispatch()
    let products = useSelector(state => state?.productReducer?.allProductList)

    // let totalNum = useSelector(state => state?.productReducer?.allProductList).length
    // console.log('allProductList',products)
    // let filters = useSelector(state => state?.productReducer?.allFilters)
    // set up states of display numbers of images
    let totalNum = useSelector(state => state?.productReducer?.totalProducts).length
    // console.log('totalNumber is', totalNum)
    const [displayNum, setDisplayNum] = useState(0)

    let sortIndex = useSelector(state => state?.productReducer?.sortingIndex)
    let pageNum = useSelector(state => state?.productReducer?.pageNum)
    // State of index
    useEffect(() => {
        setDisplayNum(products.length)
    }, [products])

    // const [index, setIndex] = useState(1)

    // button call back function to update
    // function addNewImages(arr) {
    //     setIndex(index + 1)
    //     // setDisplayNum(displayNum + 24)
    // }


    // const productsMatrix = toMatrix(products, 24)

    // const getNewImages = (matrix, index) => {
    //     return matrix?.slice(0,index).map(array => array?.map((element, index) => {
    //         return <ProductComponent product={element} key={index}/>
    //     }))
    // }
    //
    // useEffect(()=>{
    //     dispatch(actions?.productActions?.fetchAllFilters())}, [])

    return (
        <div>
            <div className='Products_List'>
                <div className='Product_List_ListsCards'>
                    {/*{getNewImages(productsMatrix, index)}*/}
                    {products && products.map((element, index) => <ProductComponent key={index} product={element}/>)}
                </div>

                <div className='Products_List_ViewMoreImages'>
                    <div>
                        <div className='Products_List_ViewMoreImages_Display'>Viewing {displayNum} of {totalNum}</div>
                        {
                            // products?.map((element, index) => <ProductComponent key={index} product={element}/>)
                            pageNum < 5 &&
                                <div className='Products_List_Content' onClick={() => {
                                     dispatch(actions?.productActions?.updatePageNumber(pageNum + 1))
                                     dispatch(actions?.productActions?.fetchProductBySortAndPageNum(pageNum + 1, sortIndex))
                                 }}>
                                    <AddIcon className='Products_List_Content_Icon'/>
                                    <button className='Products_List_Content_Btn'>View More Products</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='Products_List_media'>
                <div className='Product_List_media_ListsCards'>
                    {/*{getNewImages(productsMatrix, index)}*/}
                    {products && products.map((element, index) => <ProductComponent key={index} product={element}/>)}
                </div>
                <div className='Products_List_media_ViewMoreImages'>
                    <div
                        className='Products_List_media_ViewMoreImages_Display'>Viewing {displayNum} of {totalNum}</div>
                </div>
                {
                    pageNum < 5 &&
                    <div className='Products_List_Content' onClick={() => {
                        dispatch(actions?.productActions?.updatePageNumber(pageNum + 1))
                        dispatch(actions?.productActions?.fetchProductBySortAndPageNum(pageNum + 1, sortIndex))
                    }}>
                        <AddIcon className='Products_List_Content_Icon'/>
                        <button className='Products_List_Content_Btn'>View More Products</button>
                    </div>
                }
            </div>

        </div>


    )
}
