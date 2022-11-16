import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useNavigate} from "react-router";

export const PaymentSuccessPage = () => {
    let paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'))
    console.log(paymentInfo)
    const navigate = useNavigate()
    return <>
        <div className="paymentInfoContainer">
            <h1>Payment Successful!</h1>
            <CheckCircleIcon/>
            <div className="paymentDetails">
                <div className="paymentDetails_paymentType">
                    <div className="paymentDetails_paymentType_title">Payment type</div>
                    <div className="paymentDetails_paymentType_content">{paymentInfo.payer.payment_method}</div>
                </div>
                <div className="paymentDetails_time">
                    <div className="paymentDetails_time_title">Time</div>
                    <div className="paymentDetails_time_content">{paymentInfo.create_time}</div>
                </div>
                <div className="paymentDetails_email">
                    <div className="paymentDetails_email_title">Email</div>
                    <div className="paymentDetails_email_content">{paymentInfo.payer.payer_info.email}</div>
                </div>
                <div className="paymentDetails_total">
                    <div className="paymentDetails_total_title">Amount paid</div>
                    <div className="paymentDetails_total_content">{paymentInfo.transactions[0].amount.total}</div>
                </div>
                <div className="paymentDetails_id">
                    <div className="paymentDetails_id_title">Transaction id</div>
                    <div className="paymentDetails_id_content">{paymentInfo.id}</div>
                </div>
                <div className='BackToMain'>
                    <button onClick={() => navigate('/')}>Go Back to Main Page</button>
                </div>
            </div>
        </div>
    </>
}