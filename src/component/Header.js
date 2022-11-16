import '../Scss_styles/header.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import {ContentList} from "./ContentList";
import {ProductList} from "./ProductList";
import {NavBar} from "./NavBar";

// <script src="https://kit.fontawesome.com/605ef96abc.js" crossOrigin="anonymous"></script>

export function Header() {
    return(
        <div>
            <div className="Header">
                <LocationOnIcon/>
                <p>Store Locator</p >
                <AccountCircleIcon/>
                <p>Sign In</p >
                <FavoriteIcon/>
                <p>Wish List</p >
                <CardGiftcardIcon/>
                <p>Gift Cards</p >
                <LanguageIcon/>
                <p>CAN</p >
                <h1><MenuIcon/></h1>
            </div>
            <div className='content'>
                <NavBar/>
            </div>
        </div>



    );
}