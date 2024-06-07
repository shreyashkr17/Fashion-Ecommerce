import React from 'react';

import OwlCarousel from '~/components/features/owl-carousel';
import ProductEight from '~/components/features/products/product-eight';

function RelatedTwo ( props ) {
    const { products } = props;

    if ( !products ) {
        return <div></div>
    }

    return (
        <OwlCarousel adClass="owl-simple">
            <div>
                {
                    products?.map( ( product, index ) => (
                        <ProductEight product={ product } key={ index } />
                    ) )
                }
            </div>
        </OwlCarousel>
    )
}

export default React.memo( RelatedTwo );