// import {actionType} from "../Helper";
// const initialState = {
//     isLoading: null,
//     allFilters: null,
//     allProductList:[],
//     product: null,
//     updateColorId: null,
//     sortingIndex: 1,
//     pageNum: 1,
//     totalProducts: [],
//     recentView: [],
//     recentViewFlag: false,
//     totalProductNum: null, ///////////////////////////
//     errorMessage: null, ////////////////////////////
//
//
//
// }
//
// export const productReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionType.FETCH_ALL_PRODUCTS:
//             // console.log('total product test',action.payload)
//             return {...state, totalProducts: action.payload}
//         case actionType.IS_LOADING:
//             return{...state, isLoading: action.payload}
//         case actionType.FETCH_FILTERS:
//             return {...state, allFilters: action?.payload}
//         case actionType.FETCH_ALL_SORTING1:
//             return {...state, allProductList: action.payload}
//         case actionType.FETCH_EACH_PRODUCT:
//             return {...state, product: action.payload}
//         case actionType.UPDATE_COLORID:
//             return {...state,updateColorId: action.payload}
//         // all productList refresh
//         case actionType.FETCH_ALL_PRODUCTS_PAGE_SORT:
//             // console.log(`action`, action.payload)
//             let updatedProductList = [...state.allProductList]
//             return {...state, allProductList: updatedProductList.concat(action?.payload)}
//         // update sort
//         case actionType.UPDATE_SORT_INDEX:
//             return {...state, sortingIndex: action.payload}
//             // update page
//         case actionType.UPDATE_PAGE_NUMBER:
//             return {...state, pageNum: action.payload}
//         case actionType.UPDATE_RECENT_VIEW:
//             console.log('updated recent view pages')
//             let updatedPages = [...state.recentView]
//             return {...state, recentView: updatedPages.concat(action?.payload)}
//         case actionType.FETCH_ALL_PRODUCTS_FILTER: //////////////////////////////////////
//             return {...state, allProductList: action?.payload}
//         case actionType.UPDATE_FILTER: ////////////////////////////////////////////////
//             return {...state, allFilters: action?.payload}
//         case actionType.UPDATE_ALL_PRODUCTS_FILTER: //////////////////////////////////////
//             let updatedFilterProductList = [...state.allProductList]
//             return {...state, allProductList: updatedFilterProductList.concat(action?.payload)}
//         case actionType.FETCH_TOTAL_PRODUCT_NUM: ///////////////////////////////////////////
//             return {...state, totalProductNum: action?.payload}
//         case actionType.FETCH_FAILURE: /////////////////////////////////////////////////////////
//             return {...state, errorMessage: action?.payload}
//
//         default:
//             return state
//     }
// }
