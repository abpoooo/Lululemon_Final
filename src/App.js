import './App.css';
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "./actions";
import {ProductList} from "./component/ProductList";

import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {Footer} from "./component/Footer";
import {Header} from "./component/Header";
import {Filter} from "./component/Filter";
import {Content} from "./component/Content";
import {NavBar} from "./component/NavBar";
import {Home} from "./component/Home";
import {PageNotFound} from "./component/PageNotFound";
import {ProductDetails} from "./component/ProductDetails/ProductDetails";
import {ProductPage} from "./component/ProductDetails/ProductPage";
import {AddToBag} from "./component/ProductDetails/CartAndCheckout/AddToBag";
import {Checkout} from "./component/ProductDetails/CartAndCheckout/Checkout";
import {LogIn} from "./component/ProductDetails/CartAndCheckout/LogIn";
import {Payment} from "@mui/icons-material";
import {PaymentSuccessPage} from "./component/ProductDetails/CartAndCheckout/PaymentSuccessPage";
import {OrderInfo} from "./component/ProductDetails/CartAndCheckout/OrderInfo";
import { PaymentBackend} from "./component/ProductDetails/CartAndCheckout/PaymentBackend/PaymentBackend";
import {StripePay} from "./component/ProductDetails/CartAndCheckout/StripePay";
import {BackendSuccess} from "./component/ProductDetails/CartAndCheckout/BackendSuccess";
import {OrderSuccess} from "./component/ProductDetails/CartAndCheckout/OrderSuccess";
import {OrderHistory} from "./component/ProductDetails/CartAndCheckout/OrderHistory";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log("dispatch")
        dispatch(actions.productActions.fetchAllFilters())
        dispatch(actions.productActions.fetchAllSorting1(1))
        dispatch(actions?.productActions?.fetchALlProducts())
    }, [])
    // const useQuery = () => {
    //     const { search } = useLocation();
    //
    //     return useMemo(() => new URLSearchParams(search), [search]);
    // }
    //
    // let modal = useSelector(state => state.modalReducer)
    // let query = useQuery()
    // let dispatch = useDispatch()
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='*' element={<PageNotFound/>}> </Route>
                    <Route path='/product/productInfo/:productInformation' element={<ProductPage/>}> </Route>
                    <Route path='/product/:productId' element={<ProductDetails/>}> </Route>
                    <Route path='/checkout' element={<Checkout/>}> </Route>
                    <Route path='/LogIn' element={<LogIn/>}> </Route>
                    <Route path='/payment' element={<Payment/>}> </Route>
                    <Route path={'/paymentSuccess'} element={<PaymentSuccessPage/>}> </Route>
                    <Route path='/Shipping' element={<OrderInfo/>}></Route>
                    <Route path='/Billing' element={<PaymentBackend/>}></Route>
                    <Route path='/stripe' element={<PaymentBackend/>}></Route>
                    <Route path='/succeed' element={<OrderSuccess/>}></Route>
                    <Route path='/history' element={<OrderHistory/>}></Route>
                </Routes>
            </BrowserRouter>
            {/*{modal.addToBagPage && <AddToBag color={query.get("color")} size={query.get("size")}/>}*/}
        </div>
    )
}

export default App;
