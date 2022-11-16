import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import {useState} from "react";
import "./PaymentBackend.scss";

export const PaymentBackendBillingBox = ({isTrue}) => {

    const [isHover, setIsHover] = useState(false)

    return <div className="billingBox"
                onMouseEnter=
                    {() => setIsHover(true)}
                onMouseLeave=
                    {() => setIsHover(false)}
    >

        <div className="checkBillingBox">
            {isTrue ? <CheckBoxSharpIcon/> : <CheckBoxOutlineBlankSharpIcon/>}
        </div>

        <div className="billingHoverCheck">
            {isHover && !isTrue && <CheckBoxSharpIcon/>}
        </div>
    </div>
}