import {Header} from "./Header";
import {Filter} from "./Filter";
import {NavBar} from "./NavBar";
import {Content} from "./Content";
import {Footer} from "./Footer";
import "../Scss_styles/Home.scss"

export const Home = () => {
    return(
        <div className='Home'>
            <NavBar/>
            <div className='Home_Main'>
                <Filter/>
                <Content/>
            </div>
            <Footer/>
        </div>
    )
}