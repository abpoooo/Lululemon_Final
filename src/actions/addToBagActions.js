import {modalActionType} from "../Helper";

const addToBag = () =>{
    return{
        type: modalActionType.ADD_TO_BAG_PAGE,
        payload: {}
    }
}
const Edit = () => {
    return {
        type: modalActionType.EDIT,
        payload: {}
    }
}

export default {
    addToBag,
    Edit,
}
