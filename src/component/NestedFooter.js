import {useState} from "react";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

export const NestedFooter = ({list}) => {
    const [display, setDisplay] = useState(false)

    const [sort, setSort] = useState('')

    const [display2, setDisplay2] = useState(false)

    const cbDisplay = () => {
        setDisplay(!display)
    }

    const cbDisplayText = text => {
        setSort(text)
    }
    let [title, items] = list

    return(
        <div>
            <div onClick={cbDisplay}>
                <span>
                    <ListItemText primary={title}/>
                    {display? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                </span>

                {items.map((element, index)=> {
                    // <Collapse>
                    //
                    // </Collapse>
                    return(
                        <div key={index}>
                            {display && <ListItemText primary={element}/>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}