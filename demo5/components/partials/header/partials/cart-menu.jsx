import { connect } from "react-redux";
import { useState, useEffect } from "react";
import ALink from "~/components/features/alink";

import { actions } from "~/store/cart";
import { cartQtyTotal, cartPriceTotal } from "~/utils/index";


function CartMenu(props) {
  // const { cartlist } = props;
  
  const [windowWidth, setWindowWidth] = useState(0);
  // const [showCartOverlay, setShowCartOverlay] = useState(true);
  const { cartlist,toggleCartOverlay,isFixed } = props;
  // console.log(cartlist)
  // console.log(cartlist)
  useEffect(() => {
      // Set initial window width
      setWindowWidth(window.innerWidth);

      // Update window width on resize
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div className={`dropdown cart-dropdown `} >
      <ALink
        href={windowWidth>720 ?"/shop/cart":""}
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
        style={{ color: "white" }}
      >
        {isFixed ? (<i className="icon-shopping-cart" style={{color:'black'}} onClick={windowWidth<=720 ? toggleCartOverlay: null}></i>):(
          <i className="icon-shopping-cart" style={{color:'white'}} onClick={windowWidth<=720 ? toggleCartOverlay: null}></i>
        )}
        <span className={isFixed ? `cart-count1`:`cart-count`}>{cartQtyTotal(cartlist)}</span>
      </ALink>

      
      {windowWidth >720 &&<div
        className={`dropdown-menu dropdown-menu-right ${
          cartlist.length === 0 ? "text-center" : ""
        }`}
      >
        {cartlist.length === 0 ? (
          <p>No products in the cart.</p>
        ) : (
          <>
            <div className="dropdown-cart-products">
              {cartlist?.map((item, index) => (
                  <div className="product justify-content-between" key={index}>
                    <div className="product-cart-details">
                      <h4 className="product-title">
                        <ALink href={`/product/default/${item.productSlug}`}>
                          {item.productName}
                        </ALink>
                      </h4>

                      <span className="cart-product-info">
                        <span className="cart-product-qty">{item.qty} </span>x ₹{" "}
                        {item.productsalePrice
                          ? item.productsalePrice.toFixed(2)
                          : item.productPrice.toFixed(2)}
                      </span>
                    </div>

                    <figure className="product-image-container ml-2">
                      <ALink
                        href={`/product/default/${item.productSlug}`}
                        className="product-image"
                      >
                        <img src={item.smPics[0].photoUrl[0]} alt="product" />
                      </ALink>
                    </figure>
                    <button
                      className="btn-remove"
                      title="Remove Product"
                      onClick={() => props.removeFromCart(item)}
                    >
                      <i className="icon-close"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="dropdown-cart-total" style={{textAlign:"center"}}>
                <span>Total</span>

                <span className="cart-total-price" style={{textAlign:"center"}}>
                  ₹{" "}
                  {cartPriceTotal(cartlist).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="dropdown-cart-action">
                <ALink href="/shop/cart" className="btn btn-primary">
                 Checkout
                </ALink>
              </div>
            </>
          )}
      </div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartlist: state.cartlist.data,
  };
}

export default connect(mapStateToProps, { ...actions })(CartMenu);
