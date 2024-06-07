import { Magnifier } from 'react-image-magnifiers';
import React, { useState, useEffect } from 'react';
import LightBox from 'react-image-lightbox';

function GallerySticky( props ) {
    const { product } = props;
    // console.log(product)
    // console.log(product && product.lgPics && product.lgPics[0].photoUrl[0])
    const [ isOpen, setIsOpen ] = useState( false );
    const [ photoIndex, setPhotoIndex ] = useState( 0 );

    useEffect( () => {
        if ( product ) {
            setIsOpen( false );
            setPhotoIndex( 0 );
        }
    }, [ product ] )

    function moveNextPhoto() {
        setPhotoIndex( ( photoIndex + 1 ) % product.lgPics.length );
    }

    function movePrevPhoto() {
        setPhotoIndex( ( photoIndex + product.lgPics.length - 1 ) % product.lgPics.length );
    }

    function openLightBox( index ) {
        setIsOpen( true );
        setPhotoIndex( index );
    }

    function closeLightBox() {
        setIsOpen( false );
    }

    if ( !product ) {
        return <div></div>
    }

    return (
        <>
            <div className="product-gallery product-gallery-separated">
                {
                    product.productNew ?
                        <span className="product-label label-new">New</span>
                        : ""
                }

                {
                    product.productsalePrice ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                }

                {
                    product.productTop ?
                        <span className="product-label label-top">Top</span>
                        : ""
                }

                {
                    !product.productStock && product.stock == null ?
                        <span className="product-label label-out">Out of Stock</span>
                        : ""
                }
                {product && product.lgPics && product?.lgPics.map((item, index) => (
                    item && item.photoUrl && item.photoUrl?.map((photo, index) => (
                        <figure className="product-main-image" key={index} style={{ backgroundColor: '#f4f4f4' }}>
                            <Magnifier
                                imageSrc={photo} 
                                imageAlt="product"
                                largeImageSrc={photo} 
                                // dragToMove={true}
                                // mouseActivation="hover"
                                // className="zoom-image position-relative"
                                // cursorStyleActive="crosshair"
                                zoomFactor={2}
                                width="800px"
                                height="1089px"
                            />
                            <button id="btn-product-gallery" className="btn-product-gallery" onClick={(e) => openLightBox( index)}>
                                <i className="icon-arrows"></i>
                            </button>
                        </figure>
                    ))
                ))}
            </div>

            {isOpen && (
                <LightBox
                    mainSrc={product && product.lgPics && product.lgPics[photoIndex] && product.lgPics[photoIndex].photoUrl[0]} 
                    nextSrc={product.lgPics[(photoIndex + 1) % product.lgPics.length].photoUrl[0]} 
                    prevSrc={product.lgPics[(photoIndex + product.lgPics.length - 1) % product.lgPics.length].photoUrl[0]} 
                    onCloseRequest={closeLightBox}
                    onMovePrevRequest={moveNextPhoto}
                    onMoveNextRequest={movePrevPhoto}
                    reactModalStyle={{ overlay: { zIndex: 1041 } }}
                    // wrapperClassName="lightbox-modal"
                />
            )}
        </>
    )
}

export default React.memo( GallerySticky );