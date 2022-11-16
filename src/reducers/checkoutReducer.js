import {modalActionType} from "../Helper";

const initState = {
    // order and checkout
    orderList: [],
    totalPrice: 0,
    totalQuantity: 0,


    // payment
    errorMessage: null,
    successMessage: null,
    itemList: [],
    localStorage: [],
    isRemove: false,

    // edit order
    orderItems: [],
    singleOrder: null,
    showUpdatedItem: false,
    cartDetail: [],

    cart1: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], // store cart

}
export const checkoutReducer = (state = initState, action) => {
    switch (action.type) {
        // order and checkout reducers
        case modalActionType.ORDER:
            return {...state, orderList: action.payload}
        // Add order:
        //    judge:
        //    1.  check whether order is already existed?
        // 2. findIndex of productId, color, and size
        // 3. if no, add order, if yes add order quantity
        case modalActionType.ADD_ORDER:
            let addOrderList = [...state.orderList]
            console.log(' add order', action.payload)
            console.log('current order list', addOrderList)
            const addedIndex = addOrderList?.findIndex(order => (
                order?.productId === action?.payload?.productId &&
                order?.colorId === action?.payload?.colorId &&
                order?.size === action?.payload?.size
            ))
            console.log('index', addedIndex)
            if (addedIndex === -1) {
                addOrderList = addOrderList.concat(action?.payload)
            } else {
                addOrderList[addedIndex].quantity += action?.payload.quantity
            }
            return {...state, orderList: addOrderList}


        // remove order
        case modalActionType.REMOVE_ORDER:
            let removedOrderList = [...state.orderList]
            // console.log('before', action.payload)
            // console.log('before 2',removedOrderList)
            const removeIndex = removedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.productId &&
                order?.colorId === action?.payload?.colorId &&
                order?.size === action?.payload?.size
            ))
            // console.log('index?', removeIndex)
            removedOrderList.splice(removeIndex, 1)
            return {...state, orderList: removedOrderList}

        // edit order
        //     case modalActionType.
        case modalActionType.ADD_SINGLE_ORDER:
            // console.log('single order', action?.payload)
            return {...state, singleOrder: action?.payload}

        case modalActionType.SHOW_UPDATE_ITEM:
            // console.log('show update item', action?.payload)
            return {...state, showUpdatedItem: action?.payload}

        case modalActionType.UPDATE_ORDER_ITEMS:
            // console.log('order items', action?.payload)
            return {...state, orderItems: action?.payload}




        // Payment reducers
        case modalActionType.PAYMENT_SUCCESS:
            console.log('success message', action?.payload)
            return {...state, successMessage: action?.payload}
        case modalActionType.PAYMENT_FAILURE:
            console.log('failure message', action?.payload)
            return {...state, errorMessage: action?.payload}


        case modalActionType.UPDATE_ITEM_LIST:
            console.log('item list', action?.payload)
            return {...state, itemList: action?.payload}


        // local storage
        case modalActionType.UPDATE_LOCAL_LOCALSTORAGE:
            return {...state, cart1: action?.payload}


        // update


        case modalActionType.UPDATE_ORDER:
            console.log('update order', action?.payload)
            let combinedOrderList = [...state.cart1]
            // let singleOrder = [...state.singleOrder]
            console.log('order list before', combinedOrderList)
            // console.log('single order', singleOrder)
            // filter out the previous order
            combinedOrderList = combinedOrderList.filter(order => (
                order?.productId !== action?.payload?.singleOrder.productId ||
                order?.colorId !== action?.payload?.singleOrder.colorId ||
                order?.size !== action?.payload?.singleOrder.size
            ))

            console.log('order list after', combinedOrderList)


            // check if any same elements
            const combinedIndex = combinedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.order.productId &&
                order?.colorId === action?.payload?.order.colorId &&
                order?.size === action?.payload?.order.size
            ))

            console.log('combine Index', combinedIndex)


            if (combinedIndex === -1) {
                combinedOrderList = combinedOrderList.concat(action?.payload.order)
            }
            else {
                combinedOrderList = combinedOrderList.map((element, index) => {
                        if (index === combinedIndex) {
                            element.quantity += action?.payload.order.quantity
                            element.totalPrice1 += action?.payload.order.totalPrice1
                            return element
                        } else {
                            return element
                        }
                    }
                )
            }

            console.log('combineOrderList finally', combinedOrderList)
            localStorage.setItem('cart', JSON.stringify(combinedOrderList))
            return {...state, cart1: combinedOrderList}













        default:
            return state
    }
}