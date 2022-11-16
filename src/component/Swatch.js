import {useState} from "react";
import "../Scss_styles/Swatch.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

export const Swatch = ({product, cbFindColorID}) => {

    let NumOfSwatch = product?.swatches?.length
    // console.log("numbers",NumOfSwatch)
    let NumberPerSlide = 7
    let NumOfBar = Math.ceil(NumOfSwatch / NumberPerSlide)
    const [selectedBar, setSelectedBar] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product.swatches[0].colorId)
    // console.log("select", selectedColor)

    // console.log('swatches',product[0].swatches)

    let swipe = []
    for (let i = 0; i < NumOfBar; i++) {
        swipe.push([])
    }
    // console.log(swipe)

    product.swatches.forEach((Object, index) => {
        swipe[Math.floor(index / 7)].push(Object)
    })

    let swatches = product?.swatches?.swatch !== 0 && product?.swatches
    // console.log("swatches",swatches)
    const cbRight = () => {
        selectedBar < NumOfBar - 1 && setSelectedBar(selectedBar + 1)
    }
    const cbLeft = () => {
        selectedBar !== 0 && setSelectedBar(selectedBar -1)
    }
    // console.log("id", product.swatches.colorId)

    const cbMouseIn = evt => {
        // console.log("mouseEnter",evt.target.id)
        setSelectedColor(evt.target.id)
        cbFindColorID(evt.target.id)
    }
    let t = 0

    return (
        <div className='Swatch_Container'>
            {/*{NumOfBar > 1 && <div className="icon forward" onClick={cbRight} style={selectedBar === NumOfBar - 1 ? {color: "lightgray"} : {color: "black", cursor: "pointer"}}> <ArrowBackIosNewOutlinedIcon/></div>}*/}
            {/*{NumOfBar > 1 && <div className="icon backward" onClick={cbLeft} style={selectedBar === 0 ? {color: "lightgray"} : {color: "black", cursor: "pointer"}}> <ArrowForwardIosOutlinedIcon/></div>}*/}
            {NumOfBar !==0 && <div className="icon forwards" onClick={cbRight}  style={selectedBar  === NumOfBar-1 ?   {color: "lightgray"}:{color: "black", cursor: "pointer"}} ><ArrowForwardIosOutlinedIcon/> </div>}
            {NumOfBar !==0&& <div className="icon backwards" onClick={cbLeft} style={selectedBar === 0 ?  {color: "lightgray"}:{color: "black", cursor: "pointer"}}> <ArrowBackIosNewOutlinedIcon/></div>}
            <div className='SwatchBar' style={{
                overflow:'hidden',
                // border:'yellow 2px solid',
                // margin:'10px',
                display:'flex',
                position: 'relative',
                // width: '265px',
                // margin-top: 5px;
            }}>
                {/*    left and right arrow btn to make swatch change */}


                <div className='swipe' style={{
                    // border:'green 1px solid',
                    display:'flex',
                    position:'relative',
                    // overflow:'hidden',
                    width: `${NumOfBar}00%`,
                    left: `-${selectedBar}00%`
                        }}>
                    {
                        swatches.map((element, index) =>
                            <div className='hoverInBorder' key={index} style={{display: 'inline-block'}}>
                                <div style={{display:'none'}}>
                                    {t = 0}
                                </div>
                                <div className='HoverSwatch'
                                     style={element.colorId === selectedColor ?
                                         {border: `black solid 2px` } : {border: ``}}
                                     // style={{border:'red 2px solid',
                                     //        margin:'6px'}}
                                >
                                  <div className='Swatch_Color'>
                                      <img src={element?.swatch.replaceAll('/', match => ++t >= 7 ? '-' : match)} alt="" id={element.colorId} key={index} width='24px'
                                           height='24px'
                                           style={{
                                               display: "inline-block",
                                               position: "relative",
                                               borderRadius: '50%',
                                               padding: '0 7px',
                                               // margin:'0 7px',
                                               textAlign: 'center',
                                               alignItems: 'center'

                                           }}
                                           onMouseEnter={cbMouseIn}/>
                                  </div>

                                </div>
                            </div>
                        )
                    }

                </div>

            </div>

        </div>

    )
}




