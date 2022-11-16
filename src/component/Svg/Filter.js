import {useSelector} from "react-redux";
import {useState} from "react";
import './filter.scss'
import './Filter_Bar.scss'
// import {FilterClothes} from "./FilterClothes";


export const Filter = () => {

    let filters = useSelector((state) => state?.productReducer?.allFilters)

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
                    {showMore ? <FilterClothes kinds={props.item} index={props.index}/> : <p></p>}
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
                <h2>What's New</h2>
                {dataList}
            </div>
        </div>
    )
}