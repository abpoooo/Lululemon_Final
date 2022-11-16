import '../../Scss_styles/VirtualShopping.scss';

export const VirtualShopping = () => {
    return (
        <div className='VirtualShopping'>
            <div className="images">

                <img className='VirtualShopping_Img1'
                     src="https://images.lululemon.com/is/image/lululemon/NA_VirtualPersonalShopper_GEC_Footer?$brand_stmnt$&wid=750&op_usm=0.8,1,10,0&fmt=jpeg&qlt=75,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                     alt=""/>
                <img className='VirtualShopping_Img2'
                     src="https://images.lululemon.com/is/image/lululemon/NA_VirtualPersonalShopper_HowItWorks?$brand_stmnt$&amp;wid=768&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72"
                     alt=""/>
            </div>

            <div className='VirtualShopping_Contents'>
                <h2>(Virtual) personal shopping is here</h2>
                    <p>Whether you’ve got questions about product or you just </p>
                    <p>miss us, our educators are online and ready to chat.</p>
                <button>
                    Book Now
                </button>
            </div>
        </div>
    )
}