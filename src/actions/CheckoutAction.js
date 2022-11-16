import {modalActionType, token} from "../Helper";
import axios from "axios";
import {store} from "../store";



const orderList = orderList => dispatch => {
    const orders = JSON.parse(localStorage.getItem('cart'))
    console.log('orders,', orders)
    dispatch({
        type: modalActionType.ORDER,
        payload: orderList
    })
}

// add order

const addOrder = order => ({
    type: modalActionType.ADD_ORDER,
    payload: order
})

// remove order
const removeOrder = order => ({
    type: modalActionType.REMOVE_ORDER,
    payload: order
})

// // update order ---> edit function
// const updateOrder = order => ({
//     type: modalActionType.UPDATE_ORDER,
//     payload: order
// })

// update total quantity
const updateOrderQuantity = order => ({
    type: modalActionType.UPDATE_ORDER_QUANTITY,
    payload: order
})

// update totalPrice in orderLists
const updatePrice = order => ({
    type: modalActionType.UPDATE_PRICE,
    payload: order
})

// update each quantity of orderList
const updateEachQuantity = order => ({
    type: modalActionType.UPDATE_EACH_QUANTITY,
    payload: order
})

const updateItemList = itemList => ({
    type: modalActionType.UPDATE_ITEM_LIST,
    payload: itemList
})


const updateLocalStorageState = updateStorage => {
    return {
        type: modalActionType.UPDATE_LOCAL_LOCALSTORAGE,
        payload: updateStorage
    }
}

// show update item
const showUpdatedItem = isShow => ({
    type: modalActionType.SHOW_UPDATE_ITEM,
    payload: isShow
})


const updateOrderItems = orderItems => ({
    type: modalActionType.UPDATE_ORDER_ITEMS,
    payload: orderItems
})

const addSingleOrder = singleOrder => ({
    type: modalActionType.ADD_SINGLE_ORDER,
    payload: singleOrder
})


const updateOrder = combineOrders => ({
    type: modalActionType.UPDATE_ORDER,
    payload: combineOrders
})

const autoUpdateCartDetail = () => {
    return{
        type: modalActionType.AUTO_UPDATE_CART_DETAIL
    }
}

const updateCartItemColorAndSizeAction = (productId, oldColor, oldSize, newColor, newSize) => {
    return{
        type: modalActionType.UPDATE_CART_ITEM_COLOR_AND_SIZE,
        payload: {productId, oldColor, oldSize, newColor, newSize}
    }
}




let data = JSON.stringify({
    "taxRate": 1.13,
    "isActive": true,
    "isDelete": false,
    "orderItems": [
        {
            "quantity": 1,
            "productId": "prod9820681",
            "colorId": "47824",
            "size": "12"
        },
        {
            "quantity": 2,
            "productId": "prod11020892",
            "colorId": "0001",
            "size": "XS"
        }
    ]
});
const PaymentSuccess = () => async dispatch => {
    // const state = {...store.getState()}
    // const {checkoutReducer : {orderList}} =state
    const orderList1 = localStorage.getItem('cart')
    const orderList = JSON.parse(orderList1)
    console.log('orderList', orderList1)
    console.log(orderList)
    const orderItems = orderList.map(order => ({
        quantity: order.quantity,
        productId: order.productId,
        colorId: order.colorId,
        size: order.size
    }))

    let data1 = {
        "taxRate": 1.13,
        "isActive": true,
        "isDelete": false,
        "orderItems": orderItems,
    };
    const jsonData = JSON.stringify(data1)
    let token = localStorage.getItem('tokens') !== null && localStorage.getItem('tokens')
    const token2 = JSON.parse(token)
    console.log('token', token2)
    try{
        let res = await axios({
            method: 'post',
            url: `http://api-lulu.hibitbyte.com/order`,
            headers: {
                'authorization' : `bear ${token2}`,
                'Content-Type': 'application/json'
            },
            data: jsonData
        })
        dispatch({
            type: modalActionType.PAYMENT_SUCCESS,
            payload: res.status
        })
        console.log(res)
        localStorage.setItem('cart', JSON.stringify([]))
        localStorage.setItem('bagItem', JSON.stringify([]))
        localStorage.setItem('cartNum', JSON.stringify(null))

    } catch (error){
        console.log('place order',error.response.data.message)
        console.log('place order', error.response.status)
        dispatch({
            type: modalActionType.PAYMENT_FAILURE,
            payload: error.response.status
        })
    }
}


export default {
    orderList,
    PaymentSuccess,
    updateItemList,
    removeOrder,
    updateLocalStorageState,
    showUpdatedItem,
    addSingleOrder,
    updateOrderItems,
    updateCartItemColorAndSizeAction,
    autoUpdateCartDetail,
    updateOrder

}