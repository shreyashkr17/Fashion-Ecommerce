import React from 'react';
import { Magnifier } from 'react-image-magnifiers';

import OwlCarousel from '~/components/features/owl-carousel';
import { mainSlider9 } from '~/utils/data';

function GalleryExtended ( props ) {
    const { product } = props;

    if ( !product ) {
        return <div></div>
    }

    return (
        <div className="product-lg position-relative">
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
                product.stock == 0 ?
                    <span className="product-label label-out">Out of Stock</span>
                    : ""
            }
            <OwlCarousel adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3" options={ mainSlider9 }>
                { product?.pictures.map( ( item, index ) =>
                    <Magnifier
                        imageSrc={ process.env.NEXT_PUBLIC_ASSET_URI + item.url }
                        imageAlt="product"
                        largeImageSrc={ process.env.NEXT_PUBLIC_ASSET_URI + item.url } // Optional
                        dragToMove={ false }
                        mouseActivation="hover"
                        cursorStyleActive="crosshair"
                        className="product-gallery-image"
                        style={ { paddingTop: `${product.pictures[ 0 ].height / product.pictures[ 0 ].width * 100}%` } }
                        key={ "gallery-" + index }
                    />
                ) }
            </OwlCarousel>
        </div>
    )
}

export default React.memo( GalleryExtended );