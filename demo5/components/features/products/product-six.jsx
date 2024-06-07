import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

import { isInWishlist, isInCompare } from '~/utils';

function ProductSix ( props ) {
    const router = useRouter();
    const { product, wishlist } = props;
    // console.log(product)
    // console.log(product)
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState( null );

    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
        product?.variants.map( item => {
            if ( min > item.price ) min = item.price;
            if ( max < item.price ) max = item.price;
        }, [] );

        if ( product.variants.length == 0 ) {
            min = product.productsalePrice
                ? product.productsalePrice
                : product.productPrice;
            max = product.productPrice;
        }

        setMinPrice( min );
        setMaxPrice( max );
    }, [] )

    function onCartClick ( e ) {
        e.preventDefault();
        props.addToCart( product );
    }

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, product ) ) {
            props.addToWishlist( product );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function onCompareClick ( e ) {
        e.preventDefault();
        if ( !isInCompare( props.comparelist, product ) ) {
            props.addToCompare( product );
        }
    }

    function onQuickView ( e ) {
        e.preventDefault();
        props.showQuickView( product.slug );
    }

    return (
        <div className="product product-5 text-center" style={{background:"#f8f7f3"}}>
            <figure className="product-media">
                {
                    product.productNew ?
                        <span className="product-label label-new" style={{fontFamily:"'Gotham Medium',sans-serif"}}>New</span>
                        : ""
                }

                {
                    product.productsalePrice ?
                        <span className="product-label label-sale" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Sale</span>
                        : ""
                }

                {
                    product.productTop ?
                        <span className="product-label label-top" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Top</span>
                        : ""
                }

                {
                    !product.productStock || product.productStock == 0 ?
                        <span className="product-label label-out" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Out of Stock</span>
                        : ""
                }

                <ALink href={ `/product/sticky/${product.productSlug}` }>
                    <LazyLoadImage
                        alt="product"
                        src={ product.smPics[0].photoUrl[0] }
                        threshold={ 500 }
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product.smPics.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ product.smPics[0].photoUrl[1] }
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>

                {
                    product.productStock > 0 ?
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>
                            }
                            {/* <a href="" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a>
                            <a href="" className="btn-product-icon btn-compare" onClick={ onCompareClick }><span>compare</span></a> */}
                        </div>
                        :
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>
                            }
                            {/* <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a>
                            <a href="#" className="btn-product-icon btn-compare" onClick={ onCompareClick }><span>compare</span></a> */}
                        </div>
                }

                {
                    product.productStock && product.productStock !== 0 ?
                        <div className="product-action">
                            {
                                product.variants.length > 0 ?
                                    <ALink href={ `/product/sticky/${product.productSlug}` } className="btn-product btn-cart btn-select">
                                        <span>select options</span>
                                    </ALink>
                                    :
                                    <button className="btn-product btn-cart" onClick={ onCartClick }>
                                        <span>add to cart</span>
                                    </button>
                            }
                        </div>
                        : ""
                }

            </figure>

            <div className="product-body" style={{background:"#f8f7f3"}}>
                <h3 className="product-title">
                    <ALink href={ `/product/sticky/${product.productSlug}` }>{ product.productName }</ALink>
                </h3>

                {
                    !product.productStock || product.productStock == 0 ?
                        <div className="product-price">
                            <span className="out-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { product.productPrice.toFixed( 2 ) }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { minPrice.toFixed( 2 ) }</div>
                            :
                            product.variants.length == 0 ?
                                <div className="product-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>
                                    <span className="new-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { minPrice.toFixed( 2 ) }</span>
                                    <span className="old-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { minPrice.toFixed( 2 ) }&ndash;₹ { maxPrice.toFixed( 2 ) }</div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductSix );
