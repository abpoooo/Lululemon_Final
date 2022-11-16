import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaymentBackendBtnPaypal from "./PaymentBackendBtnPaypal";

// import "./StripePay.css"
import {useStripe, useElements, PaymentElement,Elements, CardElement} from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';
import {StripePay} from "../StripePay";
// import {CheckoutForm} from "./CheckoutForm"

const stripeAPIKey = 'pk_test_51LwXYfKsWwHv6sipXnRAUm83zZGDf5aL6jW7TbJa2HCUbmlEJweAwy3aFXLlyVIK98OxHyRGF3tekMWdquPE2lOq008KEFI5vi'
const stripeTestPromise = loadStripe(stripeAPIKey)

const getCustomOptions = () => {
    const items = [
        {
            id: 1,
            title: "Pay with PayPal",
            subMenu: "You will be redirected to PayPal to login to your account and return here to complete your order.",
        },
        {
            id: 2,
            title: "Pay with credit card",
            subMenu: "Credit card information",
        },
    ];
    return items
};

function PaymentBackendNestedList() {
    const [open, setOpen] = useState({});

    const items = getCustomOptions();

    //stripe
    // const [clientSecret, setClientSecret] = useState("");
    //
    //
    // useEffect(() => {
    //     fetch("/stripe", {
    //         method: "POST",
    //         body: JSON.stringify({}),
    //     }).then(async (result) => {
    //         let {clientSecret} = await result.json();
    //         setClientSecret(clientSecret);
    //         console.log(clientSecret)
    //         console.log(result)
    //     });
    // }, []);

    const handleClick = (id) => {
        setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <List>
            {items.map((item) => {
                return (
                    <>
                        <ListItemButton onClick={() => handleClick(item.id)}>
                            <ListItemText primary={item.title} />
                            {open[item.id] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton className="pl-4">
                                    <ListItemText primary={item.subMenu} />
                                    <PaymentBackendBtnPaypal/>
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton className="pl-4">
                                    <ListItemText primary={item.subMenu} />
                                    <StripePay/>
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>
                );
            }
            )}
        </List>


    );
}

export default PaymentBackendNestedList;
