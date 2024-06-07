import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { useSelector  } from 'react-redux';
// import { useDispatch } from 'react-redux';
import {actions as productsmpicsAction} from '~/store/productsmpics';
import axios from 'axios';

function Wishlist ( props ) {
    // console.log( 'Wishlist', props );
    const [smPicture, setSmPicture] = useState();

    const user = useSelector((state) => state.auth.user);
    const [ wishItems, setWishItems ] = useState([]);
    const variant = useSelector((state) => state.variant.productVariants);
    const bRed = useSelector((state)=> state.auth.billingAddress);
    const sRed = useSelector((state)=> state.auth.shippingAddress);
    // console.log("var",variant);
    const dispatch = useDispatch();
    // https://njs.iretiensemble.com/products/get-sm-pictures

    const data = {
        productId : variant.productId
    }

//    useEffect(()=>{
    const fetchSmPicture = async(product,e) => {
       
        // console.log("fetchSmPicture",product)
        const productSlug = product.productSlug;
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
                // console.log("response datas",response.data)
                setSmPicture(response.data.photoUrls)
            }else{
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // fetchSmPicture();
//    },[])
  
// console.log(smPicture);

    useEffect(()=>{
        if(variant && variant.productId){
            const fetchSmPictureByProductId = async () => {
                try {
                    const response = await axios.post('https://njs.iretiensemble.com/products/get-sm-picture-by-productId',data, {
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    });
        // console.log("response",response);
        // console.log("product image",response.data.photoUrls);
                    if(response.status === 200 || response.status === 201){
                        // console.log("product image",response.data.photoUrls);
                        dispatch(productsmpicsAction.storeProductImages(response.data.photoUrls))
                    }else{
                        dispatch(productsmpicsAction.storeProductImages([]))
                    }
                } catch (error) {
                    console.log(error);
                    dispatch(productsmpicsAction.storeProductImages([]))
                }
            }

            fetchSmPictureByProductId();
        }
    },[])

    useEffect( () => {
        setWishItems( props.wishlist.reduce( ( acc, product ) => {
            let max = 0;
            let min = 999999;
            variant?.map( item => {
                if ( min > item.price ) min = item.price;
                if ( max < item.price ) max = item.price;
            }, [] );

            if ( variant.length == 0 ) {
                min = product.sale_price
                    ? product.sale_price
                    : product.price;
                max = product.price;
            }

            return [
                ...acc,
                {
                    ...product,
                    minPrice: min,
                    maxPrice: max
                }
            ];
        }, [] ) );
    }, [ props.wishlist ] )

    function moveToCart ( product ) {
        props.removeFromWishlist( product );
        props.addToCart( product );
    }

    return (
        <main className="main" style={{background:"#f8f7f3"}}>
            <PageHeader
                title="Wishlist"
                subTitle="Shop"
            />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Wishlist</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5" style={{background:"#f8f7f3"}}>
                {
                    wishItems.length > 0 ?
                        <div
                            className="container"
                        >
                            <table className="table table-wishlist table-mobile">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Stock Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        wishItems?.map( ( product, index ) => 
                                       {
                                        // console.log(wishItems)
                                        // console.log( "product",product)
                                        return(
                                            <tr
                                                key={ index }
                                            >
                                                <td className="product-col" >
                                                    <div className="product" style={{background:"#f8f7f3"}}>
                                                        <figure className="product-media">
                                                            <ALink href={ `/product/sticky/${product.slug}` } className="product-image" onClick={fetchSmPicture(product)}>
                                                                <img src={smPicture } alt="product" />
                                                            </ALink>
                                                        </figure>

                                                        <h4 className="product-title">
                                                            <ALink href={ `/product/sticky/${product.productSlug}` }>{ product.productName }</ALink>
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td className="price-col">
                                                    {
                                                        product.productStock == 0 ?
                                                            <div className="product-price d-inline-block mb-0">
                                                                <span className="out-price">₹ { product.price.toFixed( 2 ) }</span>
                                                            </div>
                                                            :
                                                            product.minPrice == product.maxPrice ?
                                                                <div className="product-price d-inline-block mb-0">₹ { product.minPrice.toFixed( 2 ) }</div>
                                                                :
                                                                product.variants.length == 0 ?
                                                                    <div className="product-price d-inline-block mb-0">
                                                                        <span className="new-price">₹ { product.minPrice.toFixed( 2 ) }</span>
                                                                        <span className="old-price">₹ { product.maxPrice.toFixed( 2 ) }</span>
                                                                    </div>
                                                                    :
                                                                    <div className="product-price d-inline-block mb-0">₹ { product.minPrice.toFixed( 2 ) }&ndash;₹ { product.maxPrice.toFixed( 2 ) }</div>
                                                    }
                                                </td>
                                                <td className="stock-col">
                                                    <span className={ `${product.productStock == 0 ? 'out-of-stock' : 'in-stock'}` } >{ product.productStock == 0 ? 'Out of stock' : 'In stock' }</span>
                                                </td>
                                                <td className="action-col">
                                                    <div className="dropdown">
                                                        {
                                                            ( variant.length > 0 || product.productStock == 0 ) ?
                                                                <ALink href={ `/product/sticky/${product.productSlug}` } className="btn btn-block btn-outline-primary-2 btn-select">
                                                                    <i className="icon-list-alt"></i>
                                                                    { product.productStock == '0' ? 'read more' : 'select' }
                                                                </ALink>
                                                                :
                                                                (sRed && bRed? (<button className="btn btn-block btn-outline-primary-2" onClick={ e => moveToCart( product ) }>
                                                                    <i className="icon-cart-plus"></i>
                                                                    add to cart
                                                                </button>):(<ALink href={ `/shop/dashboard` }>
                                                                    {/* <i className="icon-list-alt"></i> */}
                                                                    update address
                                                                </ALink>))
                                                        }
                                                    </div>
                                                </td>
                                                <td className="remove-col">
                                                    <button
                                                        className="btn-remove"
                                                        onClick={ e => props.removeFromWishlist( product ) }
                                                    >
                                                        <i className="icon-close"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )} )
                                    }
                                </tbody>
                            </table>

                            <div className="wishlist-share">
                                <div className="social-icons social-icons-sm mb-2">
                                    <label className="social-label">Share on:</label>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Facebook"
                                    >
                                        <i className="icon-facebook-f"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Twitter"
                                    >
                                        <i className="icon-twitter"></i>
                                    </ALink>
                                    <ALink
                                        href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk"
                                        className="social-icon"
                                        title="Instagram"
                                    >
                                        <i className="icon-instagram"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Youtube"
                                    >
                                        <i className="icon-youtube"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Pinterest"
                                    >
                                        <i className="icon-pinterest"></i>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="container"
                        >
                            <div className="text-center">
                                <i className="icon-heart-o wishlist-empty d-block" style={ { fontSize: '15rem', lineHeight: '1' } }></i>
                                <span className="d-block mt-2">No products added to wishlist</span>
                                <ALink
                                    href="/shop/sidebar/list"
                                    className="btn btn-primary mt-2"
                                >Go Shop</ALink>
                            </div>
                        </div>
                }

            </div>
        </main>
    )
}

const mapStateToProps = ( state ) => ( {
    wishlist: state.wishlist.data
} )

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction } )( Wishlist );