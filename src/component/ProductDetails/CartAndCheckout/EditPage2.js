
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import styled from "styled-components";
// import React from "react";
import {Modal} from "bootstrap";
import {ProductDetailSimple} from "./ProductDetailSimple";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useState} from "react";
import {useSelector} from "react-redux";
// import './EditPage2.scss'



//
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };
// const Styles = styled.div`
//     .my-modal{
//         margin: 2px;
// }`
//
// export function EditPage2(props) {
//     // let subtitle
//     const [aProductDetail, setAProduct] = useState(
//         {
//             productId: props.product?.productId,
//             productName: props.product?.productName,
//             price: props.product?.price,
//             size: props.product?.size,
//             quantity: props.product.quantity,
//             colorId: props.product?.colorId,
//             colorName: props.product?.colorName,
//             totalPrice: props.product?.totalPrice,
//             imageList: props.product?.imageList,
//             images: props.product?.images,
//             swatches: props.product?.swatches,
//             sizeList:props.product?.sizeList,
//         }
//     )
//     console.log("a product detail",aProductDetail)
//     function openModal() {
//         props.setIsOpen(true);
//     }
//
//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         subtitle.style.color = '#f00';
//     }
//
//     function closeModal() {
//         props.setIsOpen(false);
//     }
//     return (
//         <Styles>
//             <Modal dialogClassName="my-modal"
//                    {...props}
//                    size="lg"
//                    animation={false}
//                    aria-labelledby="contained-modal-title-vcenter"
//                    centered
//             >
//                 {/*    <Modal*/}
//                 {/*        isOpen={props.modalIsOpen}*/}
//                 {/*        onAfterOpen={afterOpenModal}*/}
//                 {/*        onRequestClose={closeModal}*/}
//                 {/*        style={customStyles}*/}
//                 {/*        contentLabel="Example Modal"*/}
//                 {/*    >*/}
//                 {/*<Modal.Header closeButton>*/}
//                 {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
//                 {/*        Modal heading*/}
//                 {/*    </Modal.Title>*/}
//                 {/*</Modal.Header>*/}
//                 <Modal.Body>
//                     {/*{props.ordersize}*/}
//                     <div className="ProductDetail">
//                         {/*<Header/>*/}
//                         {/*<ScrollDownHeader product={props.product}/>*/}
//                         <div className="ProductDetail_Main">
//                             <div className="ProductDetail_Main_ContainerStyles">
//                                 {props?.product &&
//                                     <ProductDetailSimple product={props.product} color={props.product.color}
//                                                                className="ProductDetail_Main_Carousel"/>}
//                                 {/*{props?.product && <ProductDetailMainCarouselResponsive product={props.product}*/}
//                                 {/*                                                        className="ProductDetail_Main_Responsive_Carousel"/>}*/}
//                             </div>
//                             <div className="ProductDetail_Main_ContainerStylesRight">
//                                 <div className="ProductDetail_Main_ContainerStylesRightTwo">
//                                     <button onClick={props.onHide}>x</button>
//                                 </div>
//                                 {/*{<ItemRightSimple/>}*/}
//                             </div>
//                             {/*<ProductDetailLike/>*/}
//                         </div>
//                     </div>
//                 </Modal.Body>
//                 {/*<Modal.Footer>*/}
//                 {/*    <Button onClick={props.onHide}>Close</Button>*/}
//                 {/*</Modal.Footer>*/}
//             </Modal>
//         </Styles>
//     );
// }































const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({productId, colorId, size}) {
    console.log('productId is',productId)
    console.log('colorId is', colorId)
    console.log('size is', size)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // let products = useSelector(state => state?.productReducer?.product)
    // let colorID = useSelector(state => state?.productReducer?.updateColorId)
    //
    // const displayItem = products?.images.filter(element => element?.colorId === colorID)
    //
    // const imageList = displayItem && displayItem[0]?.mainCarousel?.media?.split(" | ")
    // let [imgIndex, setImgIndex] = useState(0)
    let products = useSelector(state => state?.productReducer?.allProductList)
    let colorID = useSelector(state => state?.productReducer?.updateColorId)
    console.log('products in edit', products)


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

                </BootstrapDialogTitle>

                <DialogContent style={{}}>
                    <Typography gutterBottom style={{display: 'flex', flexDirection: "row"}}>
                        {/*<div className='Content_Left'>*/}
                        {/*    <div className="Products_details_Main_Single_Product">*/}
                        {/*        <img src={imageList && imageList[imgIndex]} alt=""*/}
                        {/*             width='300px' className="Products_details_Main_Single_Product_Img"*/}
                        {/*        />*/}
                        {/*        <div className="action_icon" style={{display: 'flex', justifyContent: "space-between"}}>*/}
                        {/*            /!*<div className='left' onClick={cbPrev}><ArrowBackIosIcon/></div>*!/*/}
                        {/*            /!*<div className='right' onClick={cbNext}><ArrowForwardIosIcon/></div>*!/*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<ProductDetailSimple/>*/}
                        {/*<button> hit me</button>*/}
                        <div className='edit_Left' >
                            <img src="http://api-lulu.hibitbyte.com/static/images/productImages/prod9200028/43635/prod9200028_43635_img0.jpg" width='500px' alt=""/>
                        </div>

                        <div className='edit_Right' style={{paddingLeft: '30px'}}>
                            <div className='edit_Name'>name</div>
                            <div className='edit_Price'>Price</div>
                            <div className='edit_H2'>color</div>
                            <div className='edit_ColorCarousel'>color carousel</div>
                            <div className='edit_H2'>size</div>
                            <div className='edit_SizeCarousel'>size carousel</div>
                            <div className='edit_Update'>Update Cart</div>
                            <div className='edit_Detail'>View Product detail</div>
                        </div>

                    </Typography>

                </DialogContent>


                {/*<DialogActions>*/}
                {/*    <Button autoFocus onClick={handleClose}>*/}
                {/*        Save changes*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </BootstrapDialog>
        </div>
    );
}



