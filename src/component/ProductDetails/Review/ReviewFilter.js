import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import "./Review.scss"
import "./ReviewFilter.scss"
import {ReviewFilterBox} from "./ReviewFilterBox";
import actions from "../../../actions";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import * as React from "react";

// todo review的filter不工作问题不出在此文件

export const ReviewFilter = () => {
    let dispatch = useDispatch()
    const [oneStar, setOneStar] = useState(false)
    const [twoStars, setTwoStars] = useState(false)
    const [threeStars, setThreeStars] = useState(false)
    const [fourStars, setFourStars] = useState(false)
    const [fiveStars, setFiveStars] = useState(false)
    const [photo, setPhoto] = useState(false)
    const cbDispatch = () => {
        dispatch(actions.reviewAction.reviewFilterAction({fiveStars, fourStars, threeStars, twoStars, oneStar, photo}))
    }
    useEffect(cbDispatch, [oneStar, twoStars, threeStars, fourStars, fiveStars, photo])

    return (
        <>
            <div className="reviewFilter">
                <div className="reviewFilter_title">Filter Reviews</div>
                <div className="reviewFilter_input">

                <SearchSharpIcon/>
                    <input type="text" placeholder="Search Reviews"/>
                    <label className="border"></label>
                </div>

                <div className="reviewFilterSection">
                    <div className="reviewFilterSection_rating">
                        <div className="filterType">Rating</div>
                        <div className="ratingFilter" onClick={() => setFiveStars(!fiveStars)}><ReviewFilterBox isTrue={fiveStars}/>5 stars</div>
                        <div className="ratingFilter" onClick={() => setFourStars(!fourStars)}><ReviewFilterBox isTrue={fourStars}/>4 stars</div>
                        <div className="ratingFilter" onClick={() => setThreeStars(!threeStars)}><ReviewFilterBox isTrue={threeStars}/>3 stars</div>
                        <div className="ratingFilter" onClick={() => setTwoStars(!twoStars)}><ReviewFilterBox isTrue={twoStars}/>2 stars</div>
                        <div className="ratingFilter" onClick={() => setOneStar(!oneStar)}><ReviewFilterBox isTrue={oneStar}/>1 star</div>
                    </div>
                    <div className="reviewFilterSection_photo">
                        <div className="filterType">Photos</div>
                        <div className="filterPhoto" onClick={() => setPhoto(!photo)}><ReviewFilterBox isTrue={photo}/>Only show posts with images</div>
                    </div>
                </div>
            </div>
        </>
    )
}