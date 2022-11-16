import axios from "axios";
import {backendActionType} from "../Helper";

let shipping = JSON.stringify({
    "firstName": "AmBPOEIALXI",
    "lastName": "Yang",
    "email": "yangx10555@gmail.com",
    "Address": "643 main st west",
    "City": "Toronto",
    "Province": "ON",
    "PostalCode": "L4G2O0",
    "PhoneNumber": 2130200000
});
const Shipping = (orders) => async dispatch =>{
    console.log('order information', orders)
    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:3001/shipping',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(orders)
        })
        dispatch({
            type: backendActionType.CREATE_INFO,
            payload: res.data
        })
    }catch (error){
        console.log('place order',error.response.data)
        // console.log('place order', error.response.status)
    }
}


const OrderInfo = filterId => async dispatch => {
    // console.log('order number', orderNumber)
    try{
        let res =await axios({
            method: 'get',
            url: `http://localhost:3001/order`,
            params: {
                filterIndex: filterId
            }
        })
        const {data:{data}} = await res
        console.log(data)
        dispatch({
            type: backendActionType.GET_ORDER,
            payload: data
        })
    }catch (e){
        console.log(e)
    }
}

const TransactionId = (paymentIntent) => async dispatch=> {
    dispatch({
        type: backendActionType.GET_TRANS,
        payload: paymentIntent
    })
}
export default {
    Shipping,
    OrderInfo,
    TransactionId
}