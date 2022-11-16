import {ProductList} from "./ProductList";
import {ContentList} from "./ContentList";
import '../Scss_styles/Content.scss'
import {Filter} from "./Filter";

export const Content = () => {
    return (
        <div className='main_Content'>
            <div className='content'>
                <ContentList/>
                <ProductList/>
            </div>
            <div className='content_media'>
                <ContentList/>
                <ProductList/>
            </div>
        </div>

    )
}