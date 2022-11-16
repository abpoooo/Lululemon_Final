import {ReviewItem} from "./ReviewItem";
import "./Review.scss"
// import Select from "react-select";
import {reviewSortBy} from "./reviewHelper";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {slide as Menu} from 'react-burger-menu'
import Modal from "@mui/material/Modal";
import {ReviewFilter} from "./ReviewFilter";
// import actions from "../../actions";
import NestedList from "./NestedList";


export const ReviewList = function (props) {
    const dispatch = useDispatch()
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <div className="reviewList">
                <div className="reviewListHeaderContainer">
                    <div className="reviewListHeader_mobile">
                        <div onClick={() => handleOpen()}>Filter</div>
                        {open &&
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">

                                <Menu width='85%' isOpen={true} onOpen={handleOpen} onClose={handleClose}
                                      disableCloseOnEsc>
                                    <ReviewFilter/>
                                </Menu>

                            </Modal>}
                    </div>
                    <div className="reviewListHeader">
                        <div className="reviewNumber">Showing {props.reviews.length} of {props.allReview.length} results
                        </div>

                        <div className="sortDropDown">

                            {/*<div className="label">*/}
                            {/*    <label htmlFor="sort">Sort by:</label>*/}
                            {/*</div>*/}

                            {/* todo 原版select */}
                            {/*<div className="select">*/}
                            {/*    <Select*/}
                            {/*        style={{*/}
                            {/*            control: (base, state) => ({*/}
                            {/*                ...base,*/}
                            {/*            })*/}
                            {/*        }}*/}
                            {/*        options={reviewSortBy}*/}
                            {/*        defaultValue= {reviewSortBy[0]}*/}
                            {/*        menuPortalTarget={document.body}*/}
                            {/*        onChange={value => {*/}
                            {/*            value.value === 2 && dispatch(actions.reviewAction.reviewSortAction(2))*/}
                            {/*            value.value === 3 && dispatch(actions.reviewAction.reviewSortAction(3))*/}
                            {/*            value.value === 4 && dispatch(actions.reviewAction.reviewSortAction(4))*/}
                            {/*        }*/}
                            {/*        }/>*/}
                            {/*</div>*/}
                            {/* todo 原版select */}

                                <NestedList/>

                        </div>
                    </div>
                </div>

                {props.reviews.map((review, index) => <ReviewItem
                    key={index}
                    id={review.userID}
                    rating={review.rating}
                    reviewTitle={review.reviewTitle}
                    reviewBody={review.reviewBody}
                    photoURL={review.image}
                    numberLiked={review.numberLiked}
                    usualSize={review.usualSize}
                    sizePurchased={review.sizePurchased}
                    fits={review.fits}
                    timeStamp={review.timeStamp}
                    comments={review.comments}/>
                )}

            </div>

        </>
    )
}
