import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

import { isInWishlist, isInCompare } from '~/utils';

function ProductFour ( props ) {
    const router = useRouter();
    const ref = useRef( null );
    const { product, wishlist } = props;
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
            min = product.sale_price
                ? product.sale_price
                : product.price;
            max = product.price;
        }

        setMinPrice( min );
        setMaxPrice( max );

        ref.current.addEventListener( 'mouseover', mouseOverHandler, {
            passive: true
        } );
        ref.current.addEventListener( 'mouseleave', mouseLeaveHandler, {
            passive: true
        } );
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

    function mouseOverHandler () {
        let animDiff =
            ref.current.offsetHeight -
            ( ref.current.querySelector( '.product-body' ).offsetHeight +
                ref.current.querySelector( '.product-media' ).offsetHeight );
        let animDistance =
            ref.current.querySelector( '.product-footer' ).offsetHeight -
            animDiff;
        ref.current
            .querySelector( '.product-footer' )
            .setAttribute(
                'style',
                'visibility: visible; transform: translateY(0);'
            );
        ref.current
            .querySelector( '.product-body' )
            .setAttribute(
                'style',
                'transform: translateY(' + -animDistance + 'px)'
            );
    }

    function mouseLeaveHandler () {
        ref.current
            .querySelector( '.product-footer' )
            .setAttribute(
                'style',
                'visibility: hidden; transform: translateY(100%);'
            );
        ref.current
            .querySelector( '.product-body' )
            .setAttribute( 'style', 'transform: translateY(0)' );
    }

    return (
        <div className="product product-3" ref={ ref }>
            <figure className="product-media">
                {
                    product.new ?
                        <span className="product-label label-new">New</span>
                        : ""
                }

                {
                    product.sale_price ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                }

                {
                    product.top ?
                        <span className="product-label label-top">Top</span>
                        : ""
                }

                {
                    !product.stock || product.stock == 0 ?
                        <span className="product-label label-out">Out of Stock</span>
                        : ""
                }

                <ALink href={ `/product/default/${product.slug}` }>
                    <LazyLoadImage
                        alt="product"
                        src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url }
                        threshold={ 500 }
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product.sm_pictures.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 1 ].url }
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>

                {
                    product.stock > 0 ?
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
                        :
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                            }
                            {/* <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a> */}
                        </div>
                }
            </figure>

            <div className="product-body">
                {
                    product.stock && product.stock !== 0 ?
                        <div className="product-action">
                            {
                                product.variants.length > 0 ?
                                    <ALink href={ `/product/default/${product.slug}` } className="btn-product btn-cart btn-select">
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
                <div className="product-cat">
                    {
                        product?.category.map( ( item, index ) => (
                            <React.Fragment key={ item.slug + '-' + index }>
                                <ALink href={ { pathname: '/shop/sidebar/list', query: { category: item.slug } } }>
                                    { item.name }
                                </ALink>
                                { index < product.category.length - 1 ? ', ' : "" }
                            </React.Fragment>
                        ) )
                    }
                </div>

                <h3 className="product-title">
                    <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                </h3>

                {
                    !product.stock || product.stock == 0 ?
                        <div className="product-price">
                            <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
                            :
                            product.variants.length == 0 ?
                                <div className="product-price">
                                    <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
                                    <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                }
            </div>
            <div className="product-footer">
                <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                        <span className="tooltip-text">{ product.ratings.toFixed( 2 ) }</span>
                    </div>
                    <span className="ratings-text">( { product.review } Reviews )</span>
                </div>

                {
                    product.variants.length > 0 ?
                        <div className="product-nav product-nav-dots">
                            <div className="row no-gutters">
                                {
                                    product?.variants.map( ( item, index ) => (
                                        <ALink href="#" style={ { backgroundColor: item.color } } key={ index }><span className="sr-only">Color Name</span></ALink>
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

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductFour );
