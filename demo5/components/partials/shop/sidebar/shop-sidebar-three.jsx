import { useRouter } from 'next/router';
import React from 'react';
import 'react-input-range/lib/css/index.css';

import ALink from '~/components/features/alink';
import { shopData } from '~/utils/data';

function ShopSidebarThree ( props ) {
    const { toggle = false } = props;
    const router = useRouter();
    const query = useRouter().query;

    function containsAttrInUrl ( type, value ) {
        const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        return currentQueries && currentQueries.includes( value );
    }

    function containsPriceInUrl ( price ) {
        let flag = false;
        if ( query.minPrice && query.minPrice == price.min )
            flag = true;
        else return false;

        if ( price.max ) {
            if (
                query.maxPrice &&
                query.maxPrice == price.max
            )
                flag = true;
            else return false;
        }
        return true;
    }

    function getUrlForAttrs ( type, value ) {
        let currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : [ ...currentQueries, value ];
        return {
            pathname: router.pathname,
            query: {
                ...query,
                page: 1,
                [ type ]: currentQueries.join( ',' )
            }
        }
    }

    function onAttrClick ( e, attr, value ) {
        if ( getUrlForAttrs( attr, value ) )
            router.push( getUrlForAttrs( attr, value ) );
    }

    function onPriceClick ( value ) {
        router.push( {
            query: {
                ...query,
                page: 1,
                minPrice: value.min,
                maxPrice: value.max
            }
        } )
    }

    return (
        <>
            <aside className={ `${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop` }>
                <div className={ toggle ? 'sidebar-filter-wrapper' : '' }>
                    <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2">
                            {/* <span>Category</span> */}
                        </h3>
                        <div className="widget-body pt-0">
                            <div className="filter-items filter-items-count">
                                {
                                    shopData?.categories.map( ( item, index ) =>
                                        <div className="filter-item" key={ `cat_${index}` }>
                                            <ALink className={ `${query.category == item.slug ? 'active' : ''}` } href={ { pathname: router.pathname, query: { category: item.slug } } } scroll={ false }>{ item.name }</ALink>
                                            <span className="item-count">{ item.count }</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2"><span>Brand</span></h3>
                        <div className="widget-body pt-0">
                            <div className="filter-items">
                                {
                                    shopData.brands.map( ( item, index ) => (

                                        <div className="filter-item" key={ index }>
                                            <div className="custom-control custom-checkbox">

                                                <input type="checkbox"
                                                    className="custom-control-input"
                                                    id={ `brand-${index + 1}` }
                                                    onChange={ e => onAttrClick( e, 'brand', item.slug ) }
                                                    checked={ containsAttrInUrl( 'brand', item.slug ) ? true : false }
                                                />
                                                <label className="custom-control-label" htmlFor={ `brand-${index + 1}` }>{ item.brand }</label>
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                    </div> */}

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2">
                            <span>Price</span>
                        </h3>
                        <div className="widget-body pt-0">
                            <div className="filter-items">
                                {
                                    shopData?.prices.map( ( item, index ) => (
                                        <div className="filter-item" key={ index }>
                                            <div className="custom-control custom-radio">

                                                <input type="radio"
                                                    className="custom-control-input"
                                                    id={ `price-${index + 1}` }
                                                    onChange={ e => onPriceClick( item ) }
                                                    checked={ containsPriceInUrl( item ) ? true : false }
                                                />
                                                <label className="custom-control-label" htmlFor={ `price-${index + 1}` }>{ item.name }</label>
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2">
                            <span>Customer Rating</span>
                        </h3>
                        <div className="widget-body pt-0">
                            <div className="filter-items">
                                {
                                    [ 5, 4, 3, 2, 1 ].map( ( item, index ) => (

                                        <div className="filter-item" key={ index }>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox"
                                                    className="custom-control-input"
                                                    id={ `rating-${index + 1}` }
                                                    onChange={ e => onAttrClick( e, 'rating', item.toString() ) }
                                                    checked={ containsAttrInUrl( 'rating', item.toString() ) ? true : false }
                                                />
                                                <label className="custom-control-label" htmlFor={ `rating-${index + 1}` }>
                                                    <span className="ratings-container">
                                                        <span className="ratings">
                                                            <span className="ratings-val" style={ { width: `${item * 20}%` } }></span>
                                                        </span>

                                                        <span className="ratings-text"></span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="widget widget-collapsible mb-0 pb-0">
                        <h3 className="widget-title mb-2"><span>Colour</span></h3>
                        <div className="widget-body pt-0">
                            <div className="filter-colors">
                                {
                                    shopData?.colors.map( ( item, index ) => (
                                        <ALink href={ getUrlForAttrs( 'color', item.color_name ) } className={ containsAttrInUrl( 'color', item.color_name ) ? 'selected' : '' } style={ { backgroundColor: item.color } } key={ index } scroll={ false }>
                                            <span className="sr-only">Color Name</span>
                                        </ALink>
                                    ) )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </aside >
        </>
    );
}

export default React.memo( ShopSidebarThree );