import {backendActionType} from "../Helper";


const initialState = {
    shippingInfo : [],
    orderInfo: [],
    transactionId: null
}

export const toBackendReducer = (state = initialState, action) => {
    switch (action.type) {
        case backendActionType.CREATE_INFO:
            return {...state, shippingInfo: action.payload}
        case backendActionType.GET_ORDER:
            return {...state, orderInfo: action.payload}
        case backendActionType.GET_TRANS:
            return {...state, transactionId: action.payload}
        default:
            return state
    }
}