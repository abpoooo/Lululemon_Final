import {useEffect, useState} from "react"
import '../Scss_styles/productComponent.scss'
import {Swatch} from "./Swatch";
import {LazyLoading, saveRecentViewed, saveReview} from "../Helper";
import {Link} from "react-router-dom";
import actions from "../actions";
import {useDispatch} from "react-redux";

export const ProductComponent = ({product, index, productList}) => {
    // console.log('test',product.swatches[0].swatch)
    const dispatch = useDispatch()
    const [colorID, setColorID] = useState(product?.swatches[0].colorId)
    const [imageFront1, setImageFront1] = useState(product?.images[colorID]?.whyWeMadeThis[0])
    const [imageBack1, setImageBack1] = useState(product?.images[colorID]?.whyWeMadeThis[1])
    // const [activeColorId, setActiveColorID] = useState(product?.swatches[0].colorId)
    useEffect(() => {
            LazyLoading()
            // setImageFront1( product?.images[0]?.whyWeMadeThis[0])
            // setImageBack1(product?.images[0]?.whyWeMadeThis[1])
        }
        , [product]
    )

    useEffect(() => {
        setImageFront1(product?.images[0]?.mainCarousel?.media.split('|')[0])
        setImageBack1(product?.images[0]?.mainCarousel?.media.split('|')[1])
    },[product])

    const [colorCarousel, setColorCarousel] = useState(0)
    // console.log(colorID)
    const cbFindColorID = colorId => {
        const colorIndex = product?.images.findIndex(Object => Object.colorId === colorId)
        !isNaN(colorIndex) && setColorID(colorIndex)
        // console.log(colorId)
        cbChangeImg(colorId)
        setColorID(colorId)
        // console.log(colorID)
    }
    // console.log(colorID)


    const cbChangeImg = idColor => {
        const image = product?.images.filter(element => element.colorId === idColor)

        setImageFront1(image[0]?.whyWeMadeThis[0])
        setImageBack1(image[0]?.whyWeMadeThis[1])
    }

    //
    // let imageFront = product?.images[colorID]?.whyWeMadeThis[0]
    // let imageBack = product?.images[colorID]?.whyWeMadeThis[1]
    const [isHover, setIsHover] = useState(true)

    const cbEnter = () => {
        setIsHover(false)
        // imgSure = setIsHover ? imageBack : null
    }
    const cbLeave = () => {
        setIsHover(true)
    }

    // const [imgIn, setImgIn] = useState({
    //     one: product.one,
    //     two: product.two
    // })




    return (

        <div className='Products'>
            <div className='Product_Show'>
                <div className='Product_Show_Img'>
                    <div className='Swatch' onMouseEnter={cbEnter} onMouseLeave={cbLeave}>
                        <Link onClick={() => {
                            dispatch(actions?.productActions?.fetchEachProduct(product?.productId))
                            dispatch(actions?.productActions?.updateColor(colorID))
                            saveRecentViewed(product)
                        }} to={`/product/productInfo/&${product?.name}&${product?.productId}&${colorID}&${product.size}`}>
                            {product.images &&
                                <img src={isHover ? imageFront1 : imageBack1 ? imageBack1 : imageFront1}  width='311px'
                                     alt={product.name}/>}
                            {/*{product.images && <img src={imgSure2}   alt='' className={isHover ? "hover" : "hide"}/>}*/}
                        </Link>
                    </div>
                </div>

                <Swatch product={product} cbFindColorID={cbFindColorID}/>

                {/*{*/}
                {/*    // product.map((element, index) => <Swatch product={element} key={index} />)*/}
                {/*}*/}
                <div className='Product_details' style={{
                    paddingTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '311px',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    marginBottom: 'auto'
                }}>
                    <p className='name' style={{
                        width: '70%',
                        textAlign: 'left',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '1.05rem',
                        lineHeight: '1.26',
                        marginBottom: 'auto'
                    }}>
                        {product.name}
                    </p>
                    <p className='price'
                       style={{lineHeight: '1.26', fontWeight: '400', fontSize: '1rem', textAlign: 'right'}}>
                        {product.price}
                    </p>
                </div>
            </div>
        </div>

    )
}

