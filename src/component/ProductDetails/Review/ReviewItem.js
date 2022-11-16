import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {useDispatch} from "react-redux";
import TimeAgo from "react-timeago";
import {Rating} from "react-simple-star-rating";
import actions from "../../../actions";
import StarRating from "./StarRating";
import {TextareaComponent} from "./TextareaComponent";
import {TextFieldComponent} from "./TextFieldComponent";
import "./ReviewItem.scss"

export function ReviewItem(props) {
    let nameInitial = props.id.charAt(0)
    const [commentIsOpen, setCommentIsOpen] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const [nicknameContent, setNicknameContent] = useState("")
    const [emailContent, setEmailContent] = useState("")
    const [isLiked, setIsLiked] = useState(false)
    let dispatch = useDispatch()
    let current = new Date()

    const cbCommentSubmit = () => {
        setCommentIsOpen(false)
        dispatch(actions.reviewAction.reviewComment(
            {
                commentContent,
                nicknameContent,
                emailContent,
                review: props,
                timeStamp: `${current.toLocaleString('default', {month: 'short'})} 
        ${current.getDate()} 
        ${current.getFullYear()} 
        ${current.getHours()}:
        ${current.getMinutes()}:
        ${current.getSeconds()}`
            }))
    }

    return (
        <>
            <div className="reviewItem">
                <div className="reviewItemContainer">

                    <div className="reviewItemHeader">
                        <Avatar sx={{width: 24, height: 24}} className='initialIcon'>
                            {nameInitial}
                        </Avatar>

                        <div className="userID">
                            {props.id}
                        </div>

                        <div className="timeStamp">
                            <TimeAgo date={props.timeStamp}/>
                        </div>

                    </div>

                    <div className="reviewRating">
                        <Rating default size={12}
                                fillColor='black'
                                allowHalfIcon='true'
                                initialValue={props.rating}
                                readonly='true'/>
                    </div>

                    <div className="reviewTitle">
                        <h3>{props.reviewTitle}</h3>
                    </div>

                    <div className="reviewBody">
                        <p>{props.reviewBody}</p>
                    </div>

                    {props.photoURL !== "" && <div className="reviewImage">
                        {props.photoURL.map((imgLink, index) => <div key={index}>
                            <img src={imgLink}/>
                        </div>)}
                    </div>}
                    <div className="sizeNFitContainer">

                        <div className="sizeNFit">
                            <div className="sizeType">
                                Usual Size:
                            </div>
                            <div className="sizeNumber">
                                {props.usualSize}
                            </div>
                        </div>

                        <div className="sizeNFit">

                            <div className="sizeType">
                                Size Purchased:
                            </div>

                            <div className="sizeNumber">
                                {props.sizePurchased}
                            </div>
                        </div>

                        <div className="sizeNFit">

                            <div className="sizeType">
                                Fits:
                            </div>

                            <div className="sizeNumber">
                                {props.fits}
                            </div>

                        </div>

                    </div>

                    <div className="reviewItemBottom">
                        <div className="likeReview">
                            <div onClick={() => setIsLiked(!isLiked)}>
                                {isLiked ? <svg className="like">
                                    <path d="M4.34,6.92H.58A.59.59,0,0,0,0,7.51v7.85a.58.58,0,0,0,.58.58H4.34Z"></path>
                                    <path
                                        d="M15.91,8.07a2.3,2.3,0,0,0-2.25-2H10.51c.48-1.48.88-3.55,0-4.88A3,3,0,0,0,7.88,0,.58.58,0,0,0,7.3.5,16.33,16.33,0,0,1,5.52,6.92s0,9,0,9h5.61c2.67,0,3.73-1.92,4.36-3.6A8.89,8.89,0,0,0,15.91,8.07Z"></path>
                                </svg> : <svg className="dislike">
                                    <path
                                        d="M13.67,6.94A2,2,0,0,0,11.74,5.2H9C9.45,3.93,9.79,2.15,9,1A2.53,2.53,0,0,0,6.77,0a.51.51,0,0,0-.5.43S5.71,4.22,4,6H.5a.5.5,0,0,0-.5.5V13.2a.5.5,0,0,0,.5.5H9.56c2.3,0,3.21-1.65,3.75-3.09A7.46,7.46,0,0,0,13.67,6.94ZM3.75,12.7H1V7H3.75Zm8.62-2.44C11.72,12,10.91,12.7,9.56,12.7H4.75V6.55A12,12,0,0,0,7.19,1a1.32,1.32,0,0,1,1,.54c.57.84.21,2.59-.33,3.95A.5.5,0,0,0,7.9,6a.51.51,0,0,0,.42.22h3.42a1,1,0,0,1,.94.87A6.5,6.5,0,0,1,12.37,10.26Z"></path>
                                </svg>
                                }
                            </div>

                            <div className="numberLiked">
                                {isLiked ? props.numberLiked + 1 : props.numberLiked}
                            </div>
                        </div>

                        <div className="leaveComment" onClick={() => setCommentIsOpen(true)}>
                            <svg>
                                <path
                                    d="M20.3900001,7.52000003 C20.0813028,7.38925488 19.7276284,7.42189268 19.4480715,7.60692315 C19.1685146,7.79195361 19.0002732,8.10475645 19.0000001,8.44000004 L19.0000001,8.75000001 C20.2426408,8.75000001 21.2500001,9.75735935 21.2500001,11 L21.2500001,20.1900001 L19.4100001,18.3500001 C18.706793,17.6474652 17.7540079,17.2519695 16.7600001,17.25 L12,17.25 C10.7573594,17.25 9.75000004,16.2426408 9.75000004,15.0000001 L9.75000004,14.75 L14.0000001,14.75 C16.0710679,14.75 17.7500001,13.0710679 17.7500001,11 L17.7500001,5.00000002 C17.7500001,2.9289322 16.0710679,1.25000001 14.0000001,1.25000001 L5.00000002,1.25000001 C2.9289322,1.25000001 1.24998291,2.9289322 1.24998291,5.00000002 L1.24998291,18.0000001 C1.24795221,18.3023827 1.43008997,18.5755893 1.71000001,18.6900001 C1.99018003,18.8108202 2.31579193,18.7472862 2.53000001,18.5300001 L5.65000002,15.4100001 C6.07278282,14.9897654 6.64390005,14.7526979 7.24000003,14.75 L8.24000003,14.75 L8.24000003,15.0000001 C8.23999649,15.9962969 8.63645706,16.9516427 9.34188278,17.6551923 C10.0473085,18.3587419 11.0037067,18.7526569 12,18.75 L16.7600001,18.75 C17.3561001,18.7526979 17.9272173,18.9897654 18.3500001,19.4100001 L21.4700001,22.5300001 C21.6842082,22.7472862 22.0098201,22.8108202 22.2900001,22.6900001 C22.5699101,22.5755894 22.7520479,22.3023827 22.7500172,22.0000001 L22.7500172,11 C22.7488254,9.46658928 21.8141804,8.088384 20.3900001,7.52000003 Z M4.59000002,14.3500001 L2.75000001,16.1900001 L2.75000001,5.00000002 C2.75000001,3.75735933 3.75735933,2.75000001 5.00000002,2.75000001 L14.0000001,2.75000001 C15.2426408,2.75000001 16.25,3.75735933 16.25,5.00000002 L16.25,11 C16.25,12.2426407 15.2426408,13.25 14.0000001,13.25 L7.24000003,13.25 C6.24599216,13.2519695 5.29320714,13.6474652 4.59000002,14.3500001 Z"></path>
                            </svg>
                            <span>Leave a comment</span>
                        </div>
                    </div>
                </div>

                {commentIsOpen && <div className="commentBox">

                    <div className="commentBox_close" onClick={() => setCommentIsOpen(false)}><CloseIcon/></div>

                    <div className="commentBox_comment">
                        <span className="title">Comment({commentContent.length}/500)</span>
                        <TextareaComponent content={commentContent} minChar={8} maxChar={500}
                                           setContent={setCommentContent}
                                           errorMsg={"Please enter a range of 8 to 500 characters (Emojis are not supported)"}
                                           placeholder={"Write a comment"}/>
                    </div>

                    <div className="commentBox_personalInfo">

                        <div className="commentBox_personalInfo_nikeName">
                            <span className="commentBox_personalInfo_nickName_title">Nickname*</span>
                            <TextFieldComponent content={nicknameContent} minChar={4} maxChar={30}
                                                setContent={setNicknameContent}
                                                errorMsg={"Please enter a range of 4 to 40 characters"}
                                                placeholder={"Example: Dragonblade97"}/>
                        </div>

                        <div className="commentBox_personalInfo_email">
                            <span className="commentBox_personalInfo_email_title">Email (will not be displayed)*</span>
                            <TextFieldComponent content={emailContent} minChar={11} maxChar={30}
                                                setContent={setEmailContent}
                                                errorMsg={"Please enter a valid email address"}
                                                placeholder={"Example: stevesjob@mail.man"}/>
                        </div>
                    </div>

                    <div className="commentBox_post" onClick ={() =>
                        commentContent.length >= 8 && commentContent.length <= 500 && nicknameContent.length >= 4 && nicknameContent.length <= 30 && emailContent.length >= 11 && emailContent.length <= 30 && (cbCommentSubmit())
                    }>POST COMMENT
                    </div>

                    <div className="commentBox_terms">
                        You may receive emails regarding this submission. Any emails will include the ability to opt-out
                        of future communications. By submitting a review you agree to our
                        <span>Terms & Conditions.</span>
                    </div>
                </div>}

                {props.comments.length !== 0 && <div className="reviewItemComment">
                    {/*{JSON.stringify(props.comments)}*/}
                    {props.comments.map((comment, index) => <div key={index}>
                            {comment.official && <div className="official"> Response from lululemon</div>}
                            <div className="commentBar">
                                {comment.official ?
                                    <svg>
                                        <path
                                            d="m12 0c-6.627417 0-12 5.372583-12 12s5.372583 12 12 12 12-5.372583 12-12-5.372583-12-12-12zm4.69 19.7333333c-1.0484896-.0017666-2.0533339-.4199725-2.7934778-1.1626169s-1.1549585-1.7488934-1.1531889-2.7973831c.0485423-.755246.2349487-1.4952231.55-2.1833333.1888889-.5111111.3777778-1.0188889.5666667-1.5233333.4756908-1.193802.8307914-2.43218723 1.06-3.6966667.1566667-1 .14-2.22666667-.6233333-3-.5833334-.58666667-1.4866667-.70333333-2.2966667-.72333333s-1.7133333.13666666-2.29666667.72666666c-.76333333.77-.78 2-.62333333 3 .22942436 1.2633467.58452194 2.50060497 1.06 3.69333337.1866667.5066666.3755556 1.0144444.5666667 1.5233333.3150513.6881102.5014577 1.4280873.55 2.1833333.0108181 1.8972796-1.33101712 3.5332966-3.19373864 3.8939286s-3.7181943-.6563704-4.41626139-2.4205952c.52880634.4863512 1.23685296.7294912 1.95288859.6706129.71603564-.0588783 1.37485437-.414413 1.81711141-.9806129.5325003-.7201071.69318124-1.6495845.43333333-2.5066667-.25666667-.93-.82-1.6666667-1.27-2.5466667-1.46333333-2.49999997-1.40333333-4.36999997-1.40333333-4.36999997 0-3.73 3.56-4.36333333 6.82333333-4.36333333 3.2633333 0 6.8233333.63333333 6.8233333 4.36333333 0 0 .06 1.87-1.4033333 4.36999997-.45.8633334-1 1.6166667-1.27 2.5466667-.2598479.8570822-.099167 1.7865596.4333333 2.5066667.4422571.5661999 1.1010758.9217346 1.8171114.9806129.7160357.0588783 1.4240823-.1842617 1.9528886-.6706129-.5973841 1.5002888-2.0484858 2.4852951-3.6633333 2.4866666z"></path>
                                    </svg>
                                    :
                                    <Avatar sx={{width: 24, height: 24}} className='initialIcon'>
                                        {comment.nickname.charAt(0)}
                                    </Avatar>}

                                <div className="nickname">
                                    {comment.nickname}
                                </div>

                                <div className="timeStamp">
                                    <TimeAgo date={comment.timeStamp}/>
                                </div>
                            </div>

                            <div className="commentContent">
                                {comment.content}
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        </>
    )
}