import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import 'swiper/css';
import SwiperCore, {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
// import './CarouselResponsive.scss'
// import 'swiper/swiper-bundle.min.css'

// import 'swiper/swiper-bundle.css'
// import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination]);
export const ProductMainCarouselResponsive = () => {

    let colorID = useSelector(state => state?.productReducer?.updateColorId)
    let product = useSelector(state => state?.productReducer?.product)
    const displayItem = product?.images.filter(element => element?.colorId === colorID)
    console.log('displayItem', displayItem)
    const imageList = displayItem && displayItem[0]?.mainCarousel?.media?.split(" | ")
    // const ref = useRef(null)
    // let isDown = false;
    // let startX;
    // let scrollLeft;
    // useEffect(() => {
    //     const element = ref.current
    //     // console.log(element)
    //     element.addEventListener('mousedown', (e) => {
    //         isDown = true;
    //         element.classList.add('active');
    //         startX = e.pageX - element.offsetLeft;
    //         scrollLeft = element.scrollLeft;
    //     });
    //     element.addEventListener('mouseleave', () => {
    //         isDown = false;
    //         element.classList.remove('active');
    //     });
    //     element.addEventListener('mouseup', () => {
    //         isDown = false;
    //         element.classList.remove('active');
    //     });
    //     element.addEventListener('mousemove', (e) => {
    //         if (!isDown) return;
    //         e.preventDefault();
    //         const x = e.pageX - element.offsetLeft;
    //         const walk = (x - startX) * 3; //scroll-fast
    //         element.scrollLeft = scrollLeft - walk;
    //     });
    // }, [])

    // let [sliderUrl, setSliderUrl] = useState('')
    // let [imgIndex, setImgIndex] = useState(0)
    // if (product.length !== 0) {
    //     setTimeout(() => {
    //         setSliderUrl(imgIndex[imgIndex])
    //     }, 200);
    // }
    // const slider = document.querySelector(".item2")
    // const [isDown, setIsDown] = useState(false);
    // let startX;
    // let scrollLeft;
    // const cbMouseDown = event => {
    //     if (!isDown) {
    //         event.preventDefault()
    //     }
    //     setIsDown(true)
    //     slider.classList.add('active')
    //     startX = event.pageX - slider.offsetLeft;
    //     scrollLeft = slider.scrollLeft;
    // }
    // const cbMouseLeave = () => {
    //     setIsDown(false)
    //     slider.classList.remove('active');
    // }
    // const cbMouseEnter = () => {
    //     setIsDown(false)
    //     slider.classList.add('active');
    // }
    // const cbMouseUp = () => {
    //     setIsDown(false)
    //     slider.classList.remove('active');
    // }
    // const cbMouseMove = event => {
    //     if (!isDown) {
    //         event.preventDefault()
    //     }
    //     const x = event.pageX - slider.offsetLeft;
    //     const walk = (x - startX) * 3; //scroll-fast
    //     slider.scrollLeft = scrollLeft - walk;
    //     console.log(walk);
    // }
    // console.log('imagelist are', imageList)
    // const ref = useRef(null)
    // let isDown = false;
    // let startX;
    // let scrollLeft;
    // useEffect(() => {
    //     const element = ref.current
    //     // console.log(element)
    //     element.addEventListener('mousedown', (e) => {
    //         isDown = true;
    //         element.classList.add('active');
    //         startX = e.pageX - element.offsetLeft;
    //         scrollLeft = element.scrollLeft;
    //     });
    //     element.addEventListener('mouseleave', () => {
    //         isDown = false;
    //         element.classList.remove('active');
    //     });
    //     element.addEventListener('mouseup', () => {
    //         isDown = false;
    //         element.classList.remove('active');
    //     });
    //     element.addEventListener('mousemove', (e) => {
    //         if (!isDown) return;
    //         e.preventDefault();
    //         const x = e.pageX - element.offsetLeft;
    //         const walk = (x - startX) * 3; //scroll-fast
    //         element.scrollLeft = scrollLeft - walk;
    //     });
    // }, [])
    return (
        <div className='ProductDetail_MainCarousel_Responsive'>
            <div className='ProductDetail_MainCarousel_Responsive_SlideStyles'>


                {/*<Swiper*/}
                {/*    // effect={"coverflow"}*/}
                {/*    // autoplay={{*/}
                {/*    //     delay: 2500,*/}
                {/*    //     disableOnInteraction: false,*/}
                {/*    // }}*/}
                {/*    Pagination={{clickable: true}}*/}
                {/*    slidesPreview={1}*/}
                {/*    className='ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs'*/}
                {/*>*/}
                {/*    {*/}
                {/*        imageList?.map((element, index) => {*/}
                {/*            return (*/}
                {/*                <SwiperSlide key={index} >*/}
                {/*                    <img src={element} height='200px' width='160px'*/}
                {/*                         className='ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs' alt=""/>*/}
                {/*                </SwiperSlide>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}

                {/*< /Swiper>*/}
            </div>
        </div>
    )


}