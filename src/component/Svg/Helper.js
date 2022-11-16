// export const URL = `http://api-lulu.hibitbyte.com/product/`
// export const filter = `filter`
// export const allProducts = `allProducts`
// export const product = `product/`
// // export const sortingIndex = `1` ////////////////////////////////
//
//
//
// export const APISelection = products => {
//     const filterAllProducts = products.filter(element =>
//         element.images?.length > 0 &&
//         element.images[0].whyWeMadeThis.length > 0)
//     return filterAllProducts
// }
//
//
//
//
// // action types
// export const actionType = {
//     'IS_LOADING': 'IS_LOADING',
//     'FETCH_FILTERS':'FETCH_FILTERS',
//     'FETCH_ALL_SORTING':'FETCH_ALL_SORTING',
//     'FETCH_ALL_SORTING_FILTERS':'FETCH_ALL_SORTING_FILTERS',
//     'FETCH_ALL_SORTING_PRODUCTS':'FETCH_ALL_SORTING_PRODUCTS',
//     'FETCH_EACH_PRODUCT':'FETCH_EACH_PRODUCT',
//     'FETCH_ALL_SORTING1':'FETCH_ALL_SORTING1',
//     'UPDATE_COLORID':'UPDATE_COLORID',
//     'FETCH_SORTINGS_OF_KIND':'FETCH_SORTINGS_OF_KIND',
//     'FETCH_ALL_PRODUCTS_PAGE_SORT':'FETCH_ALL_PRODUCTS_PAGE_SORT',
//     'UPDATE_SORT_INDEX':'UPDATE_SORT_INDEX',
//     'UPDATE_PAGE_NUMBER':'UPDATE_PAGE_NUMBER',
//     'FETCH_ALL_PRODUCTS':'FETCH_ALL_PRODUCTS',
//     'UPDATE_RECENT_VIEW':'UPDATE_RECENT_VIEW',
//     'FETCH_ALL_PRODUCTS_FILTER': 'FETCH_ALL_PRODUCTS_FILTER', ////////////////////////////
//     'UPDATE_FILTER': 'UPDATE_FILTER',//////////////////////////////
//     'UPDATE_ALL_PRODUCTS_FILTER': 'UPDATE_ALL_PRODUCTS_FILTER', /////////////////////
//     'FETCH_TOTAL_PRODUCT_NUM': 'FETCH_TOTAL_PRODUCT_NUM', ////////////////////////////
//     'FETCH_FAILURE': 'FETCH_FAILURE', /////////////////////////////////////
//
//
//
// }
//
//
// // lazy loading
// export const LazyLoading = () => {
//     // const images = document.querySelectorAll('[data-src]')
//
//     const observe = new IntersectionObserver(
//         entries => {
//             entries.forEach(entry => {
//                 entry.target.classList.toggle("show",entry.isIntersecting)
//             })
//         },{
//             rootMargin: '400px 0px 0px 0px',
//             threshold: 0
//         }
//     )
//     const img = document.querySelectorAll(".Products")
//     img.forEach(img1 => observe.observe(img1))
//     return() => {
//         img.forEach(img1 => observe.unobserve(img1))
//     }
// }
//
//
// // array to Matrix[[][]]
// export const toMatrix = (arr, width) => arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
//
//
// export const handleEmptyProducts = products => {
//     const filterProducts = products.filter(element => typeof element === 'object' && !(element.length === 0))
//     return(filterProducts)
// }
//
// export const saveRecentViewed = product => {
//     let currentProducts = localStorage.getItem("recentView")
//     console.log('pass in ', product)
//     if (currentProducts){
//         currentProducts = JSON.parse(currentProducts)
//         console.log('current products',currentProducts)
//         let newProductArray = currentProducts.concat(product)
//         let newProductString = JSON.stringify(newProductArray)
//         window.localStorage.setItem("recentView",newProductString)
//     }
//     else {
//         let productArray =  [].concat(product)
//         let productString = JSON.stringify(productArray)
//         window.localStorage.setItem("recentView",productString)
//     }
// }
//
// export const getRecentViews = () => {
//     if (localStorage.getItem("recentView")===null){
//         console.log('no local storage')
//     }
//     else {
//         console.log('there are local storage')
//         let product = JSON.parse(localStorage.getItem("recentView"))
//         console.log('products',product)
//         return product
//     }
// }