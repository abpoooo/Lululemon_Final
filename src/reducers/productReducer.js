import {actionType, modalActionType} from "../Helper";
const initialState = {
    isLoading: null,
    allFilters: null,
    allProductList:[],
    product: null,
    updateColorId: null,
    sortingIndex: 1,
    pageNum: 1,
    totalProducts: [],
    recentView: [],
    recentViewFlag: false,
    totalProductNum: null, ///////////////////////////
    errorMessage: null, ////////////////////////////
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], // store cart
    cartDetail: []


}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_ALL_PRODUCTS:
            // console.log('total product test',action.payload)
            return {...state, totalProducts: action.payload}
        case actionType.IS_LOADING:
            return{...state, isLoading: action.payload}
        case actionType.FETCH_FILTERS:
            return {...state, allFilters: action?.payload}
        case actionType.FETCH_ALL_SORTING1:
            return {...state, allProductList: action.payload}
        case actionType.FETCH_EACH_PRODUCT:
            return {...state, product: action.payload}
        case actionType.UPDATE_COLORID:
            return {...state,updateColorId: action.payload}
        // all productList refresh
        case actionType.FETCH_ALL_PRODUCTS_PAGE_SORT:
            // console.log(`action`, action.payload)
            let updatedProductList = [...state.allProductList]
            return {...state, allProductList: updatedProductList.concat(action?.payload)}
        // update sort
        case actionType.UPDATE_SORT_INDEX:
            return {...state, sortingIndex: action.payload}
            // update page
        case actionType.UPDATE_PAGE_NUMBER:
            return {...state, pageNum: action.payload}
        case actionType.UPDATE_RECENT_VIEW:
            console.log('updated recent view pages')
            let updatedPages = [...state.recentView]
            return {...state, recentView: updatedPages.concat(action?.payload)}
        case actionType.FETCH_ALL_PRODUCTS_FILTER: //////////////////////////////////////
            return {...state, allProductList: action?.payload}
        case actionType.UPDATE_FILTER: ////////////////////////////////////////////////
            return {...state, allFilters: action?.payload}
        case actionType.UPDATE_ALL_PRODUCTS_FILTER: //////////////////////////////////////
            let updatedFilterProductList = [...state.allProductList]
            return {...state, allProductList: updatedFilterProductList.concat(action?.payload)}
        case actionType.FETCH_TOTAL_PRODUCT_NUM: ///////////////////////////////////////////
            return {...state, totalProductNum: action?.payload}
        case actionType.FETCH_FAILURE: /////////////////////////////////////////////////////////
            return {...state, errorMessage: action?.payload}


        case modalActionType.AUTO_UPDATE_CART_DETAIL:
            //create copied cart
            let newCartDetail = [...state.cart]
            let productForAddCartDetail = state.allProductList ? [...state.allProductList] : []
            newCartDetail = newCartDetail.map(({quantity, productId, colorId, size})=> {
                let product = productForAddCartDetail.filter(product => productId === product?.productId)[0]
                let colorIndex = product?.images.findIndex((image) => colorId === image.colorId)
                let newImg = product?.images[colorIndex].maninCarousel?.media.split("|")[0]
                let newColorAlt = product?.images[colorIndex].colorAlt
                return {quantity, productId, colorId, size, name:product?.name, src:newImg, price:product?.price, colorAlt: newColorAlt}
            })
            return {...state, cartDetail: newCartDetail}



        // update color and size
        case modalActionType.UPDATE_CART_ITEM_COLOR_AND_SIZE:
            let newCartForChangeColorSize = [...state.cart]
            let itemIndex = newCartForChangeColorSize.findIndex(({quantity, productId, colorId, size}) => productId === action.payload.productId && colorId === action.payload.oldColor && size === action.payload.oldSize)
            let sameItemIndex = newCartForChangeColorSize.findIndex(({quantity, productId, colorId, size},index) => productId === action.payload.productId && colorId === action.payload.newColor && size === action.payload.newSize && index !== itemIndex)
            itemIndex >= 0 && (newCartForChangeColorSize[itemIndex] = {
                // merge quantity that has same color and size
                quantity: sameItemIndex >= 0 ? (newCartForChangeColorSize[itemIndex].quantity + newCartForChangeColorSize[sameItemIndex].quantity) : (newCartForChangeColorSize[itemIndex].quantity),
                productId: newCartForChangeColorSize[itemIndex].productId,
                colorId: action.payload.newColor,
                size: action.payload.newSize
            })
            sameItemIndex >= 0 && newCartForChangeColorSize.splice(sameItemIndex, 1) // remove merged item
            console.log(newCartForChangeColorSize)
            // for merge same color and size
            return {...state, cart: newCartForChangeColorSize}
        default:
            return state
    }
}
