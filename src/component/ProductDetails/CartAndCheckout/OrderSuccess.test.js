import {fireEvent, render, screen} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
// import {expect, jest, test} from '@jest/globals';
import {OrderInfo} from "./OrderInfo";
import {Checkout} from "./Checkout";
import {OrderSuccess} from "./OrderSuccess";
// import { sumNum } from 'myReducer';
// import {sumTotal} from ''

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn()),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('test', () => {
    it('button home', () => {
        render(<OrderSuccess/>)
        const btnHome = screen.getAllByText('Home')
        // fireEvent.click(btnHome)
        // screen.getByText('Home')
    })
})