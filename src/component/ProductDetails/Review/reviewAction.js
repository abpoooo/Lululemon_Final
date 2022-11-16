import {reviewActionType} from "./reviewHelper";

const reviewAction = (newReview = {}) => {
    return {
        type: reviewActionType.REVIEW_REVIEW,
        payload: newReview
    }
}

const reviewSortAction = (sortIndex) => {
    return {
        type: reviewActionType.REVIEW_SORT,
        payload: sortIndex
    }
}

const reviewFilterAction = (filterObject) => {
    return {
        type: reviewActionType.REVIEW_FILTER,
        payload: filterObject
    }
}

const reviewComment = (comment) => {
    return {
        type: reviewActionType.REVIEW_COMMENT,
        payload: comment
    }
}

export default {
    reviewAction,
    reviewSortAction,
    reviewFilterAction,
    reviewComment,
}

