
import {modalActionType} from "../Helper";

const initialState = {
    addToBagPage: false,
    token: null,
    user: null,
    edit: false
}
const user = JSON.parse(localStorage.getItem("user"))

export const modalReducer = (state = initialState, action) =>{
    switch (action.type) {
        case modalActionType.ADD_TO_BAG_PAGE:
            console.log(`to the addToBag Page`)
            return {...state, addToBagPage: !state.addToBagPage}
        // case modalActionType.LOG_IN:
        //     return {...state, token: action.payload}
        case modalActionType.LOG_IN:
            return {...state, user: action.payload.user}
        case modalActionType.EDIT:
            return {...state, edit: !state.edit}
        default:
            return state
    }
}