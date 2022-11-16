import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import actions from "../actions";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import '../Scss_styles/ContentList.scss'
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useParams} from "react-router";

export const ContentList = () => {
    const dispatch = useDispatch()
    let products = useSelector(state => state?.productReducer?.fetchAllSorting1)
    // console.log('sorting product is:',products)

    let kinds = ["Gender", "Category", "Type", "Activity", "Size", "SizeType", "Colour", "Collection", "Features", "Fabric"]
    const [openDrawer, setOpenDrawer] = useState(false)
    // const totalNum = useSelector(state => state?.productReducer?.fetchAllSorting1).length
    // console.log(totalNum)
    const totalNum = useSelector(state => state?.productReducer?.totalProducts).length
    // console.log('totalNum is ', totalNum)
    const [display, setDisplay] = useState(false)

    const [sort, setSort] = useState('Featured')

    const [indexHere, setIndexHere] = useState(1)

    const cbDropDisplay = () => {
        setDisplay(!display)
    }

    const cbDisplaySort = text => {
        setSort(text)
    }

    const changeIndex = index =>{
        setIndexHere(index)
    }

    const cbDispatchNewImage = index =>{
        dispatch(actions?.productActions?.fetchAllSorting1(index))
    }


    let params = useParams() ///////////////////////////////////////
    let {gender} = params
    // console.log(gender)

    // const url = (gender === 'Women') ? womenBanner :
    //     (gender === 'Men') ? menBanner : ""
    const text = (gender === 'Women') ? "Lean into the feeling." :
        (gender === 'Men') ? 'Easy on. Easy off you go.' : ""




    let filters = useSelector(state => state?.productReducer?. allFilters) ///////////////////////////////

    const arrFilters = filters && Object.entries(filters) //////////////////////////////////////////////

    const [allFilters, setAllFilters] = useState(arrFilters) /////////////////////////////////////////////////

    useEffect(() => { ////////////////////////////////////////////////
        const arrFilters = filters && Object.entries(filters)
        setAllFilters(arrFilters)
    }, [filters])

    let sortIndex = useSelector(state => state?.productReducer?.sortingIndex) //////////////////////////////////////////////

    const totalNum2 = useSelector(state => state?.productReducer?.totalProductNum) ///////////////////////////////////////////


    const updateFilters = filter => { /////////////////////////////////////////////////////////////////////

        const newFilters = arrFilters?.map(element => element[1]?.map(item => {

            if(item?.name) {
                (item.name === filter.name) && (item.isChecked = false)
                return item
            } else {
                (item.alt === filter.alt) && (item.isChecked = false)
                return item
            }
        }))

        const filterObject = Object.fromEntries(arrFilters)

        dispatch(actions.productActions.updateFilter(filterObject))
        dispatch(actions.productActions.fetchProductWithFilter(filterObject, 1, sortIndex))
    }






    return (
        <div>
            <div className='ContentList'>
                <div className='ContentList_HeaderImage'>
                    <img src="https://www.acquia.com/sites/default/files/styles/case_study_stat_hero_desktop/public/media/image/2021-04/lululemon.png?h=854a7be2&itok=V-32xqHs" width='1020px' style={{ transform:'translateX(30px)'}} alt=""/>
                </div>
                <h1>
                    {gender?.concat(`'s`)}What's New
                </h1>
                <div className='ContentList_Header'>
                    Need it fast? <strong>Available Near You</strong> to buy and pick up in store
                </div>
                <div className='ContentList_Menu'>
                    <div className='ContentList_Menu_Select'>
                        <div className='ContentList_Menu_Select_Item'>
                            <p>All Items ({totalNum2})</p>
                        </div>
                        <div className='ContentList_Menu_Select_Available'>
                            <p>Available Near You
                                <ArrowForwardIosIcon className='icon_Arrow' fontSize="20px" scale='70%' style={{paddingTop:'2px', padding:'0 5px', transform:'translateY(10%)'}}/>
                            </p>

                        </div>
                    </div>

                    <div className='ContentList_Menu_Sort'>
                        <div className='ContentList_Menu_Sort_Btn' >
                            <p>Sort by
                                <span onClick={cbDropDisplay}>{sort}  </span>

                                <KeyboardDoubleArrowDownIcon onClick={cbDropDisplay} className='ContentList_Menu_Sort_Btn_Icon' fontSize='20px'/>
                            </p>
                        </div>


                        <div className='ContentList_Menu_Sort_DropDown'>
                            {
                                display &&
                                <ul>
                                    <li onClick={() => {
                                        dispatch(actions.productActions.fetchAllSorting1(1))
                                        dispatch(actions.productActions.updatePageNumber(1))
                                        cbDropDisplay()
                                        cbDisplaySort('Featured')
                                    }
                                    }>  Featured
                                    </li>
                                    <li onClick={() => {
                                        dispatch(actions.productActions.fetchAllSorting1(2))
                                        dispatch(actions.productActions.updatePageNumber(1))
                                        cbDropDisplay()
                                        cbDisplaySort('New Arrivals')
                                    }
                                    }> New Arrivals
                                    </li>
                                    <li onClick={() => {
                                        dispatch(actions.productActions.fetchAllSorting1(3))
                                        dispatch(actions.productActions.updatePageNumber(1))
                                        cbDropDisplay()
                                        cbDisplaySort('Top Rated')
                                    }
                                    }> Top Rated
                                    </li>
                                    <li onClick={() => {
                                        cbDropDisplay()
                                    }}>Price: High to Low
                                    </li>
                                    <li onClick={() => {
                                        cbDropDisplay()
                                    }}>Price: Low to High
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
                <div className='ContentList_SortFilters'>
                    <button className='filter-sort_button'>
                        FILTER & SORT
                    </button>
                </div>

                <div className='ContentList_FiltersBar'>
                    {arrFilters?.map(category => category[1].map((element, index) => {
                        if (element.isChecked === true) {
                            return (
                                <div className='ContentList_FiltersBar_Box' key={index} onClick={() => updateFilters(element)}>
                                    <button className='filter_Button'>{element.name} x</button>
                                </div>
                            )
                        }
                        })
                    )}
                </div>
            </div>

            <div className='ContentList_media' >
                <h1>
                    Women's What's New
                </h1>
                <div className='ContentList_media_Header'>
                    Need it fast? <strong>Available Near You</strong> to buy and pick up in store
                </div>
                <div className= 'ContentList_media_Menu'>
                    <div className='ContentList_media_Menu_Select'>
                        <div className='ContentList_media_Menu_Select_Item'>
                            <p>All Items ({totalNum})</p>
                        </div>
                        <div className='ContentList_media_Menu_Select_Available'>
                            <p>Available Near You
                                <ArrowForwardIosIcon className='icon_Arrow' fontSize="20px" scale='70%' style={{paddingTop:'2px', padding:'0 5px', transform:'translateY(10%)'}}/>
                            </p>
                        </div>
                    </div>
                </div>

                <Drawer
                    open={openDrawer}
                    onClose={()=>setOpenDrawer(false)}
                    PaperProps={{sx:{width:'90%'}}}
                >
                    <List>
                        {
                            kinds.map((ele,index)=>(
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ListItemText>
                                            {ele}
                                        </ListItemText>
                                    </ListItemIcon>
                                </ListItemButton>
                            ))
                        }

                    </List>
                </Drawer>

                <div className='ContentList_media_SortFilters'>
                    <button className='filter-sort_button' onClick={()=>setOpenDrawer(!openDrawer)}>
                        FILTER & SORT
                    </button>
                </div>
            </div>
        </div>





    )
}

