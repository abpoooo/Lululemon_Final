import {useState} from "react";
import '../../Scss_styles/FeatureList.scss'

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';




export const FeatureList = ({featurePanels, index}) => {
    const [openState, setOpenState] = useState(true)
    const [show, setShow] = useState(false)

    const expendList = () => {
        setShow(!show)
        setOpenState(!openState)
    }

    return(
        <div className='FeatureMain'>

            <div className='featureTitle' key={index} onClick={() => expendList()}>

                <div className='featureTitleWithImg'>
                <img src={featurePanels?.iconPath} alt=""/>
                <h1>{featurePanels?.title}</h1>
                </div>

                <div className='featurePanelsContent'>
                    {featurePanels.content && (openState ? <AddIcon className='icon'/>:<RemoveIcon className='icon'/>)}
                </div>

            </div>

            {show && <div className='FeatureList'>

                {featurePanels.content?.map((element, index)=>{
                    if (index < 4)
                        return <div className='list' key={index}>{element}</div>
                    }
                )}

            </div>}
        </div>
    )
}