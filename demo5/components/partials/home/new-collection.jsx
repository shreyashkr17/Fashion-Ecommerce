import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';

import ProductTwelve from '~/components/features/products/product-twelve';

import { catFilter } from '~/utils';

function NewCollection ( props ) {
    const { products = [], loading } = props;
    const [ items, setItems ] = useState( [] );
    const [ hasMore, setHasMore ] = useState( true );
    const [ loadMoreLoading, setLoadMoreLoading ] = useState( false );

    useEffect( () => {
        if ( products.length > 0 ) {
            if ( hasMore ) {
                setItems( products.slice( 0, 8 ) )
            } else setItems( products.slice( 0, 12 ) );
        }
    }, [ products, hasMore ] )

    function loadMore ( e ) {
        e.preventDefault();
        setLoadMoreLoading( true );

        setTimeout( () => {
            setHasMore( false );
            setLoadMoreLoading( false );
        }, 500 );
    }

    return (
        <div className="container new-arrivals pt-5">
            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                {products?.length>0 ?<div className="heading heading-center mb-2">
                    <h2 className="title" style={{fontFamily: '"Italianno", cursive',fontWeight: "600",fontSize:"4.8rem"}}>New  Arrivals</h2>
                    <TabList className="nav nav-pills nav-border-anim justify-content-center">  
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>All</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Clothing</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Womens</span>
                        </Tab>
                        {/* <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>MENS</span>
                        </Tab> */}
                    </TabList>
                </div>:null}

                <TabPanel>
                    <div className="products">
                        <div className="row justify-content-center">
                            {
                                ( loading || items.length == 0 ) ?
                                    [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    items?.slice(0,4).map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <ProductTwelve
                                                product={ item } />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products">
                        <div className="row justify-content-center">
                            {
                                ( loading || items.length == 0 ) ?
                                    [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    catFilter( items, [ 'clothings' ] ).slice(0,4).map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <ProductTwelve
                                                product={ item } />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products">
                        <div className="row justify-content-center">
                            {
                                ( loading || items.length == 0 ) ?
                                    [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    catFilter( items, [ 'women' ] ).slice(0,4).map( ( item, index ) =>
                                        <div className="col-6 col-md-4 col-lg-3 mb-1" key={ index }>
                                            <ProductTwelve
                                                product={ item } />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                {/* {
                    ( loadMoreLoading || hasMore ) ?
                        <div className="more-container text-center mt-1 mb-3">
                            <a href="#" className="btn btn-outline-primary-2 btn-round btn-more" style={{fontFamily:"'Gotham Medium',sans-serif"}} onClick={ loadMore }>
                                Load More
                                <i className={ `mr-0 icon-refresh ${loadMoreLoading ? 'load-more-rotating' : ''}` }></i>
                            </a>
                        </div>
                        : ""
                } */}
            </Tabs >
        </div>
    )
}

export default NewCollection;
