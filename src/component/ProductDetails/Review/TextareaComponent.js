import CloseIcon from "@mui/icons-material/Close";
import "./TextareaComponent.scss"

export const TextareaComponent = ({content, minChar, maxChar, setContent, errorMsg, placeholder}) => {

    let isError = (content.length <= minChar || content.length >= maxChar)
    return <>
    <div className="textarea">
        <textarea placeholder={placeholder} onChange={(e) => setContent(e.target.value)}
                  style = {isError && content.length > 0 ? {border: "1px rgb(210, 32, 48) solid"} : {}}></textarea>
        <span className="wordCount">
            <span className="count" style={isError ? {color: "rgb(210, 32, 48)"} : {}}>{content.length}</span>
            {maxChar}
            </span>
        {isError && content.length > 0 && <div className="errorIcon"><CloseIcon/></div>}
    </div>
        {isError && content.length > 0 &&
        <span className="error">{errorMsg}</span>
        }
    </>
}