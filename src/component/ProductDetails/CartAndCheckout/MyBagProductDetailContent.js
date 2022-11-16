import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {ProductDetails} from "../ProductDetails";
import checkoutAction from "../../../actions/CheckoutAction";
import actions from "../../../actions";

export const MyBagProductDetailContent = ({product, colorID, size, passClose}) => {
    // console.log(smartFilter)
    // console.log(product?.productId)
    // let productSmartFilter = smartFilter[product?.productId]
    // console.log(productSmartFilter)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const Title = () => {
        return <div className="productDetailContent_title">
            {product?.name}
        </div>
    }

    const Price = () => {
        return <div className="productDetailContent_price">
            <div className="num">{product?.price?.split(" ")[0]}</div>
            <div className="cad"> CAD</div>
        </div>
    }

    const [selectedColor, setSelectedColor] = useState(colorID)


    let cart = JSON.parse(localStorage.getItem('cart'))
    let cartCopy = [...cart]

    const Color = () => {
        return <div className="productDetailContent_color">
            <div className="colorTitle">
                <span>Color</span> {product?.swatches?.filter(({
                                                                   colorId,
                                                                   swatch,
                                                                   swatchAlt
                                                               }) => selectedColor === colorId).map(({
                                                                                                         colorId,
                                                                                                         swatch,
                                                                                                         swatchAlt
                                                                                                     }, index) =>
                <div key={index}>{swatchAlt}</div>)}
            </div>
            <div className="colorBar">
                {product?.swatches?.map(({colorId, swatch, swatchAlt}, index) =>
                    // <div className="colorCell" style={color === colorId ? {border: "solid black 2px"} : {}}>
                    <div className="colorCell"
                         onClick={() => {
                             setSelectedColor(colorId)
                             let selectItem = cartCopy.find(item => item?.productID === product.productId)
                             if (selectItem) {
                                 selectItem.colorID = colorId
                                 let selectedImg = product.images?.find((img) => img.colorId === colorId)
                                 selectItem.src = selectedImg?.mainCarousel?.media?.split(" | ")[0]
                                 selectItem.color = swatchAlt
                             }
                             localStorage.setItem('cart', JSON.stringify(cartCopy))
                         }}
                         style={selectedColor === colorId ? {border: "solid black 2px"} : {}} key={index}>
                        <div className="colorContainer">
                            <img src={swatch} alt={swatchAlt}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    }

    const [selectedSize, setSelectedSize] = useState(size)
    useEffect(() => {
    }, [selectedColor])

    const Size = () => {
        return <div className="productDetailContent_size">
            <div className="title">
                <div className="sizeContainer">
                    <span>
                        Size
                    </span>
                    <div className="sizeContainer_size">{selectedSize}</div>
                </div>
            </div>
            <div className="sizeBar">
                {product?.sizes[0].details.map((size, index) =>
                    <div className="sizeCell" onClick={(event) => {
                        setSelectedSize(size)
                        let selectItem = cartCopy.find(item => item?.productID === product.productId)
                        if (selectItem) {
                            selectItem.size = size
                        }
                        localStorage.setItem('cart', JSON.stringify(cartCopy))

                    }}
                         style={selectedSize === size ? {backgroundColor: "black", color: "white"} : {}}
                         key={index}>{size}</div>)
                }
            </div>
        </div>
    }


    return (
        <>
            <div className="productDetailContent">
                <div className="productDetailContent_image">
                    <ProductDetails product={product} color={selectedColor}/>
                </div>

                <div className="productDetailContent_container">
                    <Title/>
                    <Price/>
                    <ProductDetails product={product} color={colorID}/>
                    <Color/>
                    <Size/>
                    <div className="productDetailContent_container_update">
                        <button className="productDetailContent_container_update_btn"
                                onClick={async (e) => {
                                    passClose(true)
                                    console.log('pass', passClose, e)
                                    await (dispatch(actions?.CheckoutAction?.updateCartItemColorAndSizeAction(product.productId, colorID, size, selectedColor, selectedSize)))
                                    await (dispatch(actions?.CheckoutAction?.autoUpdateCartDetail()))
                                }}
                        >
                            {`UPDATE ITEM`}
                        </button>
                        <div className="productDetailContent_container_update_link">
                             {/*// onClick={() => navigate(`/product/${product.productId}?color=${colorID}`)}>*/}
                            View product details
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}