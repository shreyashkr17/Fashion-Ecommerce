import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, useSelector, useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';
import {actions as variantActions} from '~/store/variant';
import {actions as productsmpicActions} from '~/store/productsmpics';
import { isInWishlist, isInCompare } from '~/utils';
import axios from 'axios';

function ProductEleven ( props ) {
    const dispatch = useDispatch();
    const bRed = useSelector((state)=> state.auth.billingAddress);
    const sRed = useSelector((state)=> state.auth.shippingAddress);
    const router = useRouter();
    const { product, wishlist } = props;
    const products = product.products;
    const variant = product.variantsData;
    const smPicture = product.smPics;
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState( null );
    const productSlug = products.productSlug;



    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
        variant && variant.length>0 && variant?.map( item => {
            if ( min > item.price ) min = item.price;
            if ( max < item.price ) max = item.price;
        }, [] );

        if (variant && variant.length > 0 ) {
            min = products.productsalePrice
                ? products.productsalePrice
                : products.productPrice;
            max = products.productPrice;
        }

        setMinPrice( min );
        setMaxPrice( max );
    }, [] )

    function onCartClick ( e ) {
        e.preventDefault();
        props.addToCart( products );
    }

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, products ) ) {
            props.addToWishlist( products );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function onCompareClick ( e ) {
        e.preventDefault();
        if ( !isInCompare( props.comparelist, products ) ) {
            props.addToCompare( products );
        }
    }

    function onQuickView ( e ) {
        e.preventDefault();
        props.showQuickView( products.productSlug );
    }

    // console.log(product)

    return (
        <div className="product product-7 text-center w-100">
            <figure className="product-media">
                {
                    products.productNew ?
                        <span className="product-label label-new" style={{fontFamily:"'Gotham Medium',sans-serif"}}>New</span>
                        : ""
                }

                {
                    products.productsalePrice ?
                        <span className="product-label label-sale" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Sale</span>
                        : ""
                }
                {
                    
                    <span className="product-label label-new" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Hand Embroidered</span>
                        
                }

                {
                    products.productTop ?
                        <span className="product-label label-top" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Top</span>
                        : ""
                }

                {
                    !products.productStock || products.productStock == null ?
                        <span className="product-label label-out" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Out of Stock</span>
                        : ""
                }

                <ALink href={ `/product/sticky/${products.productSlug}` }>
                    {
                        smPicture && smPicture.length > 0 ? (
                        <>
                            <LazyLoadImage
                                alt="product"
                                src={smPicture[0].photoUrl[0]}
                                threshold={500}
                                effect="black and white"
                                wrapperClassName="product-image"
                            />
                            {smPicture.length >= 2 && (
                                <LazyLoadImage
                                    alt="product"
                                    src={smPicture[0].photoUrl[1]}
                                    threshold={500}
                                    effect="black and white"
                                    wrapperClassName="product-image-hover"
                                />
                            )}
                        </>
                        ) : null
                    }
                </ALink>

                {
                    products && products.productStock > 0 ?
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, products ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                            }
                            {/* <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a> */}
                            {/* <a href="#" className="btn-product-icon btn-compare" onClick={ onCompareClick }><span>compare</span></a> */}
                        </div>
                        :
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, products ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                            }
                            {/* <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a> */}
                        </div>
                }

                {
                    products.productStock && products.productStock >0 ?
                        <div className="product-action">
                            {
                                variant && variant.length > 0 ?
                                    <ALink href={ `/product/sticky/${products.productSlug}` } className="btn-product btn-cart btn-select">
                                        <span>select options</span>
                                    </ALink>
                                    :
                                    (sRed && bRed? <button className="btn-product btn-cart" onClick={ onCartClick }>
                                        <span>add to cart</span>
                                    </button>:<ALink href={ `/shop/dashboard` } className="btn-product btn-cart btn-select">
                                        update address
                                    </ALink>)
                            }
                        </div>
                        : ""
                }

            </figure>

            <div className="product-body" style={{background:"#f8f7f3"}}>
                {/* <div className="product-cat">
                    {
                        products && products.productCategory.length>0 ? products?.productCategory.sort((a,b) => a.name.localeCompare(b.name)).map( ( item, index ) => (
                            <React.Fragment key={ item.slug + '-' + index }>
                                <ALink href="">
                                    { item.name === "seasonSpringSummer"?"Spring Summer":item.name==="SetsCoordStyledSets"?"Sets":item.name === "harshitaSemiColon"?"Harshita X Afra":item.name==="CoordSets"?"Co-ord Sets":item.name==="DateNight Outfits"?"Date-Night Outfits":item.name}
                                </ALink>
                                { index < products.productCategory.length>0 && products.productCategory.length - 1 ? ', ' : "" }
                            </React.Fragment>
                        ) ):null
                    }
                </div> */}

                <h3 className="product-title">
                    <ALink href={ `/product/sticky/${products.productSlug}`}>{ products.productName }</ALink>
                </h3>

                {
                    !products.productStock || products.productStock == 0 ?
                        <div className="product-price">
                            <span className="out-price">₹ { products && products.productPrice>0 ?products.productPrice.toFixed( 2 ):0 }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price">₹ { minPrice && minPrice.toFixed( 2 ) }</div>
                            :
                            variant && variant.length > 0 ?
                                <div className="product-price">
                                    <span className="new-price">₹ { minPrice && minPrice.toFixed( 2 ) }</span>
                                    <span className="old-price">₹ { maxPrice && maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">₹ { minPrice && minPrice.toFixed( 2 ) }&ndash;₹ {maxPrice && maxPrice.toFixed( 2 ) }</div>
                }

                {/* <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={ { width: products && products.productReview * 20 + '%' } }></div>
                        <span className="tooltip-text">{ products && products.productReview.toFixed( 2 ) }</span>
                    </div>
                    <span className="ratings-text">( { products.productReview } Reviews )</span>
                </div> */}

                {
                    variant && variant.length > 0 ?
                        <div className="product-nav product-nav-dots">
                            <div className="row no-gutters">
                                {
                                    variant && variant.length>0 && variant?.map( ( item, index ) => (
                                        <ALink href="#" style={ { backgroundColor: item.variants.color } } key={ index }><span className="sr-only">Color Name</span></ALink>
                                    ) )
                                }
                            </div>
                        </div>
                        : ""
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

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductEleven );