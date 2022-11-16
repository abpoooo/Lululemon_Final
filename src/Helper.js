export const URL = `http://api-lulu.hibitbyte.com/product/`
export const filter = `filter`
export const allProducts = `allProducts`
export const product = `product/`
// export const sortingIndex = `1` ////////////////////////////////
// export const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmsyd2luQGluZm8uY29tIiwicGFzc3dvcmQiOiJNYXJrMndpbiIsImlhdCI6MTY2NDE0MTM1MSwiZXhwIjoxNjY0MTQ4NTUxfQ.oHMSTB_pxdn-AmVrRagE3AclVsFz9w4FFYpBCKFdFv4"
export const APISelection = products => {
    const filterAllProducts = products.filter(element =>
        element.images?.length > 0 &&
        element.images[0].whyWeMadeThis.length > 0)
    return filterAllProducts
}


// action types
export const actionType = {
    'IS_LOADING': 'IS_LOADING',
    'FETCH_FILTERS': 'FETCH_FILTERS',
    'FETCH_ALL_SORTING': 'FETCH_ALL_SORTING',
    'FETCH_ALL_SORTING_FILTERS': 'FETCH_ALL_SORTING_FILTERS',
    'FETCH_ALL_SORTING_PRODUCTS': 'FETCH_ALL_SORTING_PRODUCTS',
    'FETCH_EACH_PRODUCT': 'FETCH_EACH_PRODUCT',
    'FETCH_ALL_SORTING1': 'FETCH_ALL_SORTING1',
    'UPDATE_COLORID': 'UPDATE_COLORID',
    'FETCH_SORTINGS_OF_KIND': 'FETCH_SORTINGS_OF_KIND',
    'FETCH_ALL_PRODUCTS_PAGE_SORT': 'FETCH_ALL_PRODUCTS_PAGE_SORT',
    'UPDATE_SORT_INDEX': 'UPDATE_SORT_INDEX',
    'UPDATE_PAGE_NUMBER': 'UPDATE_PAGE_NUMBER',
    'FETCH_ALL_PRODUCTS': 'FETCH_ALL_PRODUCTS',
    'UPDATE_RECENT_VIEW': 'UPDATE_RECENT_VIEW',
    'FETCH_ALL_PRODUCTS_FILTER': 'FETCH_ALL_PRODUCTS_FILTER', ////////////////////////////
    'UPDATE_FILTER': 'UPDATE_FILTER',//////////////////////////////
    'UPDATE_ALL_PRODUCTS_FILTER': 'UPDATE_ALL_PRODUCTS_FILTER', /////////////////////
    'FETCH_TOTAL_PRODUCT_NUM': 'FETCH_TOTAL_PRODUCT_NUM', ////////////////////////////
    'FETCH_FAILURE': 'FETCH_FAILURE', /////////////////////////////////////


}

export const modalActionType = {
    'ADD_TO_BAG_PAGE': 'ADD_TO_BAG_PAGE',
    'LOG_IN':'LOG_IN',
    'ORDER':'ORDER',
    'PAYMENT_FAILURE':'PAYMENT_FAILURE',
    'PAYMENT_SUCCESS':'PAYMENT_SUCCESS',
    'UPDATE_ITEM_LIST':'UPDATE_ITEM_LIST',
    'ADD_ORDER':'ADD_ORDER',
    'REMOVE_ORDER':'REMOVE_ORDER',
    'UPDATE_ORDER':'UPDATE_ORDER',
    'UPDATE_ORDER_QUANTITY':'UPDATE_ORDER_QUANTITY',
    'UPDATE_PRICE':'UPDATE_PRICE',
    'UPDATE_EACH_QUANTITY':'UPDATE_EACH_QUANTITY',
    'UPDATE_LOCAL_LOCALSTORAGE':'UPDATE_LOCAL_LOCALSTORAGE',
    'EDIT':'EDIT',
    'SHOW_UPDATE_ITEM':'SHOW_UPDATE_ITEM',
    'UPDATE_ORDER_ITEMS':'UPDATE_ORDER_ITEMS',
    'ADD_SINGLE_ORDER':'ADD_SINGLE_ORDER',
    'AUTO_UPDATE_CART_DETAIL':'AUTO_UPDATE_CART_DETAIL',
    'UPDATE_CART_ITEM_COLOR_AND_SIZE':'UPDATE_CART_ITEM_COLOR_AND_SIZE'
}

export const backendActionType = {
    'CREATE_INFO':'CREATE_INFO',
    'GET_ORDER':'GET_ORDER',
    'GET_TRANS': 'GET_TRANS'
}


// lazy loading
export const LazyLoading = () => {
    // const images = document.querySelectorAll('[data-src]')

    const observe = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("show", entry.isIntersecting)
            })
        }, {
            rootMargin: '400px 0px 0px 0px',
            threshold: 0
        }
    )
    const img = document.querySelectorAll(".Products")
    img.forEach(img1 => observe.observe(img1))
    return () => {
        img.forEach(img1 => observe.unobserve(img1))
    }
}


// array to Matrix[[][]]
export const toMatrix = (arr, width) => arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, [])


export const handleEmptyProducts = products => {
    const filterProducts = products.filter(element => typeof element === 'object' && !(element.length === 0))
    return (filterProducts)
}

export const saveRecentViewed = product => {
    let currentProducts = localStorage.getItem("recentView")
    console.log('pass in ', product)
    if (currentProducts) {
        currentProducts = JSON.parse(currentProducts)
        console.log('current products', currentProducts)
        let newProductArray = currentProducts.concat(product)
        let newProductString = JSON.stringify(newProductArray)
        window.localStorage.setItem("recentView", newProductString)
    } else {
        let productArray = [].concat(product)
        let productString = JSON.stringify(productArray)
        window.localStorage.setItem("recentView", productString)
    }
}

export const getRecentViews = () => {
    if (localStorage.getItem("recentView") === null) {
        console.log('no local storage')
    } else {
        console.log('there are local storage')
        let review = JSON.parse(localStorage.getItem("recentView"))
        // console.log('products',product)
        return review
    }
}
export const saveReview = review => {
    let currentReviews = localStorage.getItem("reviews")
    console.log('pass in', review)
    console.log('recent review', JSON.parse(currentReviews))
    if (currentReviews) {
        currentReviews = JSON.parse(currentReviews)
        console.log('current', currentReviews)
        console.log('review', review)
        let newReviewArray = currentReviews.concat(review)
        let newReviewString = JSON.stringify(newReviewArray)
        window.localStorage.setItem('reviews', newReviewString)
    } else {
        let reviewArray = [].concat(review)
        let reviewString = JSON.stringify(reviewArray)
        window.localStorage.setItem('reviews', reviewString)
    }
}

// get review from the local storage
export const getReview = () => {
    if (localStorage.getItem("reviews") === null) {
        // console.log('no local storage data')
        return []
    } else {
        // console.log('has local storage data')
        let review = JSON.parse(localStorage.getItem('reviews'))
        // console.log('local storage product', product)
        return review
    }
}


export const RefundIcon = () => {
    return <svg height="24" width="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                className="perk-icons_icons__1Q2cU" focusable="false" role="img" aria-hidden="true">
        <g fill="none" fill-rule="evenodd">
            <path d="M-1188-263H252v1709h-1440z" fill="#FFF"></path>
            <g fill="currentColor" fill-rule="nonzero">
                <path
                    d="M20.25 14.5H6V14c0-.552.336-1 .75-1H21v.5c0 .552-.336 1-.75 1zM20.417 17.5H14V17c0-.274.062-.53.173-.71a.817.817 0 01.145-.182.386.386 0 01.227-.108H21v.5c0 .268-.061.546-.178.726a.767.767 0 01-.156.18.416.416 0 01-.25.094z"></path>
                <path
                    d="M22.25 3.25H1.75a1.5 1.5 0 00-1.5 1.5v14.5a1.5 1.5 0 001.5 1.5h20.5a1.5 1.5 0 001.5-1.5V4.75a1.5 1.5 0 00-1.5-1.5zm-20.5 1.5h20.5v14.5H1.75V4.75z"></path>
                <path
                    d="M8.25 6.25h-3.5a1.5 1.5 0 00-1.5 1.5v1.5a1.5 1.5 0 001.5 1.5h3.5a1.5 1.5 0 001.5-1.5v-1.5a1.5 1.5 0 00-1.5-1.5zm-3.5 1.5h3.5v1.5h-3.5v-1.5z"></path>
            </g>
        </g>
    </svg>
}

export const ClockIcon = () => {
    return <svg height="24" width="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                className="perk-icons_icons__1Q2cU" focusable="false" role="img" aria-hidden="true">
        <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <g transform="translate(-933.000000, -263.000000)">
                <g transform="translate(845.000000, 263.000000)">
                    <g transform="translate(88.000000, 0.000000)">
                        <path
                            d="M6.97105576,19.6213781 C8.62037025,21.6809944 11.15615,23 14,23 C18.9705627,23 23,18.9705627 23,14 C23,9.02943725 18.9705627,5 14,5 C11.2263995,5 8.74583714,6.25464569 7.09489512,8.22735496"
                            stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path>
                        <path
                            d="M8.10557053,11.5 L0,11.5 L0,11 C0,10.4477152 0.44771525,10 1,10 L9.10557053,10 L9.10557053,10.5 C9.10557053,11.0522848 8.65785523,11.5 8.10557053,11.5 Z"
                            fill="currentColor" fill-rule="nonzero"></path>
                        <path
                            d="M9.10557053,14.5 L1,14.5 L1,14 C1,13.4477152 1.44771525,13 2,13 L10.1055705,13 L10.1055705,13.5 C10.1055705,14.0522848 9.65785523,14.5 9.10557053,14.5 Z"
                            fill="currentColor" fill-rule="nonzero"></path>
                        <path
                            d="M18.4098497,11.8374658 L14.3988437,11.8374658 L14.3988437,11.3374658 C14.3988437,10.7851811 14.8465589,10.3374658 15.3988437,10.3374658 L19.4098497,10.3374658 L19.4098497,10.8374658 C19.4098497,11.3897506 18.9621344,11.8374658 18.4098497,11.8374658 Z"
                            fill="currentColor" fill-rule="nonzero"
                            transform="translate(16.904347, 11.087466) rotate(-45.000000) translate(-16.904347, -11.087466) "></path>
                        <path
                            d="M8.10557053,17.5 L-2.56328292e-12,17.5 L-2.56328292e-12,17 C-2.56328292e-12,16.4477152 0.44771525,16 1,16 L9.10557053,16 L9.10557053,16.5 C9.10557053,17.0522847 8.65785523,17.5 8.10557053,17.5 Z"
                            fill="currentColor" fill-rule="nonzero"></path>
                        <circle cx="14" cy="14" r="2" stroke="currentColor" stroke-width="1.5"></circle>
                        <polyline
                            points="18.8855674 5.71874818 20.6450284 4.05909026 22.8855674 6.17253763 20.8855674 8.05909026"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            transform="translate(20.885567, 6.059090) rotate(-360.000000) translate(-20.885567, -6.059090) "></polyline>
                        <polyline
                            points="12.673041 5 12.673041 2.9079495 11.7092258 1.94413429 11.7092258 1.04251661 16 1.04251661 16 1.94413429 15.0747376 2.86939674 15.0747376 5"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"></polyline>
                    </g>
                </g>
            </g>
        </g>
    </svg>
}

export const LocationIcon = () => {
    return <svg height="24" width="18" version="1.1" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg"
                className="perk-icons_icons__1Q2cU" focusable="false" role="img" aria-hidden="true">
        <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <g fill="currentColor" transform="translate(-261.000000, -263.000000)">
                <g transform="translate(170.000000, 263.000000)">
                    <g transform="translate(88.000000, 0.000000)">
                        <path
                            d="M12,20.88 C11.6045164,20.8748297 11.2851704,20.5554836 11.28,20.16 C11.28,18.8544 9.68639999,17.0112 8.51519999,15.6576 L8.15999998,15.2064 C6.60479998,13.3824 4.67519997,11.1168 4.67519997,7.75679998 C4.82626655,3.85095989 8.09273567,0.794264014 12,0.902399954 C15.9220322,0.772736192 19.2121785,3.83553215 19.3632,7.75679998 C19.3632,11.1168 17.4432,13.3824 15.8784,15.2064 L15.4848,15.6576 C14.3136,17.0112 12.72,18.8544 12.72,20.16 C12.7148296,20.5554836 12.3954836,20.8748297 12,20.88 Z M12,2.34239996 C8.87292271,2.21211737 6.22714606,4.63062309 6.07679998,7.75679998 C6.07679998,10.56 7.67039998,12.48 9.21599999,14.2656 L9.60959999,14.7168 C10.5018573,15.6903894 11.3020714,16.7444868 12,17.8656 C12.6979286,16.7444868 13.4981427,15.6903894 14.3904,14.7168 L14.784,14.2656 C16.3296,12.48 17.9232,10.56 17.9232,7.75679998 C17.7728539,4.63062309 15.1270773,2.21211737 12,2.34239996 Z M12,11.28 C10.2768716,11.28 8.87999999,9.88312841 8.87999999,8.15999998 C8.87999999,6.43687156 10.2768716,5.03999997 12,5.03999997 C13.7231284,5.03999997 15.12,6.43687156 15.12,8.15999998 C15.1147291,9.8809404 13.7209404,11.2747291 12,11.28 L12,11.28 Z M12,6.47999998 C11.0721616,6.47999998 10.32,7.2321616 10.32,8.15999998 C10.32,9.08783837 11.0721616,9.83999999 12,9.83999999 C12.9278384,9.83999999 13.68,9.08783837 13.68,8.15999998 C13.6747554,7.23434271 12.9256573,6.48524462 12,6.47999998 L12,6.47999998 Z M20.4,20.16 C20.4,18.8352 18.9888,17.7216 16.56,17.0976 C16.3008177,17.0290358 16.0247724,17.0719757 15.7986636,17.2160289 C15.5725548,17.3600821 15.4169849,17.5921228 15.3696,17.856 L15.2928,18.2976 C17.664,18.7296 18.9504,19.584 18.9504,20.16 C18.9504,21.0432 16.2432,22.32 11.9904,22.32 C7.73759998,22.32 5.03999997,21.0432 5.03999997,20.16 C5.03999997,19.584 6.32639998,18.7296 8.69759999,18.2976 L8.62079999,17.856 C8.57341508,17.5921228 8.41784523,17.3600821 8.19173642,17.2160289 C7.96562761,17.0719757 7.68958227,17.0290358 7.43039998,17.0976 C5.01119997,17.7216 3.59039996,18.8352 3.59039996,20.16 C3.59039996,22.5216 7.81439998,23.76 11.9904,23.76 C16.1664,23.76 20.4,22.5216 20.4,20.16 Z"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>
}

export const HeartIcon =() => {
    return <svg height="21" width="24" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg"
                className="perk-icons_icons__1Q2cU" focusable="false" role="img" aria-hidden="true">
        <path
            d="m12 22.75c-.1501298.0015167-.2969783-.0439364-.42-.13-.32-.21-7.79000004-5.27-10.24000005-9.76-1.46-2.68-1.79-6.46000002.75000001-8.86000003 2.48644548-2.3095024 6.33355456-2.3095024 8.82000004 0l1.09 1 1.08-1c2.4864455-2.3095024 6.3335546-2.3095024 8.82 0 2.5400001 2.41000001 2.21 6.19000003.75 8.87000003-2.45 4.49-9.9 9.55-10.22 9.76-.1269991.0845484-.2775728.126569-.43.12zm-5.50000002-19.00008131c-1.25081355-.00712629-2.45683499.46526193-3.37000002 1.32008128-2.00000001 1.87000001-1.66 4.90000002-.47 7.07000003 2.00000001 3.59 7.73000004 7.82 9.34000004 9 1.6-1.14 7.36-5.36 9.32-8.95 1.28-2.34000001 1.54-5.68000002-1-7.49000003-1.9684927-1.32808967-4.5950573-1.11197993-6.32.52l-.88.84000001 1.45 1.4-.35.36c-.3900374.3877236-1.0199625.3877236-1.41 0l-2.94000001-2.75000001c-.91316502-.85481935-2.11918646-1.32720757-3.37000001-1.32008128z"
            fill="currentColor" fill-rule="evenodd" transform="translate(0 -2)"></path>
    </svg>
}

export const BagIcon = () => {
    return <svg height="24" width="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                className="perk-icons_icons__1Q2cU" focusable="false" role="img" aria-hidden="true">
        <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <g fill="currentColor" transform="translate(-1158.000000, -263.000000)">
                <g transform="translate(1069.000000, 263.000000)">
                    <g transform="translate(88.000000, 0.000000)">
                        <path
                            d="M22,6.24999995 L18.65,6.24999995 C18.18,3.11999996 17.43,0.249999951 15,0.249999951 C12.57,0.249999951 11.82,3.11999996 11.35,6.24999995 L7.99999998,6.24999995 C7.58803792,6.25538579 7.25538579,6.58803791 7.24999996,6.99999998 L7.24999996,9.99999999 L7.74999996,9.99999999 C8.30228473,9.99999999 8.74999996,9.55228474 8.74999996,8.99999999 L8.74999996,7.74999995 L21.25,7.74999995 L21.25,20 C21.25,21.2426407 20.2426407,22.25 19,22.25 L14,22.25 C14.4907828,21.6029657 14.7544057,20.8120971 14.75,20 L14.75,16 C14.7446142,15.588038 14.4119621,15.2553858 14,15.25 L11.29,15.25 C10.96,13.65 10.23,11.25 7.99999998,11.25 C5.76999997,11.25 4.99999997,13.65 4.70999997,15.25 L1.99999996,15.25 C1.58803789,15.2553858 1.25538577,15.588038 1.24999996,16 L1.24999996,20 C1.24999996,22.0710679 2.92893215,23.75 4.99999997,23.75 L19,23.75 C21.0710678,23.75 22.75,22.0710679 22.75,20 L22.75,6.99999998 C22.7446142,6.58803791 22.4119621,6.25538579 22,6.24999995 Z M15,1.74999996 C16,1.74999996 16.62,3.07999996 17.12,6.24999996 L12.88,6.24999996 C13.38,3.07999996 14,1.74999996 15,1.74999996 Z M7.99999998,12.75 C8.59999999,12.75 9.21999999,13.08 9.73999999,15.25 L6.25999998,15.25 C6.77999998,13.08 7.39999998,12.75 7.99999998,12.75 Z M4.99999997,22.25 C3.75735928,22.25 2.74999996,21.2426407 2.74999996,20 L2.74999996,16.75 L13.25,16.75 L13.25,20 C13.25,21.2426407 12.2426407,22.25 11,22.25 L4.99999997,22.25 Z"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>
}

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token){
        return{Authorization: 'Bearer ' + user.token }
    }else {
        return {};
    }
}