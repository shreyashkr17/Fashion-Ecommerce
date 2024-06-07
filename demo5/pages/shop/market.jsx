import StickyBox from 'react-sticky-box';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import OwlCarousel from '~/components/features/owl-carousel';
import ShopListTwo from '~/components/partials/shop/list/shop-list-two';
import Pagination from '~/components/features/pagination';
import ShopSidebarThree from '~/components/partials/shop/sidebar/shop-sidebar-three';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';
import { homeData, mainSlider11, mainSlider10 } from '~/utils/data';

function ShopMarket () {
    const router = useRouter();
    const query = router.query;
    const [ getProducts, { data, loading, error } ] = useLazyQuery( GET_PRODUCTS );
    const [ perPage, setPerPage ] = useState( 8 );
    const [ toggle, setToggle ] = useState( false );
    const products = data && data.products.data;
    const totalCount = data && data.products.totalCount;

    useEffect( () => {
        window.addEventListener( "resize", resizeHandle );
        resizeHandle();
        return () => {
            window.removeEventListener( "resize", resizeHandle );
        }
    }, [] )

    function resizeHandle () {
        if ( document.querySelector( "body" ).offsetWidth < 992 )
            setToggle( true );
        else
            setToggle( false );
    }

    useEffect( () => {
        getProducts( {
            variables: {
                searchTerm: query.searchTerm,
                color: query.color ? query.color.split( ',' ) : [],
                size: query.size ? query.size.split( ',' ) : [],
                brand: query.brand ? query.brand.split( ',' ) : [],
                minPrice: parseInt( query.minPrice ),
                maxPrice: parseInt( query.maxPrice ),
                category: query.category,
                sortBy: query.sortBy ? query.sortBy : 'default',
                page: query.page ? parseInt( query.page ) : 1,
                perPage: perPage,
                rating: query.rating ? query.rating.split( ',' ) : []
            }
        } );
    }, [ query, perPage ] )

    function onSortByChange ( e ) {
        let queryObject = router.query;
        let url = router.pathname.replace( '[type]', query.type ) + '?';
        for ( let key in queryObject ) {
            if ( key !== "type" && key !== "sortBy" ) {
                url += key + '=' + queryObject[ key ] + '&';
            }
        }

        router.push( url + 'sortBy=' + e.target.value );
    }

    function toggleSidebar () {
        if (
            document
                .querySelector( 'body' )
                .classList.contains( 'sidebar-filter-active' )
        ) {
            document
                .querySelector( 'body' )
                .classList.remove( 'sidebar-filter-active' );
        } else {
            document
                .querySelector( 'body' )
                .classList.add( 'sidebar-filter-active' );
        }
    }

    function hideSidebar () {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );
    }

    if ( error ) {
        return <div></div>
    }

    return (
        <main className="main shop-market">
            <PageHeader title="Shop Market" subTitle="Shop" />
            <nav className="breadcrumb-nav mb-3">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Market</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-lg-9 col-xl-4-5col"
                        >
                            <OwlCarousel adClass="category-banners-slider owl-simple owl-nav-inside cols-1" options={ mainSlider10 }>
                                <div className="banner banner-poster">
                                    <ALink href="#">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            src="images/market/slider/slider-1.jpg"
                                            alt="Banner"
                                            effect="blur"
                                            width={ 400 }
                                            height={ 260 }
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-right">
                                        <h3 className="banner-subtitle"><ALink href="#">Amazing Value</ALink></h3>
                                        <h2 className="banner-title"><ALink href="#">High Performance 4K TVs</ALink></h2>
                                        <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>

                                <div className="banner banner-poster">
                                    <ALink href="#">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            src="images/market/slider/slider-2.jpg"
                                            alt="Banner"
                                            effect="blur"
                                            width={ 400 }
                                            height={ 260 }
                                        />
                                    </ALink>

                                    <div className="banner-content">
                                        <h3 className="banner-subtitle"><ALink href="#">Weekend Deal</ALink></h3>
                                        <h2 className="banner-title"><ALink href="#">Apple & Accessories</ALink></h2>
                                        <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </OwlCarousel>

                            <OwlCarousel adClass="owl-carousel owl-simple owl-nav-align brand-carousel cols-xl-7 cols-lg-5 cols-md-4 cols-sm-3 cols-2 pt-2 pb-2" options={ mainSlider11 }>
                                {
                                    homeData?.brands.slice( 0, 7 ).map( ( brand, index ) => {
                                        return (
                                            <ALink href="#" className="brand mr-0" key={ index } >
                                                <img src={ brand.image } alt="brand" width={ brand.width } height={ brand.height } />
                                            </ALink>
                                        )
                                    } )
                                }
                            </OwlCarousel>
                            <div className="cat-blocks-container">
                                <div className="row">
                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=computers" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/1.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Desktop Computers</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=monitors" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/2.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Monitors</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=laptops" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/3.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Laptops</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=tablets" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/4.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">iPads & Tablets</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=storage" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/5.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Hard Drives & Storage</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=printers" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/6.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Printers & Supplies</h3>
                                        </ALink>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3">
                                        <ALink href="/shop/market?category=accessories" className="cat-block" scroll={ false }>
                                            <figure>
                                                <span>
                                                    <img src="images/market/cats/7.jpg" alt="Category" />
                                                </span>
                                            </figure>

                                            <h3 className="cat-block-title">Computer Accessories</h3>
                                        </ALink>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2"></div>

                            <div className="toolbox">
                                <div className="toolbox-left">
                                    {
                                        !loading && products ?
                                            <div className="toolbox-info">
                                                Showing
                                                <span> { products.length } of { totalCount }</span> Products
                                            </div>
                                            : ""
                                    }
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby">Sort by:</label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control bg-white"
                                                onChange={ onSortByChange }
                                                value={ query.sortBy ? query.sortBy : 'default' }
                                            >
                                                <option value="default">Featured</option>
                                                <option value="featured">Price: Low To High</option>
                                                <option value="rating">Price: High To Low</option>
                                                <option value="new">Customer Review</option>
                                                <option value="new">Newest Arrivals</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <ShopListTwo products={ products } perPage={ perPage } loading={ loading } />

                            {
                                totalCount > perPage ?
                                    <Pagination perPage={ perPage } total={ totalCount } />
                                    : ""
                            }
                        </div >

                        <aside className="col-lg-3 col-xl-5col order-lg-first">
                            <StickyBox className="sticky-market-sidebar" offsetTop={ 70 }>
                                <ShopSidebarThree toggle={ toggle } />
                            </StickyBox>
                            {
                                toggle ?
                                    <button className="sidebar-fixed-toggler" onClick={ toggleSidebar }>
                                        <i className="icon-cog"></i>
                                    </button>
                                    : ''
                            }
                            <div className="sidebar-filter-overlay" onClick={ hideSidebar }></div>
                        </aside >
                    </div >
                </div >
            </div >
        </main >
    )
}

export default withApollo( { ssr: typeof window == 'undefined' } )( ShopMarket );