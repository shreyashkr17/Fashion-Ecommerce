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
import {actions as variantActions} from '~/store/variant';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import axios from 'axios';

function ProductSix ( props ) {
    const dispatch = useDispatch();
    const router = useRouter();
    const variant = useSelector(state => state.variant.variants);
    const token = useSelector(state => state.auth.token);
    const { product, wishlist } = props;
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState( null );
    const [smPicture, setSmPicture] = useState();
    // const [variant, setVariants] = useState();
    const productSlug = product.productSlug;
    const fetchSmPicture = async() => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/products/get-sm-pictures',{
                productSlug 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // authorization: `Bearer ${token}`
                }
            })

            if(response.status === 200){
                // console.log(response.data)
                setSmPicture(response.data.photoUrls)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchVariants = async () => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/products/get-variant-by-product', {
                productSlug 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                // console.log(response.data)
                // setVariants(response.data.variants)
                dispatch(variantActions.setProductVariants(response.data.variants))
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(productSlug && productSlug !== undefined){
            fetchSmPicture();
        }

        if(productSlug && productSlug !== undefined){
            fetchVariants();
        }
    },[])


    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
        variant && variant.length>0  && variant?.map( item => {
            if ( min > item.price ) min = item.price;
            if ( max < item.price ) max = item.price;
        }, [] );

        if (variant && variant.length > 0 ) {
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
        props.showQuickView( product.productSlug );
    }

    return (
        <div className="product product-list" style={{background:"#f8f7f3"}}>
            <div className="row pr-2">
                <div className="col-lg-3 col-md-3 col-6">
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
                            product.producEmbroidered ?
                                <span className="product-label label-new" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Hand Embroidered</span>
                                : ""
                        }

                        {
                            product.productTop ?
                                <span className="product-label label-top" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Top</span>
                                : ""
                        }

                        {
                            !product.productStock || product.productStock == null ?
                                <span className="product-label label-out" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Out of Stock</span>
                                : ""
                        }

                        <ALink href={ `/product/sticky/${product.slug}` }>
                            {
                                smPicture && smPicture.length > 0 ? (
                                    <>
                                        <LazyLoadImage
                                            alt="product"
                                            src={smPicture[0][0]}
                                            threshold={500}
                                            effect="black and white"
                                            wrapperClassName="product-image"
                                        />
                                        {smPicture.length >= 2 && (
                                            <LazyLoadImage
                                                alt="product"
                                                src={smPicture[0][1]}
                                                threshold={500}
                                                effect="black and white"
                                                wrapperClassName="product-image-hover"
                                            />
                                        )}
                                    </>
                                ) : null
                            }
                        </ALink>
                    </figure>
                </div>
                <div className="col-md-6 order-last">
                    <div className="product-body product-action-inner" style={{background:"#f8f7f3"}}>
                        <div className="product-cat">
                            {
                                product.productCategory && product.productCategory?.map( ( item, index ) => (
                                    <React.Fragment key={ item.slug + '-' + index }>
                                        <ALink href={ { pathname: '/shop/sidebar/list', query: { category: item.slug } } } style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.45rem"}}>
                                            { item.name }
                                        </ALink>
                                        { index < product.productCategory.length - 1 ? ', ' : "" }
                                    </React.Fragment>
                                ) )
                            }
                        </div>

                        <h3 className="product-title">
                            <ALink style={{fontFamily:"'Gotham Black',sans-serif", fontSize:"1.8rem"}} href={ `/product/sticky/${product.productSlug}` }>{ product.productName }</ALink>
                        </h3>

                        <div className="product-content">
                            <p style={{fontFamily:"'Gotham Light',sans-serif", fontSize:"1.3rem"}}>{ product.productshortDesc }</p>
                        </div>

                        {
                            variant && variant.length > 0 ?
                                <div className="product-nav product-nav-dots">
                                    <div className="row no-gutters">
                                        {
                                            variant && variant.length>0 && variant?.map( ( item, index ) => (
                                                <ALink href="#" style={ { backgroundColor: item.color } } key={ index }><span className="sr-only">Color Name</span></ALink>
                                            ) )
                                        }
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                </div>

                <div className="col-md-3 col-6 order-md-last order-lg-last">
                    <div className="product-list-action">
                        {
                            !product.productStock || product.productStock == null ?
                                <div className="product-price">
                                    <span className="out-price">₹ { product && product.productPrice!==undefined && product.productPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                minPrice == maxPrice ?
                                    <div className="product-price">₹ { minPrice && minPrice.toFixed( 2 ) }</div>
                                    :
                                    variant && variant.length == 0 ?
                                        <div className="product-price">
                                            <span className="new-price">₹ {minPrice && minPrice.toFixed( 2 ) }</span>
                                            <span className="old-price">₹ {minPrice && maxPrice.toFixed( 2 ) }</span>
                                        </div>
                                        :
                                        <div className="product-price">${minPrice && minPrice.toFixed( 2 ) }&ndash;${ maxPrice && maxPrice.toFixed( 2 ) }</div>
                        }

                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={ { width: product && product.productReview * 20 + '%' } }></div>
                                <span className="tooltip-text">{ product && product.productReview.toFixed( 2 ) }</span>
                            </div>
                            <span className="ratings-text">( { product && product.productReview } Reviews )</span>
                        </div>

                        <div className="product-action" style={{background:"#f8f7f3"}}>
                            {/* <button className="btn-product btn-quickview" title="Quick View" onClick={ onQuickView }>
                                <span>quick view</span>
                            </button> */}
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>wishlist</span></a>
                            }
                        </div>
                        {
                            product && product.productStock !== null ?
                                variant && variant.length > 0 ?
                                    <ALink href={ `/product/sticky/${product.productSlug}` } className="btn-product btn-cart btn-select">
                                        <span>select options</span>
                                    </ALink>
                                    :
                                    <button className="btn-product btn-cart" onClick={ onCartClick }>
                                        <span>add to cart</span>
                                    </button>
                                : ""
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductSix );
