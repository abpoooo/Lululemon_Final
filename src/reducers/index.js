
import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {modalReducer} from "./modalReducer";
import {checkoutReducer} from './checkoutReducer'
// import reviewAction from "../component/ProductDetails/Review/reviewAction";
import {reviewReducer} from "../component/ProductDetails/Review/reviewReducer";
import {toBackendReducer} from "./toBackendreducer";
export default combineReducers(
    {
        productReducer,
        modalReducer,
        checkoutReducer,
        reviewReducer,
        toBackendReducer
    }
)