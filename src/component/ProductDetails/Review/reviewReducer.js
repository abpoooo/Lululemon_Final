import {ReviewData, reviewActionType, reviewFilter} from "./reviewHelper";

const initialState = {
    reviewData: ReviewData,
    displayingReview: ReviewData,
    reviewSort: 1,
    reviewFilter: reviewFilter
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case reviewActionType.REVIEW_REVIEW:
            let newReviewData = [...state.reviewData]
            let newDisplayingReview = [...state.displayingReview]
            action.payload.userID && (newReviewData = [action.payload, ...state.reviewData])
            !state.reviewFilter.fiveStars &&
            !state.reviewFilter.fourStars &&
            !state.reviewFilter.threeStars &&
            !state.reviewFilter.twoStars &&
            !state.reviewFilter.oneStar &&
            !state.reviewFilter.photo ?

                newDisplayingReview = newReviewData :
                (
                    newDisplayingReview = newReviewData.filter((review) =>
                        (state.reviewFilter.fiveStars === true && review.rating === 5) ||
                        (state.reviewFilter.fourStars === true && review.rating === 4) ||
                        (state.reviewFilter.threeStars === true && review.rating === 3) ||
                        (state.reviewFilter.twoStars === true && review.rating === 2) ||
                        (state.reviewFilter.oneStar === true && review.rating === 1) ||
                        // todo .length不等于0？
                        (state.reviewFilter.photo === true && review.rating.length !== 0)
                    )
                )

            switch (state.reviewSort) {
                case 2:
                    newDisplayingReview = newDisplayingReview.sort
                    ((a, b) => b.numberLiked - a.numberLiked)
                    break;
                case 3:
                    //todo b.rating - a.rating代表着什么
                    newDisplayingReview = newDisplayingReview.sort
                    ((a, b) => b.rating - a.rating)
                    break;
                case 4:
                    newDisplayingReview = newDisplayingReview.sort
                    ((a, b) => b.numberLiked - a.numberLiked)
                    break;
                default:
                    break;
            }

            return {...state, reviewData: newReviewData, displayingReview: newDisplayingReview}

        case reviewActionType.REVIEW_SORT:
            return {...state, reviewSort: action.payload}

        case reviewActionType.REVIEW_FILTER:
            return {...state, reviewFilter: action.payload}

        case reviewActionType.REVIEW_COMMENT:
            let newReviewDataWithComment = [...state.reviewData]
            let reviewIndex = newReviewDataWithComment.findIndex
            (review => review.reviewTitle === action.payload.review.reviewTitle
                && review.userID === action.payload.review.id)

            newReviewDataWithComment[reviewIndex].comments.push({
                content: action.payload.commentContent,
                nickname: action.payload.nicknameContent,
                email: action.payload.emailContent,
                official: false,
                timeStamp: action.payload.timeStamp
            })

            return {...state, reviewData: newReviewDataWithComment}

        default:
            return state
    }
}