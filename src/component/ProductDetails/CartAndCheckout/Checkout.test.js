// import {fireEvent, render, screen} from "@testing-library/react";
// import {useDispatch, useSelector} from "react-redux";
// // import {expect, jest, test} from '@jest/globals';
// import {OrderInfo} from "./OrderInfo";
// import {Checkout} from "./Checkout";
//
//
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => (jest.fn()),
// }));
//
// const mockDispatch = jest.fn();
// jest.mock('react-redux', () => ({
//     useSelector: jest.fn(),
//     useDispatch: () => mockDispatch
// }));
//
// it('btn check for checkout.js', () => {
//     render(<Checkout/>)
//     const btnCheckout = screen.getByRole('button', {name: 'CHECKOUT'})
//     expect(btnCheckout).toHaveStyle({backgroundColor:'rgb(211, 19, 52)'})
// })