import React, {useState, useEffect} from 'react'

import { actions } from '~/store/cart';
import { connect } from 'react-redux';
import ALink from '~/components/features/alink';
import { cartQtyTotal, cartPriceTotal } from '~/utils/index';

const openAnimation = {
    transform: 'translateX(0)',
    transition: 'transform 0.5s ease-in-out',
};
  
const closeAnimation = {
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in',
};

function CartOverlay(props) {
    // console.log(props.cartlist)
    const {cartlist,toggleCartOverlay,showCartOverlay} = props
    const [isOpen, setIsOpen] = useState(false); // Add state for animation
    const [animationStyle, setAnimationStyle] = useState(closeAnimation);

    useEffect(() => {
        if (showCartOverlay) {
          setAnimationStyle(openAnimation);
          setIsOpen(true);
        } else {
          setAnimationStyle(closeAnimation);
          setTimeout(() => {
            setIsOpen(false);
          }, 300); // Adjust the delay as needed
        }
    }, [showCartOverlay, openAnimation, closeAnimation]);

    const handleClose = () => {
        toggleCartOverlay();
      };
  return (
    <div className={`CartOverlayCont`} style={animationStyle} >
        <div className="headerCartOv">
            <p>Your Cart</p>
            <i className="icon-close" onClick={handleClose}></i>
        </div>
        {cartlist.length === 0 ? "":"Product"}
        <div className="productContainerOverlay">
            {cartlist.length === 0 ? 
                <div className="innerOverlayCont">
                    <p>No products in the cart.</p>
                </div>:
                <div className="dropdown-cart-products-overlay">
                    {cartlist?.map((item, index) => (
                        <div className="product-overlay justify-content-between" key={ index }>
                            <div className="productCartDetails">
                                <p className="productTitle">
                                    <ALink href={ `/product/sticky/${item.productSlug}` }>{ item.productName }</ALink>
                                </p>
                                <span className="cart-product-info">
                                    <span className="cart-product-qty">{ item.qty } </span>
                                    x ₹ { item.productsalePrice ? item.productsalePrice.toFixed( 2 ) : item.productPrice.toFixed( 2 ) }
                                </span>
                            </div>
                            <figure className="product-image-container-overlay ml-2">
                                <ALink href={ `/product/sticky/${item.productSlug}` } className="product-image">
                                    <img src={item.smPics[0].photoUrl[0] } alt="product" />
                                </ALink>
                            </figure>
                            <button className="btn-remove" title="Remove Product" onClick={ () => props.removeFromCart( item ) }><i className="icon-close"></i></button>
                        </div>
                    ))}
                </div>
            }
        </div>
        <div className="dropdown-cart-total" style={{marginTop:"auto"}}>
            <span>Total</span>
            <span className="cart-total-price">₹ { cartPriceTotal( cartlist ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
        </div>
        <div className="dropdown-cart-action" style={{marginTop:"auto"}}>
            <ALink href="/shop/cart" className="btn btn-primary">View Cart</ALink>
        </div>
    </div>
  )
}

function mapStateToProps(state){
    return {
        cartlist: state.cartlist.data
    }
}
export default connect( mapStateToProps, { ...actions } )( CartOverlay );
// export default CartOverlay
