
import {fireEvent, render, screen} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
// import {expect, jest, test} from '@jest/globals';
import {OrderInfo} from "./OrderInfo";

// test
// render
// test('Initial conditions to verify the button', () => {
//     render(<OrderInfo/>)
//
//     const btnNextStep = screen.getByRole('button', {name: 'GO TO NEXT STEP'})
//     // expect(btnNextStep).toBeEnabled()
//     expect(btnNextStep).toHaveStyle({backgroundColor: '#d31334'})
//
// })

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn()),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

it('button test', () => {
    render(<OrderInfo/>)
    const btnGo = screen.getByText('GO TO NEXT STEP')

    }
)













// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => (jest.fn()),
// }));
//
// jest.mock("react-redux",() => {
//     useDispatch: jest.fn()
// })
// describe('test suite', () => {
//
//     // it('does something', () => {
//     //     // ARRANGE
//     //     useSelectorMock.mockReturnValue({/* State goes here */})
//     //
//
//     //     /* RENDER COMPONENT AND ASSERT HERE */
//     // })
//     it('does something', () => {
//         render(<OrderInfo/>)
//         // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
//         const useDispatchMock = jest.spyOn(useDispatch, 'useDispatch')
//         beforeEach(() => {
//             // useSelectorMock.mockClear()
//             useDispatchMock.mockImplementation(() => () => {});
//         })
//         afterEach(() =>{
//             useDispatchMock.mockClear();
//         })
//         // ARRANGE
//         const dummyDispatch = jest.fn()
//         useDispatchMock.mockReturnValue(dummyDispatch)
//         /* SANITY CHECK */
//         expect(dummyDispatch).not.toHaveBeenCalled()
//         /* RENDER COMPONENT AND ASSERT HERE */
//     })
// })
