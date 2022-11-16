import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import '../Scss_styles/filter.scss'
import '../Scss_styles/Filter_Bar.scss'
import {FilterClothes} from "./FilterClothes";
import filterData from "./FilterData";
import {useParams} from "react-router";
import actions from "../actions";


export const Filter = () => {

    let params = useParams()
    let {gender} = params

    let filters = useSelector(state => state?.productReducer?.allFilters)
    let sortIndex = useSelector(state => state?.productReducer?.sortingIndex)

    const [largeCheckedState, largeSetCheckedState] = useState(filterData.rs.filters)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.productActions.updateFilter(largeCheckedState))
        dispatch(actions.productActions.fetchProductWithFilter(largeCheckedState, 1, sortIndex))
    }, [largeCheckedState])

    const updateObject = updateFilter => {
        const array = Object.entries(filters)
        const updateArray = array.map(element =>
            (element[1].length === updateFilter.length && element[1][0].name === updateFilter[0].name) ? [element[0], updateFilter] : element
        )
        return Object.fromEntries(updateArray)
    }

    const cbUpdateFilter = chilefilter => {
        const updateFilters = updateObject(chilefilter)
    }

    let kinds = ["Gender", "Category", "Type", "Activity", "Size", "SizeType", "Colour", "Collection", "Features", "Fabric"]

    let dataClassNumber = -1

    const CustomItem = (props) => {
        const [showMore, setShowMore] = useState(true)

        return (
            <div className={`FilterClothes_${props.dataClassNumber}`}>
                <div className='Bar'>
                    <h2>{props.item}</h2>
                    <button onClick={() => setShowMore(!showMore)}>{showMore ? "-" : "+"}</button>
                </div>
                <div>
                    {showMore ?
                        <FilterClothes largeCheckedState={largeCheckedState} largeSetCheckedState={largeSetCheckedState}
                                       kinds={props.item} index={props.index} cbUpdateFilter={cbUpdateFilter}/> : <p></p>}
                </div>
            </div>
        );
    }
    let dataList = kinds.map((item, index) => {
        dataClassNumber++
        return (
            <CustomItem item={item} key={index} index={index} dataClassNumber={dataClassNumber}/>
        )
    })

    return (
        <div className='Filter'>
            <div className='Filter_Shows_In_Left'>
                <h2>{gender?.concat(`'s`)}What's New</h2>
                {dataList}
            </div>
        </div>
    )
}