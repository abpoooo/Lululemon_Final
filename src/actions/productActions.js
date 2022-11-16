import {actionType, allProducts, APISelection, filter, filtersJson, handleEmptyProducts, product, URL} from "../Helper";
import axios from "axios";
import {type} from "@testing-library/user-event/dist/type";

const fetchAllFilters = () => dispatch => {
    dispatch(
        {
            type: actionType.IS_LOADING,
            payload: true
        }
    )
    // console.log('testing')
    axios.get(URL + 'filter', {})
        .then(res => {
            // const {data:{rs}} = res
            let filters = res.data.rs
            // console.log('filters is :', res)

            dispatch(
                {
                    type: actionType.FETCH_FILTERS,
                    payload: filters
                }
            )
            dispatch(
                {
                    type: actionType.IS_LOADING,
                    payload: false
                }
            )
        }).catch(err => {
        console.log("Sorry, there is an error", err)
        dispatch(
            {
                type: actionType.IS_LOADING,
                payload: false
            }
        )
    })
}

const fetchALlProducts = () =>  dispatch => {
    console.log('start fetching allProduct action')
    dispatch(
        {
            type: actionType.IS_LOADING,
            payload: true
        }
    )
    // try {
    //     let res = await axios({
    //         method: 'get',
    //         url: `${URL}${allProducts}`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //     const {data: {rs: {products}}} = res
    //     const filterProducts = APISelection(products)
    //     console.log('products nums are', filterProducts)
    //
    //     dispatch(
    //         {
    //             type: actionType.FETCH_ALL_PRODUCTS,
    //             payload: filterProducts
    //         }
    //     )
    //     dispatch(updatePageNumber(1))
    // } catch (error) {
    //     console.log('there is an error', error)
    // }
    axios.get(`${URL}${allProducts}`, {

    })
        .then(res => {
            // console.log("res is:",res)
            let products = res.data.rs.products
            products = handleEmptyProducts(products)
            // console.log("products is:", products)
            dispatch(
                {
                    type: actionType.FETCH_ALL_PRODUCTS,
                    payload:products
                }
            )
            dispatch(
                {
                    type: actionType.IS_LOADING,
                    payload: false
                }
            )

        }).catch(err => {
        console.log("Sorry, there is an error", err)
        dispatch(
            {
                type:actionType.IS_LOADING,
                payload:false
            })
    })
}

const fetchAllSorting1 = index => async dispatch => {
    // console.log("start fetch sorting")
    dispatch({
        type: actionType.IS_LOADING,
        payload: true
    })
    await axios.post(`${URL}${allProducts}?sortingId=${index}`, {})
        .then(res => {
            let filterProducts = res.data.rs.products
            filterProducts = APISelection(filterProducts)
            // console.log(filterProducts)
            dispatch({
                type: actionType.FETCH_ALL_SORTING1,
                payload: filterProducts
            })
            dispatch({
                type: actionType.IS_LOADING,
                payload: false
            })
        }).catch(error => {
        console.log('fetch error', error)
        dispatch({
            type: actionType.IS_LOADING,
            payload: false
        })

    })
}

// inside clicking of each product imgs
const fetchEachProduct = productId =>   dispatch => {
    // console.log("fetch each product",productId)
    dispatch({
        type: actionType.IS_LOADING,
        payload: true
    })
// depending on different product id to get specific details inside
// each product including images, swatches, features, panels, icons
//    each product details could be used from global store to render on your parts
     axios.get(`${URL}${productId}`, {})
        .then(res => {
            let eachProduct = res.data.rs

            // console.log("eachProduct details:", eachProduct)
            dispatch({
                type: actionType.IS_LOADING,
                payload: false
            })
            dispatch({
                type: actionType.FETCH_EACH_PRODUCT,
                payload: eachProduct
            })
        }).catch(err => {
        console.log("fetch error", err)
        dispatch({
            type: actionType.IS_LOADING,
            payload: false
        })
    })

}

const updateColor = (index) =>  dispatch => {
     dispatch({
        type: actionType.UPDATE_COLORID,
        payload: index
    })
    // console.log('color id got')
}

const fetchProductBySortAndPageNum = (pageNum, sortIndex) =>  async dispatch => {
    try {
        let res = await axios({
            method: 'post',
            url: `${URL}${allProducts}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                sortingId: sortIndex,
                page: pageNum
            }
        })
        // console.log('')
        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyProducts(products)
        // console.log('products', filterProducts)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_PAGE_SORT,
            payload: filterProducts
        })
        dispatch({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortIndex
        })
        dispatch(updatePageNumber(pageNum))
    } catch (error) {
        console.log('there is an error', error)
    }
}

const fetchProductBySort = (sortIndex) => async dispatch => {
    try {
        let res = await axios({
            method: 'post',
            url: `${URL}${allProducts}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                sortingId: sortIndex,
            }
        })
        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyProducts(products)
        console.log('products', products)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_PAGE_SORT,
            payload: filterProducts
        })
        dispatch(updatePageNumber(1))
    } catch (error) {
        console.log('there is an error', error)
    }
}

const updatePageNumber = pageNum => ({
    type: actionType.UPDATE_PAGE_NUMBER,
    payload: pageNum
})

const updateRecentViewed = product => (
    {
        type:actionType.UPDATE_RECENT_VIEW,
        payload: product
    }
)

const updateFilter = filter => { ///////////////////////////////////////////////////////////////////

    return {
        type: actionType.UPDATE_FILTER,
        payload: filter
    }
}

const fetchProductWithFilter = (filters, pageNum, sortingIndex) => async dispatch => { ///////////////////////////////////////////////

    dispatch({
        type: actionType.IS_LOADING,
        payload: true
    })

    const data = JSON.stringify(filters)

    try {
        let res = await axios({
            method: 'post',
            url: `${URL}${allProducts}`,
            headers: {
                'Content-Type' : 'application/json'
            },
            params: {
                sortingId: sortingIndex,
                page: pageNum,
            },
            data: data
        })

        const {data: {rs: {products}}} = res
        const {data: {rs: {pageParams: {totalProducts}}}} = res
        const filterProducts = handleEmptyProducts(products)

        dispatch ({
            type: actionType.FETCH_ALL_PRODUCTS_FILTER,
            payload: filterProducts
        })
        dispatch ({
            type: actionType.IS_LOADING,
            payload: false
        })
        dispatch ({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortingIndex
        })
        dispatch(updatePageNumber(pageNum))
        dispatch(fetchTotalProductNum(totalProducts))
    } catch (error) {
        dispatch ({
            type: actionType.IS_LOADING,
            payload: false
        })
        dispatch ({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

const fetchTotalProductNum = num => ({ //////////////////////////////////////////////////////////////
    type: actionType.FETCH_TOTAL_PRODUCT_NUM,
    payload: num
})


const updateProductWithFilter = (filters, pageNum, sortingIndex) => async dispatch => { //////////////////////////////////////////////////

    dispatch ({
        type: actionType.IS_LOADING,
        payload: true
    })

    const data = JSON.stringify(filters)

    try {
        let res = await axios({
            method: 'post',
            url: `${URL}${allProducts}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                sortingId: sortingIndex,
                page: pageNum,
            },
            data: data
        })

        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyProducts(products)

        dispatch({
            type: actionType.UPDATE_ALL_PRODUCTS_FILTER,
            payload: filterProducts
        })
        dispatch({
            type: actionType.IS_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortingIndex
        })
        dispatch(updatePageNumber(pageNum))

    } catch (error) {
        dispatch({
            type: actionType.IS_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}



export default {
    fetchAllFilters,
    fetchALlProducts,
    fetchAllSorting1,
    fetchEachProduct,
    updateColor,
    fetchProductBySortAndPageNum,
    updatePageNumber,
    updateRecentViewed,
    // fetchProductBySort
    updateFilter, ///////////////////////////////
    fetchProductWithFilter, /////////////////////////
    updateProductWithFilter, //////////////////////////////
    fetchTotalProductNum, ///////////////////////////////////

}
