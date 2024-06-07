import Modal from 'react-modal';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Magnifier } from 'react-image-magnifiers';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import OwlCarousel from '~/components/features/owl-carousel';
import DetailOne from '~/components/partials/product/details/detail-one';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import { actions as demoAction } from '~/store/demo';
import React, { useState, useEffect } from 'react';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(51,51,51,0.6)',
        zIndex: '9000'
    }
};

Modal.setAppElement( 'body' );

function QuickViewModal ( props ) {
    const { slug } = props;
    if ( !slug ) {
        return <div></div>
    }
    const { data, loading, error } = useQuery( GET_PRODUCT, { variables: { slug, onlyData: true } } );
    const product = data && data.product.single;
    const router = useRouter();
    const [ carouselRef, setCarouselRef ] = useState( null );

    const events = {
        onTranslate: function ( e ) {
            let items = document.querySelectorAll( '.quickView-content .product-gallery-item' );
            document.querySelector( '.quickView-content .product-gallery-item.active' ).classList.remove( 'active' );
            items[ e.item.index ].classList.add( 'active' );
        }
    }

    useEffect( () => {
        router.events.on( 'routeChangeStart', closeModal );
        carouselRef && carouselRef.current && carouselRef.current.goTo( 0 );

        return () => {
            router.events.off( 'routeChangeStart', closeModal );
        }
    }, [] )

    function closeModal () {
        if ( document.querySelector( ".ReactModal__Content" ) ) {
            document.querySelector( ".ReactModal__Content" ).classList.remove( "ReactModal__Content--after-open" );
        }

        if ( document.querySelector( ".ReactModal__Overlay" ) ) {
            document.querySelector( ".ReactModal__Overlay" ).style.opacity = '0';
        }

        setTimeout( () => {
            props.hideQuick();
        }, 250 );
    }

    function changeBgImage ( e, index ) {
        document.querySelector( '.quickView-content .product-gallery-item.active' ).classList.remove( 'active' );
        e.currentTarget.classList.add( 'active' );
        carouselRef.current.goTo( index );
    }


    if ( !slug || error ) {
        return <div></div>
    }
    return (
        <>
            <Modal
                isOpen={ props.modalShow }
                onRequestClose={ closeModal }
                className="container quickView-container"
                overlayClassName="d-flex align-items-center justify-content-center"
                shouldReturnFocusAfterClose={ false }
                closeTimeoutMS={ 100 }
                contentLabel="QuickView"
                style={ customStyles }
                id="product-quickview"
            >
                <div className="modal-content">
                    <div className="quickView-content horizontal skeleton-body">
                        <div className={ `row skel-pro-single skel-quickview mb-0 ${loading ? '' : 'loaded'}` }>
                            <div className="col-lg-6 p-0 pr-lg-2 mb-2 mb-lg-0">
                                <div className="skel-product-gallery"></div>

                                {
                                    !loading ?
                                        <>
                                            <div className="product-lg mb-1 position-relative">
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
                                                <OwlCarousel adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3" onChangeRef={ setCarouselRef } events={ events } options={ { 'dots': false, 'nav': false } }>
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

                                            <div className="product-sm row px-2" id="owl-dots">
                                                {
                                                    product?.pictures.map( ( item, index ) =>
                                                        <button className={ `product-gallery-item mb-0 ${0 === index ? 'active' : ''}` } key={ product.id + '-' + index } onClick={ e => changeBgImage( e, index ) }>
                                                            <div className="lazy-media">
                                                                <figure className="mb-0">
                                                                    <div className="lazy-overlay"></div>
                                                                    <LazyLoadImage
                                                                        alt="Thumbnail"
                                                                        src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ index ].url }
                                                                        width="100%"
                                                                        height="auto"
                                                                        className="d-block"
                                                                    />
                                                                </figure>
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                            </div>

                                        </>
                                        : ""
                                }
                            </div>
                            <div className="col-lg-6 quickview-desc pl-0 pl-lg-4 pr-0">
                                <div className="entry-summary row">
                                    <div className="col-md-12">
                                        <div className="entry-summary1 mt-2 mt-md-0"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entry-summary2"></div>
                                    </div>
                                </div>
                                {
                                    !loading ?
                                        <DetailOne product={ product } />
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeModal }><span>×</span></button>
            </Modal>
        </>
    )
}

const mapStateToProps = ( state ) => {
    return {
        slug: state.demo.single,
        modalShow: state.demo.quickShow,
    }
}

export default withApollo( { ssr: typeof window == 'undefined' } )( connect( mapStateToProps, { ...demoAction } )( QuickViewModal ) );
