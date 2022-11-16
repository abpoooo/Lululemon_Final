
import React, {useEffect} from "react";
import '../Scss_styles/Footer_media.scss'

import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {NestedFooter} from "./NestedFooter";
import {useState} from "react";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";


export const Footer = () => {

    // const useWindowSize = () => {
    //     const [windowSize, setWindowSize] = useState({
    //         width: undefined,
    //         height: undefined,
    //     });
    //
    //     useEffect(() => {
    //         const handleResize = () =>
    //             setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    //
    //         window.addEventListener('resize', handleResize);
    //
    //         handleResize();
    //
    //         return () => {
    //             window.removeEventListener('resize', handleResize);
    //         };
    //     }, []);
    //
    //     return windowSize;
    // };



    const [display, setDisplay] = useState(false)

    const [sort, setSort] = useState('')

    const [display2, setDisplay2] = useState(false)

    const cbDisplay = () => {
        setDisplay(!display)
    }

    const cbDisplayText = text => {
        setSort(text)
    }

    const List1 = ['MY ACCOUNT', ['Sign In', 'Register', 'Order Status', 'Returns']]
    const List2 = ['HELP',['COVID-19 FAQ','Services','Ordering','Shipping Policy','Returns','Sizing','Our Products']]
    const List3 = ['ABOUT US',['Our Business','Media','Investors','Strategic Sales','Affiliates and Creators','Sweat Collective','Team Canada']]
    const List4 = ['CONTACT US',['Live Chat','1.877.263.9300','Email Sign Up']]
    const List5 = ['CAREERS', 'COMMUNITY','SUSTAINABILITY','SOCIAL IMPACT','DIVERSITY AND INCLUSION','LULULEMON APPS','GIFT CARDS','STORE LOCATOR']
    const List6 = ['Privacy Policy (Last Updated: 9/10/20)','UK Modern Slavery Act','California Transparency Act','Accessibility Statement' ]
    // const List7 = ['Privacy Policy (Last Updated: 9/10/20)',' Terms of Use','© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7']
    // let {width, height} = useWindowSize()


    return (
        // (width > 1000) ?
            //desk
        <div className='Box'>
            <div className='Container'>
                <div className='Row'>
                    <div className='Column'>
                        <div className='Container_Btn'>
                        <p className='Heading'>MY ACCOUNT</p>
                            <div className='Container_Btn_Media'>

                            <li className='FooterLink'>Sign In</li>
                        <li className='FooterLink'>Register</li>
                        <li className='FooterLink'>Order Status</li>
                        <li className='FooterLink'>Returns</li>
                            </div>
                        </div>
                    </div>

                    <div className='Column'>
                        <div className='Container_Btn'>
                        <p className='Heading'>HELP</p>
                            <div className='Container_Btn_Media'>

                            <li className='FooterLink'>COVID-19 FAQ</li>
                        <li className='FooterLink'>Services</li>
                        <li className='FooterLink'>Ordering</li>
                        <li className='FooterLink'>Shipping Policy</li>
                        <li className='FooterLink'>Returns</li>
                        <li className='FooterLink'>Sizing</li>
                        <li className='FooterLink'>Our Products</li>
                            </div>
                        </div>
                    </div>

                    <div className='Column'>
                        <div className='Container_Btn'>
                        <p className='Heading'>ABOUT US</p>
                            <div className='Container_Btn_Media'>

                            <li className='FooterLink'>Our Business</li>
                        <li className='FooterLink'>Media</li>
                        <li className='FooterLink'>Investors</li>
                        <li className='FooterLink'>Strategic Sales</li>
                        <li className='FooterLink'>Affiliates and Creators</li>
                        <li className='FooterLink'>Sweat Collective</li>
                        <li className='FooterLink'>Team Canada</li>
                            </div>
                        </div>
                    </div>

                    <div className='Column'>
                        <div className='Container_Btn'>
                        <p className='Heading'>CONTACT US</p>
                            <div className='Container_Btn_Media'>

                            <li className='FooterLink'>Live Chat</li>
                        <li className='FooterLink'>1.877.263.9300</li>
                        <li className='FooterLink'>Email Sign Up</li>
                            </div>
                        </div>
                    </div>

                    <div className='Column2'>
                        <p className='Heading'>CAREERS</p>
                        <p className='Heading'>COMMUNITY</p>
                        <p className='Heading'>SUSTAINABILITY</p>
                        <p className='Heading'>SOCIAL IMPACT</p>
                        <p className='Heading'>DIVERSITY AND INCLUSION</p>
                        <p className='Heading'>LULULEMON APPS</p>
                    </div>

                    <div className='Column2'>
                        <p className='Heading'>GIFT CARDS</p>
                        <p className='Heading'>STORE LOCATOR</p>
                        <li className='FooterLink'>Privacy policy(Last Updated: 9/10/20)</li>
                        <li className='FooterLink'>UK Modern Slavery Act</li>
                        <li className='FooterLink'>California Transparency Act</li>
                        <li className='FooterLink'>Accessibility Statement</li>
                    </div>

                    <div className='Column3'>
                        <TwitterIcon className='icon' />
                        <PinterestIcon className='icon' />
                        <YouTubeIcon className='icon' />
                        <FacebookIcon className='icon' />
                        <InstagramIcon className='icon' />
                    </div>
                </div>
            </div>
            <hr/>

            {/*//mobile*/}
                <div className='media'>
                    <div className='media_test'>
                        <NestedFooter list={List1}/>
                        <NestedFooter list={List2}/>
                        <NestedFooter list={List3}/>
                        <NestedFooter list={List4}/>
                    </div>
                    <div className='List56'>
                        {List5.map((items,index) =>
                            <ListItemButton key={index}>
                                <ListItemText primary={items}/>
                            </ListItemButton>
                        )}
                        {List6.map((items, index) =>
                        <ListItemButton key={index}>
                            <ListItemText primary={items}/>
                        </ListItemButton>
                        )}
                    </div>
                    <div className='Mobil_Icon'>
                        <div className='icon_M'>
                            <div> <TwitterIcon/> </div>
                            <div> <PinterestIcon/> </div>
                            <div> <YouTubeIcon/> </div>
                            <div> <FacebookIcon/> </div>
                            <div> <InstagramIcon/> </div>
                        </div>
                    </div>

                </div>
        </div>

            //mobile
            // <div className='media'>
            //     <div className='media_test'>
            //         <NestedFooter list={List1}/>
            //         <NestedFooter list={List2}/>
            //         <NestedFooter list={List3}/>
            //         <NestedFooter list={List4}/>
            //     </div>
            // </div>
    )
}