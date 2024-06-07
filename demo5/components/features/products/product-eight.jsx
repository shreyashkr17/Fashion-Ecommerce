import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';

function ProductEight ( props ) {
    const { product } = props;
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState(null );

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
    }, [] )

    return (
        <div className="product product-sm">
            <figure className="product-media">
                <ALink href={ `/product/default/${product.slug}` }>
                    <img
                        src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url }
                        alt="Product"
                        className="product-image"
                    />
                </ALink>
            </figure>

            <div className="product-body">
                <h5 className="product-title">
                    <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                </h5>
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
        </div>
    )
}
export default React.memo( ProductEight );
