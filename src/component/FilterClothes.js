
import React, {useState} from "react";
import '../Scss_styles/Filter_Bar.scss'
// import {useSelector} from "react-redux";


export const FilterClothes = ({largeCheckedState,largeSetCheckedState, kinds,index, cbUpdateFilter}) => {
// console.log(FilterData.rs.filters.Category)

    const kinds1 = ["Gender", "Category", "Type", "Activity", "Size", "SizeType", "Colour", "Collection", "Features", "Fabric"]
    const curKinds = kinds1[index]

    // const [checkedState, setCheckedState] = useState(FilterData.rs.filters[kinds])
    // const [states, setStates] = useSelector(state => state?.productReducer?.allFilters)

    const handleOnChange = (position, isChecked) => {
        const larges = {...largeCheckedState}
        larges[curKinds][position]['isChecked'] = !isChecked

        largeSetCheckedState(larges)


    // const updatedCheckState = checkedState.map(
    //     ({name, isChecked, swatch, alt}, index) => {
    //
    //         return ({name:name, isChecked: position===index?!isChecked:isChecked,  swatch:swatch, alt:alt})
    //     }
    // )
    //     setCheckedState(updatedCheckState)
    //     // console.log(checkedState)
    }

    const [showMore, setShowMore] = useState(false)

    let showBoxInfo=(largeCheckedState[curKinds]?.map(({name, isChecked, swatch, alt}, index) => {
        return(
            <div key={index}>
                <input className='input_filter'
                type='checkbox'
                id={`custom-checkbox-${index}`}
                name={name}
                value={name}
                checked={isChecked}
                onChange={() => handleOnChange(index, isChecked)}
                />

                <label>{name}</label>
                <img src="swatch" alt=""/>
                <label htmlFor=''>{alt}</label>
            </div>
        )
    }))
    let cutLength
    let buttonDisplay
    if (largeCheckedState.length>5){
        cutLength = 5
        buttonDisplay = true
    }else {
        cutLength = largeCheckedState.length
        // buttonDisplay= true
        buttonDisplay= 'none'
    }
    let showBoxLessInfo = (largeCheckedState[curKinds]?.slice(0, cutLength).map(({name, isChecked, swatch, alt}, index) => {
        return(
            <div key={index}>
                <input className='input_filter'
                       style={{background: 'black'}}
                    type='checkbox'
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={isChecked}
                    onChange={() => handleOnChange(index, isChecked)}
                />

                <label>{name}</label>
                <img src="swatch" alt=""/>
                <label htmlFor=''>{alt}</label>
            </div>
        )
    }))

    let showBtnMessage=(largeCheckedState[curKinds]?.map(({name, isChecked, swatch, alt}, index) => {
        return (
            <div key={index}>
                <button
                    style={{backgroundImage:{swatch}, display:name === "sizeDivider" ? "none": true}}
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    className={isChecked?'btnChecked': 'btnNotChecked'}
                    onClick={() => handleOnChange(index, isChecked)}
                >{name}
                    <img src={swatch} alt=""/>
                </button>
                <label htmlFor=''>{alt}</label>
                <hr style={{display: name === "sizeDivider" ? true: "none"}}/>
            </div>

        )
    }))
    let showBtnLessMessage = (largeCheckedState[curKinds]?.slice(0, cutLength).map(({name, isChecked, swatch, alt}, index) => {
        return(
            <div key={index}>
                <button
                    style={{backgroundImage: {swatch}, display : name === "sizeDivider" ? "none": true}}
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    className={isChecked ? 'btnChecked' : 'btnNotChecked'}
                    onClick={() => handleOnChange(index, isChecked)}
                >{name}
                    <img src={swatch} alt=""/>
                </button>
                <label htmlFor=''>{alt}</label>
                <hr style={{display : name === "sizeDivider" ? true: "none"}}/>
            </div>
        )
    }))
    let showMessage, showLessMessage
    if (index === 4 || index === 6){
        showMessage = showBtnMessage
        showLessMessage = showBtnLessMessage
    }else {
        showMessage = showBoxInfo
        showLessMessage = showBoxLessInfo
    }
return (
    <div>
        <div className="FilterClothesContent">{showMore?showMessage:showLessMessage}</div>
        <button className='button_View' style={{display:buttonDisplay}} onClick={() => setShowMore(!showMore)}>{showMore?"View Less -": "View More +"}</button>
        <hr style={{fontWeight: "lighter",}}/>
    </div>
)
};