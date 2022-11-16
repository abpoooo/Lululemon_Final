import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React, {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from "@mui/icons-material/Search";

export const DrawerComponent = ()=>{

    // const item = ['WOMEN','>','MAN' ,'ACCESSORIES', 'COMMUNITY', 'MIRROR', 'SHOE']

    const [openDrawer, setOpenDrawer] = useState(false)
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };


    return(
        <React.Fragment>
            <Drawer
                open={openDrawer}
                // onClose={()=>onclick(setOpenDrawer(false)) }
                PaperProps={{
                        style: {
                            width: 'auto',
                            maxWidth: 'auto',
                            left: 0,
                            right: 0,
                }}}
            >
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <img style={{width: '34px', height: '34px', cursor: 'pointer', margin:'20px'}}
                         src="data:image/png;base64,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"
                         alt=""/>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <ul style={{listStyleType:'none'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <li>WOMEN</li>
                        <KeyboardArrowRightIcon />
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <li>MAN</li>
                        <KeyboardArrowRightIcon />
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <li>ACCESSORIES</li>
                        <KeyboardArrowRightIcon />
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <li>COMMUNITY</li>
                        <KeyboardArrowRightIcon />
                    </div>
                    <li>MIRROR</li>
                    <li>SHOE</li>

                </ul>

            </Drawer>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{
                display:'flex',
                alignItems:'center',
                }}>
                    <img style={{width: '34px', height: '34px', cursor: 'pointer', position:'relative', paddingRight:'110px'}}
                        src="data:image/png;base64,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"
                        alt=""/>
                    <AccountCircleOutlinedIcon sx={{color:'black', pr:'12px'}}/>
                    <LocationOnOutlinedIcon sx={{color:'black', pr:'12px'}}/>
                    <FavoriteBorderOutlinedIcon sx={{color:'black', pr:'12px'}} />
                    <CardGiftcardOutlinedIcon sx={{color:'black', pr:'12px'}} />
                    <ShoppingBagOutlinedIcon sx={{color:'black', pr:'12px'}}/>

                <IconButton sx={{ml:'auto'}} onClick={()=>setOpenDrawer(!openDrawer)}>
                    <MenuIcon/>
                </IconButton>
                </div>

                <div>
                    <div style={{
                        border:'black 1px solid',
                        display:'flex',
                        alignItems:"center",
                        borderRadius:'5px'
                    }}>
                        <SearchIcon sx={{color:'black'}} />
                        <input style={{padding:'10px',border:"none", outline:'none'}} placeholder='Search...' type="text"/>
                     </div>
                </div>

            </div>
        </React.Fragment>
    );
}

