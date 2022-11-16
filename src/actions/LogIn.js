import {modalActionType} from "../Helper";
import axios from "axios";

// let axios = require('axios');
// let data = JSON.stringify({
//     "email": "mark2win@info.com",
//     "password": "Mark2win"
// });
//
// const config = {
//     method: 'post',
//     url: 'http://api-lulu.hibitbyte.com/auth/login',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: data
// };
let data = JSON.stringify({
    "email": "mark2win@info.com",
    "password": "Mark2win"
})
const logIn = (loginInfo) => async dispatch => {
    console.log('login info', loginInfo)
    await axios({
        method: 'post',
        url: 'http://api-lulu.hibitbyte.com/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(loginInfo)
    })
        .then(res => {
            // console.log(res.data.data.token)
            let tokens = res.data.data.token
            localStorage.setItem('tokens',JSON.stringify(tokens))

            dispatch({
                type: modalActionType.LOG_IN,
                payload: res
            })
        }).catch(error => console.log('there is an error', error))


    // let axios = require('axios');
    // let data = JSON.stringify({
    //     "email": "mark2win@info.com",
    //     "password": "Mark2win"
    // });
    //
    // const config = {
    //     method: 'post',
    //     url: 'http://api-lulu.hibitbyte.com/auth/login',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: data,
    //
    // };
    // axios(config)
    //     .then(res => {
    //         let token1 = res.data.token
    //         console.log(JSON.stringify(res.data));
    //         let data1 = res.data
    //         // let token = JSON.stringify((res.data))
    //         // localStorage.setItem('token', JSON.stringify(data))
    //         console.log('token1 is ', token1)
    //         if (res.data.token){
    //             localStorage.setItem("user", JSON.stringify(res.data))
    //         }
    //         // return res.data
    //         dispatch({
    //             type: modalActionType.LOG_IN,
    //             payload: {user: data}
    //         })
    //
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}
const logout = () => {
    localStorage.removeItem("user");
};


export default {
    logIn,
    logout
}

// const LogIn = () => async dispatch => {

//     let res = await axios({
//         method: 'post',
//         url: 'http://api-lulu.hibitbyte.com/auth/login',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: JSON.stringify({
//             "email": "mark2win@info.com",
//             "password": "Mark2win"
//         })
//     }).then(function (response) {
//         console.log(JSON.stringify(response.data));
//         let token = JSON.stringify((response.data));}
//     )
//
//         console.log('res ?? ', res)
//         let tokens = JSON.stringify((data))
//         localStorage.setItem('token', token)
//
//         dispatch({
//             type: modalActionType.LOG_IN,
//             payload: token
//         })
//     }.catch(error)
//     console.log('there is an error', error)
//
// }

