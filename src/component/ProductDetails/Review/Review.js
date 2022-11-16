import React, {useState} from 'react';
import {ReviewList} from "./ReviewList";
import {ReviewForm} from "./ReviewForm"
import {useDispatch, useSelector} from "react-redux";
import StarRating from "./StarRating";
import WriteReview from "./WriteReview";
import {Rating} from "react-simple-star-rating";
import {ReviewFilter} from "./ReviewFilter";
import UploadImages from "./UploadImages";
import {useEffect} from "react";
import actions from "../../../actions";
import "./Review.scss"
import axios from "axios";


export const Review = () => {
    let reviews = useSelector(state => state.reviewReducer.displayingReview)
    let allReview = useSelector(state => state.reviewReducer.reviewData)
    const getRatingScores = item => {
        return item.rating
    }

    const addScores = (runningTotal, ratings) => {
        return runningTotal + ratings
    }
    let ratingScores = allReview.map(getRatingScores)
    let totalRatingScores = ratingScores.reduce(addScores, 0)

    const rawAverageRating = totalRatingScores / ratingScores.length
    const averageRating = Math.round(rawAverageRating * 10) / 10

    // auto refresh reviews when sort or filter changes
    let sort = useSelector(state => state.reviewSort)
    let filter = useSelector(state => state.reviewFilter)
    let dispatch = useDispatch()

    const cbDispatch = () => {
        dispatch(actions.reviewAction.reviewAction({}))
    }
    useEffect(cbDispatch, [sort, filter])


    const [files, setFiles] = useState()


    const imageGet = async () => {
        const formData = new FormData()
        formData.append("file", files)
        formData.append("title", 'title')
        formData.append("comments", 'comments')
        formData.append("rate", 3)
        formData.append("productId", 'prod123')

        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:3001/review/create',
                data: formData
            })
            console.log(res)
            // handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="allReviews" id="review">

                <div className="reviewHeader">

                    <div className="reviewHeader_title">Reviews</div>

                    <div className="reviewHeader_avgRating">

                        <div className="reviewHeader_avgRating_bar1">
                            <span>{averageRating}</span>
                            <div>
                                <Rating default size={12} fillColor='black' allowHalfIcon='true'
                                        initialValue={averageRating} readonly='true'/>
                            </div>
                        </div>

                        <div className="reviewHeader_avgRating_bar2">
                            Based on {allReview.length} Reviews
                        </div>

                        {/*<StarRating/>*/}

                    </div>

                    <div className="reviewHeader_size">

                        <div className="reviewHeader_size_bar1">
                            <span>Fits true to size</span>
                        </div>
                        <div className="reviewHeader_size_bar2">
                            <span>Smaller</span>
                            <div className="sizeBar">
                                <div className="bar1">
                                    <p>Small</p>
                                </div>
                                <div className="bar2">
                                    <p>A bit small</p>
                                </div>
                                <div className="bar3">
                                    <p>True to size</p>
                                </div>
                                <div className="bar4">
                                    <p>A bit large</p>
                                </div>
                                <div className="bar5">
                                    <p>Large</p>
                                </div>
                            </div>
                            <span>Larger</span>
                        </div>

                    </div>

                    <div className="reviewHeader_writeReview">
                        <WriteReview/>
                    </div>

                </div>

                <div className="reviewContainer">
                    <ReviewFilter/>
                    <ReviewList reviews={reviews} allReview={allReview}/>
                </div>

                {/*<UploadImages/>*/}
                <div>
                    <input type="file" id='upload' onChange={event => {
                        console.log(event.target.files)
                        setFiles(event.target.files[0])
                        // imageGet()
                    }}/>

                    <label htmlFor="upload">
                        upload

                    </label>
                    <button onClick={imageGet}>
                        Submit
                    </button>
                </div>

            </div>
        </>
    )
}
