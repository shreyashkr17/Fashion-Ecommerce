import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import RelatedProductsTwo from '~/components/partials/product/related/related-two';

function ProductSidebar ( props ) {
    const [ toggle, setToggle ] = useState( 0 );
    const { products, loading = false } = props;

    useEffect( () => {
        resizeHandle();
        window.addEventListener( "resize", resizeHandle );

        return () => {
            window.removeEventListener( "resize", resizeHandle );
        }
    }, [] )

    function resizeHandle () {
        if ( document.querySelector( "body" ).offsetWidth < 992 ) {
            setToggle( true );
        } else {
            setToggle( false );
        }
    }

    function hideSideBar () {
        if ( document.querySelector( 'body' ).classList.contains( 'sidebar-filter-active' ) ) {
            document.querySelector( 'body' ).classList.remove( 'sidebar-filter-active' );
        }
    }

    function toggleSideBar () {
        if ( document.querySelector( 'body' ).classList.contains( 'sidebar-filter-active' ) ) {
            document.querySelector( 'body' ).classList.remove( 'sidebar-filter-active' );
        } else {
            document.querySelector( 'body' ).classList.add( 'sidebar-filter-active' );
        }
    }

    function closeSideBar () {
        if ( document.querySelector( 'body' ).classList.contains( 'sidebar-filter-active' ) ) {
            document.querySelector( 'body' ).classList.remove( 'sidebar-filter-active' );
        }
    }

    if ( !products ) {
        return <div></div>
    }

    return (
        <>
            {
                !loading ?
                    <>
                        <div className={ `${toggle ? 'sidebar-filter right' : 'sidebar'} sidebar-product` }>
                            <div className={ toggle ? 'sidebar-filter-wrapper product-sidebar-wrapper' : '' }>
                                <button onClick={ closeSideBar } className="btn-product btn-close" style={ { marginLeft: 'auto', marginRight: '5px' } }>
                                    <i className="icon-close"></i>
                                </button>

                                <div className="widget widget-products">
                                    <h4 className="widget-title mb-1">Related Product</h4>

                                    <div className="products">
                                        <RelatedProductsTwo products={ products.slice( 0, 4 ) } />
                                    </div>

                                    <ALink href="/shop/sidebar/list" className="btn btn-outline-dark-3 text-truncate"><span>View More Products</span><i className="icon-long-arrow-right"></i></ALink>
                                </div>

                                <div className="widget widget-banner-sidebar pb-2">
                                    <div className="banner-sidebar-title">ad box 280 x 280</div>

                                    <div className="banner-sidebar text-left banner-overlay ml-0">
                                        <ALink href="#" className="w-100">
                                            <div className="lazy-overlay"></div>
                                            <LazyLoadImage
                                                alt="banner"
                                                src="images/blog/sidebar/banner.jpg"
                                                threshold={ 500 }
                                                height={ 277 }
                                                width={ 280 }
                                                effect="opacity"
                                            />
                                        </ALink>
                                        <div className="banner-content text-left pt-0">
                                            <p className="mb-1">online & in-store</p>
                                            <h3 className="banner-subtitle text-uppercase">Spring Sale</h3>
                                            <h2 className="banner-title">Up to 60% off<br />from $55</h2>
                                            <ALink href="/shop/sidebar/3cols" className="btn btn-outline btn-md btn-outline-white text-uppercase m-0">Shop Now</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { toggle ?
                            <button className="sidebar-fixed-toggler right" onClick={ toggleSideBar }><i className="icon-cog"></i></button> :
                            ''
                        }
                        <div className="sidebar-filter-overlay" onClick={ hideSideBar }></div>
                    </>
                    : ""
            }

        </>
    );
}

export default React.memo( ProductSidebar );