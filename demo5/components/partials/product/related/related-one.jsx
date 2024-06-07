import React from 'react';
import ProductSix from '~/components/features/products/product-six';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider8 } from '~/utils/data';

function RelatedProductsOne ( props ) {
    const { products } = props;
    // console.log(products)

    return (
        <>
            {products?.length>0? <h2 className="title text-center mb-4">You May Also Like</h2>:null}

            {
                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1" isTheme={ false } options={ mainSlider8 }>
                    {
                        products?.map( ( product, index ) =>
                            <ProductSix product={ product } key={ index } />
                        )
                    }
                </OwlCarousel>
            }
        </>
    );
}

export default React.memo( RelatedProductsOne );