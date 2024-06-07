import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import ProductTen from '~/components/features/products/product-ten';

function ShopListThree ( props ) {
    const { products = [], loading } = props;
    const fakeArray = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
    const [ cols, setCols ] = useState( "" );
    const query = useRouter().query;

    useEffect( () => {
        setCols( query.type == 'boxed' ? 'col-6 col-md-4 col-lg-4 col-xl-3' : 'col-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2' )
    }, [ query ] )

    return (
        <div className={ `products mb-3 content-overlay skeleton-body skel-shop-products ${loading ? '' : 'loaded'}` }>
            {
                ( products.length == 0 && !loading ) ?
                    <p
                        className="no-results"
                    >No products matching your selection.</p>
                    :
                    <div className="row">
                        {
                            loading ?
                                fakeArray.map( ( item, index ) => (
                                    <div className={ cols } key={ index }>
                                        <div className="skel-pro"></div>
                                    </div>
                                ) )
                                :
                                products?.map( ( product, index ) => (
                                    <div className={ cols } key={ index }>
                                        <ProductTen product={ product }></ProductTen>
                                    </div>
                                ) )
                        }
                    </div>
            }
        </div>
    )
}

export default React.memo( ShopListThree );