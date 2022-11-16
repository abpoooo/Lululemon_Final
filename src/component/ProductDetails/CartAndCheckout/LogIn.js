import {BagIcon, RefundIcon, LocationIcon, HeartIcon, ClockIcon} from "../../../Helper";
import CloseIcon from '@mui/icons-material/Close';
import './Scss/LogIn.scss'
import {NavBar} from "../../NavBar";
import {Footer} from "../../Footer";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export const LogIn = () => {
    const perks = ['Fast Track Refunds', 'Check out faster',
        'Track Orders', 'Wish List', 'Tailored Suggestions']
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [email, setEmail] = useState('')
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
        setIsEmailEntered(true)
        emailValidate(username) ? setIsEmailValid(true) : setIsEmailValid(false)
        console.log('username', e.target.value)
        setLoginInfo(prevState => ({
            ...prevState,
            email: username
        }))
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        setIsPasswordEntered(true)
        setLoginInfo(prevState => ({
            ...prevState,
            password: password
        }))
    };
    //
    // const cbClear1 = () => {
    //     document.getElementById('input1').value = ''
    // }
    // const cbClear2 = () => {
    //     document.getElementById('input2').value = ''
    // }
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(true)
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    // console.log('tokens got?', tokens)
    const cbSuccess =get => {
        if (get!==null) {
            setSuccess(true)
            setFail(false)
            get && navigate('/login')
        }else {

        }
    }
    console.log('fail or not',fail)
    console.log('success or not?',success)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const icons = [<RefundIcon/>, <ClockIcon/>, <LocationIcon/>, <HeartIcon/>, <BagIcon/>]
    // let token = JSON.parse(localStorage.getItem('token'))
    // console.log('token is', token)
    // let tokenReducer = useSelector(state => state?.modalReducer?.token)
    // console.log('token from reducer is', tokenReducer)
    // useEffect(,[])

    ///////////
    const [isEmailEntered, setIsEmailEntered] = useState(false)
    const [isPasswordEntered, setIsPasswordEntered] = useState(false)

    const [isEmailValid, setIsEmailValid] = useState(false)

    function emailValidate(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    return (
        <>
            <NavBar/>
            <div className='login_mainContent'>
                <div className='login_mainContent_Head'>
                    The good stuff awaits
                </div>
                <hr/>

                <div className='login_mainContent_Container'>
                    <div className='login_mainContent_Container_perks'>
                        <div className='title'>
                            <h3 className='FirstTitle'>One account, twice the fun!</h3>

                            {/*<h3 className='title'>*/}
                            {/*Here are some of the perks*/}
                            {/*</h3>*/}
                        </div>
                        <span>Use the same email address for online and in-store!</span>
                        <div className='title'>
                            <h3>Here are some of the perks</h3>
                        </div>
                        <div className='login_mainContent_Container_perks_perksContent'>
                            {perks.map((perks, index) =>
                                <div key={index} className='login_mainContent_Container_perks_perksContent_cell'>
                                    <div className='login_mainContent_Container_perks_perksContent_cell_icons'>
                                        {icons[index]}</div>
                                    <span className='login_mainContent_Container_perks_perksContent_cell_Des'>
                                            {perks}
                                        </span>

                                </div>)}
                        </div>
                    </div>
                    <div className='login_mainContent_Container_loginSession'>
                        <div className='login_mainContent_Container_loginSession_cell'>
                            <div className='login_mainContent_Container_loginSession_cell_shown'>
                                One account, twice the fun!
                                <span className='login_mainContent_Container_loginSession_cell_shown_small'>Use the same email address for online and in store!</span>

                            </div>
                            <div className='title'>
                                <h3>Sign in to your account</h3></div>

                            <div className='login_mainContent_Container_loginSession_cell_user'>
                                <label>Email address</label>
                                <div className='login_mainContent_Container_loginSession_cell_user_container'>
                                    <div className='login_mainContent_Container_loginSession_cell_user_container_input'>
                                        <input type="text" name='username' id='input1' value={username}
                                               onChange={onChangeUsername}/>
                                    </div>
                                    <div className='login_mainContent_Container_loginSession_cell_user_container_btn'>
                                        <CloseIcon className='clsBtn'/>
                                    </div>
                                </div>
                                {isEmailEntered && <>
                                {!isEmailValid && username && <div className='login_mainContent_Container_loginSession_cell_user_Msg'>
                                    <span>Email address is not in the correct format (xxx@yyy.zzz).</span>
                                </div>}
                                {!username && <div className='login_mainContent_Container_loginSession_cell_user_Msg'>
                                    <span>Please enter an email address</span>
                                </div>}
                                </>}

                            </div>
                            <div className='login_mainContent_Container_loginSession_cell_password'>
                                <label>Password</label>
                                <div className='login_mainContent_Container_loginSession_cell_password_container'>
                                    <div
                                        className='login_mainContent_Container_loginSession_cell_password_container_input'>
                                        <input type="text" name='password' value={password}
                                               onChange={onChangePassword}/>
                                    </div>
                                    <div
                                        className='login_mainContent_Container_loginSession_cell_password_container_btn'>
                                        <CloseIcon className='clsBtn'/>
                                    </div>
                                </div>

                                {isPasswordEntered && !password &&<div className='login_mainContent_Container_loginSession_cell_password_Msg'>
                                    <span>Please enter your password</span>
                                </div>}
                            </div>

                            <div className='login_mainContent_Container_loginSession_cell_forgetPassword'>
                                <a href="https://shop.lululemon.com/account/forgot-password">Forget your password?</a>


                            </div>

                            <div className='signBtn' onClick={() => {
                                // JSON.parse(localStorage.getItem('token'))
                                // window.location.href = '/checkout'
                                dispatch(actions?.LogIn?.logIn(loginInfo))
                                cbSuccess(tokens)
                                // useEffect(dispatch(actions?.LogIn?.logIn(loginInfo)),[])
                                // window.location.href='/login'
                                // {tokens !== null && window.location.href='/login'}
                            }}>
                                {tokens !== null ? <div className='signBtn_already' >You Already Signed In, Please Click to checkout</div>:<div>SIGN IN</div>}

                                {/*SIGN IN*/}

                                <hr/>
                            </div>
                            <div className='success'>
                                {success === true ? <div>Thank You for Signing In, <br/><button onClick={() => window.location.href='/checkout'}>Go to checkout</button></div>:null }
                                {tokens === null ? <div className='fail'>Please Enter Correct Email and Password</div>:null}
                            </div>
                            {/*<div className='fail'>*/}
                            {/*    {fail ? null:<div>Pls Enter Correct Email and Password</div> }*/}
                            {/*</div>*/}

                            <div className='signUp'>
                                <h3>Don't have an account yet?</h3>
                                <a href="c61-lulu-ecommerce/lululemon_project/src/component/ProductDetails/CartAndCheckout/LogIn">Create a Lululemon account</a>
                            </div>

                            {/*<div className='success'>*/}
                            {/*    Thank You for Signing In*/}
                            {/*    <button></button>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )


}