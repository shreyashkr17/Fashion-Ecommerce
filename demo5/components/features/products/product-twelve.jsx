import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';
import { useSelector } from 'react-redux';

import { isInWishlist, isInCompare } from '~/utils';
import auth from '~/store/auth';
import axios from 'axios'
import {actions as variantActions} from '~/store/variant'
import { useDispatch } from 'react-redux';
import { IntrospectionFragmentMatcher } from 'apollo-boost';

function ProductTwelve ( props ) {
    const router = useRouter();
    const { product, wishlist } = props;
    const user = useSelector( ( state ) => state.auth.user );
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const variant = useSelector( ( state ) => state.variant.productVariants );
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState( null );
    
    const [smPicture, setSmPicture] = useState();
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
        variant && variant.length>0 && variant?.map( item => {
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

    // console.log(product.productCategory)

    return (
        <div className="product product-2 product-custom" style={{background:"#f8f7f3"}}>
            <figure className="product-media">
            {
                    product.productNew                     ?
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
                    !product.productStock|| product.productStock== 0 ?
                        <span className="product-label label-out" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Out of Stock</span>
                        : ""
                }

                <ALink href={ `/product/sticky/${product.productSlug}` }>
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
                <div className="product-action-vertical">
                    {
                        isInWishlist( wishlist, product ) ?
                            <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                            :
                            <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                    }
                </div>
                
            </figure>
            <div className="product-body" style={{background:"#f8f7f3"}}>
                <div className="product-cat">
                    {/* {
                        product?.productCategory && product?.productCategory.sort((a,b) => a.name.localeCompare(b.name)).map( ( item, index ) => (
                            <React.Fragment key={ item.slug + '-' + index }>
                                <ALink href="" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.45rem"}}>
                                    { item.name === "seasonSpringSummer"?"Spring Summer":item.name==="SetsCoordStyledSets"?"Sets":item.name === "harshitaSemiColon"?"Harshita X Afra":item.name}
                                </ALink>
                                { index < product.productCategory.length - 1 ? ', ' : "" }
                            </React.Fragment>
                        ) )
                    } */}
                    
                </div>
                <h3 className="product-title">
                    <ALink style={{fontFamily:"'Gotham Black',sans-serif", fontSize:"1.8rem"}} href={ `/product/sticky/${product.productSlug}` }>{ product.productName }</ALink>
                </h3>
                <div className="product-cat">
                    {product.productBrands && product.productBrands.map((item, index) => (
                        <React.Fragment key={ item.slug + '-' + index }>
                            <ALink href={ { pathname: '/shop/sidebar/list', query: { category: item.slug } } } style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.45rem"}}>
                                { item.name }
                            </ALink>
                            { index < product.productCategory.length - 1 ? ', ' : "" }
                        </React.Fragment>
                    ))}
                </div>
                <h3 className="product-title">
                    <ALink href={ `/product/sticky/${product.productSlug}` } style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.3rem", textTransform:"uppercase"}}>{ product.productshortDesc }</ALink>
                </h3>
                {
                    !product.productStock || product.productStock == null ?
                        <div className="product-price">
                            <span className="out-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ {product&& product.productPrice!==undefined && product.productPrice.toFixed( 2 ) }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { minPrice?.toFixed( 2 ) }</div>
                            :
                            variant && variant.length > 0 ?
                                <div className="product-price">
                                    <span className="new-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Now ₹ { minPrice?.toFixed( 2 ) }</span>
                                    <span className="old-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Was ₹ { maxPrice?.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price" style={{fontFamily:"'Gotham Medium',sans-serif"}}>${ minPrice.toFixed( 2 ) }&ndash;₹ { maxPrice?.toFixed( 2 ) }</div>
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

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductTwelve );