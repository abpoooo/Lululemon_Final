import CloseIcon from '@mui/icons-material/Close';
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import "./ReviewForm.scss"
import StarRating from "./StarRating";
import {useState} from "react";


export function ReviewForm({handleClose}) {
    const userIdRef = useRef()
    const ratingRef = useRef()
    const reviewTitleRef = useRef()
    const reviewBodyRef = useRef()
    const usualSizeRef = useRef()
    const sizePurchasedRef = useRef()
    let current = new Date()
        const [guidelinesIsOpen, setGuidelinesIsOpen] = useState(false)

    let dispatch = useDispatch()

    const SubmitHandler = (e) => {

        current = new Date()
        e.preventDefault()

        const enteredID = 'New User'
        const enteredRating = StarRating
        const enteredReviewTitle = reviewTitleRef.current.value
        const enteredReviewBody = reviewBodyRef.current.value
        const enteredUsualSize = 'Small'
        const enteredSizePurchased = 'Small'
        const date = `${current.toLocaleString
        ('default', {month: 'short'})} 
        ${current.getDate()} 
        ${current.getFullYear()} 
        ${current.getHours()}:
        ${current.getMinutes()}:
        ${current.getSeconds()}`

        const newReviewData = {
            userID: enteredID,
            rating: parseInt(enteredRating),
            timeStamp: date,
            reviewTitle: enteredReviewTitle,
            reviewBody: enteredReviewBody,
            numberLiked: 0,
            image: "",
            comments: [],
            usualSize: enteredUsualSize,
            sizePurchased: enteredSizePurchased,
            fits: 'True to size'
        }

        dispatch(actions.reviewAction.reviewAction(newReviewData))

        handleClose()
    }
    let product = useSelector(state => state.productReducer?.product)
    let productImage = product.images[0].mainCarousel.media.split("|")[0]

    return (
        // todo WRITE A REVIEW更改样式
        <>
            <div className="reviewWrapper" style={{display: 'flex'}}>
                <div className="reviewImage">
                    <img src={productImage} alt="product image" style={{width: '500px', height: '680px'}}/>
                </div>

                <div className="reviewContent" style={{width: "431px", height: '680px'}}>

                    <div className="close" onClick={handleClose}><CloseIcon/></div>

                    <div className="reviewProductName">
                        Write a review for <br/> {product?.name}
                    </div>

                    <form onSubmit={SubmitHandler} className="reviewForm">

                        <div className="formInput">
                            <label htmlFor="rating">Your overall rating*</label>
                            <StarRating/>
                        </div>

                        {/*<div className="formInput">*/}
                        {/*    <label htmlFor='userID'>Nickname (name displayed)</label>*/}
                        {/*    <input type='text' required id='userID' ref={userIdRef}/>*/}
                        {/*</div>*/}

                        {/*<div className="formInput">*/}
                        {/*    <label htmlFor='rating'>Your overall rating</label>*/}
                        {/*    <input type='number' required id ='rating' ref={ratingRef}/>*/}
                        {/*</div>*/}

                        <div className="formInput">
                            <label htmlFor="reviewTitle">Review Title*</label>
                            <input type='text' required id ='reviewTitle' ref={reviewTitleRef} placeholder={'E.g. "Super comfortable!"'}/>
                        </div>

                        <div className="formInput">
                            <label htmlFor="reviewBody">Review* (25–500 characters)</label>
                            <textarea rows='3' required id ='reviewBody' ref={reviewBodyRef} placeholder={'Tell others about your gear. What did you love about it? How\'s the fit? What could use improvement?'}></textarea>
                        </div>

                        {/*<div className="formInput">*/}
                        {/*    <label htmlFor="usualSize">What is your usual size?</label>*/}
                        {/*    <input type="number" required id ='usualSize' ref={usualSizeRef}/>*/}
                        {/*</div>*/}

                        {/*<div className="formInput">*/}
                        {/*    <label htmlFor="sizePurchased">What size did you purchase?</label>*/}
                        {/*    <input type="number" required id ='sizePurchased' ref={sizePurchasedRef}/>*/}
                        {/*</div>*/}

                         {/*todo 修复弹出*/}
                        <div onClick={() => setGuidelinesIsOpen(true)}>
                            Writing guidelines +
                        </div>

                        <div>
                            <button>NEXT STEP</button>
                        </div>

                        <div>
                            Asterisk (*) indicates mandatory field
                        </div>
                        {guidelinesIsOpen && <div className="commentBox">Keep your review focused on the product
                            Instead of writing about an experience you’ve had, please contact us with any issues you need support with
                            Avoid mentioning competitors or the specific price you paid for the product
                            Don’t include any personally identifiable information, such as your full name or social media handle
                            <div className="commentBox_c" onClick={() => setGuidelinesIsOpen(true)}></div>
                        </div>}


                    </form>
                </div>
            </div>
        </>
    )
}
