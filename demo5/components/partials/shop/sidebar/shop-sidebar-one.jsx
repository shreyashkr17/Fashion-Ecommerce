import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';
import 'react-input-range/lib/css/index.css';

import ALink2 from '~/components/features/alink2';
import ALink from '~/components/features/alink';
import { shopData } from '~/utils/data';
import axios from 'axios';

function ShopSidebarOne ( props ) {
    const { toggle = false } = props;
    const router = useRouter();
    const query = useRouter().query;
    const [ priceRange, setRange ] = useState( { min: 0, max: 1000 } );

    const [category , setCategory] = useState();
    const [materialCategory, setMaterialCategory] = useState();
    const [occasionCategory, setOccasionCategory] = useState();

    useEffect(() => {
        const handleCategoryFetch = async () => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/products/get-count-product-category', {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });

                if(response.status === 200 || response.status == 201){
                    setCategory(response.data.productCounts);
                }else{
                    setCategory(null);
                }
            } catch (error) {
                throw new Error("Unable to fetch Product Category Count")
            }
        }

        const handleMaterialFetch = async () => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/products/get-count-product-material-category', {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                // console.log("response ",response)

                if(response.status === 200 || response.status == 201){
                    setMaterialCategory(response.data.productCounts);
                }
            } catch (error) {
                console.log("Unable to fetch Product Material Count")
                setMaterialCategory(null);
            }
        }

        const handleOccasionsFetch = async () => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/products/get-count-product-occasion-category', {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });

                if(response.status === 200 || response.status == 201){
                    setOccasionCategory(response.data.productCounts);
                }else{
                    setOccasionCategory(null);
                }
            } catch (error) {
               console.log("Unable to fetch Product Occasion Count")
            }
        }

        handleCategoryFetch();
        handleMaterialFetch();
        handleOccasionsFetch();
    },[])

    useEffect( () => {
        if ( query.minPrice && query.maxPrice ) {
            setRange( { min: parseInt( query.minPrice ), max: parseInt( query.maxPrice ) } );
        } else {
            setRange( { min: 0, max: 1000 } );
        }
    }, [ query ] )

    function onChangePriceRange ( value ) {
        setRange( value );
    }

    function containsAttrInUrl ( type, value ) {
        const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        return currentQueries && currentQueries.includes( value );
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
        if ( getUrlForAttrs( attr, value ) ) {
            let queryObject = getUrlForAttrs( attr, value ).query;
            let url = router.pathname.replace( '[type]', query.type ) + '?';
            for ( let key in queryObject ) {
                if ( key !== "type" ) {
                    url += key + '=' + queryObject[ key ] + '&';
                }
            }
            router.push( url );
        }
    }

    return (
        <>
            <aside className={ `${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop` }>
                <div className={ toggle ? 'sidebar-filter-wrapper' : '' }>
                    <div className="widget widget-clean">
                        <label  style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.5rem"}}>Filters:</label>
                        <ALink href={ { pathname: router.pathname, query: {type: query.type} } } className="sidebar-filter-clear" scroll={ false }  style={{fontFamily:"'Gotham Black',sans-serif",color:"#323c33"}}>Clear All</ALink>
                    </div>

                    <SlideToggle collapsed={ false }>
                        { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#category" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Category</a>
                                </h3>

                                <div ref={ setCollapsibleElement }>
                                    <div className="widget-body pt-0">
                                        <div className="filter-items filter-items-count">
                                        <>
                                            {/* Rendering "All" category first */}
                                            {/* {category?.filter(item => item.productCategory === "All").map((item, index) => (
                                                <div className="filter-item" key={`cat_${index}`}>
                                                    <ALink2 style={{ fontFamily: "'Gotham Light',sans-serif", fontSize: "1.5rem" }} href="" category={item.productCategory}>
                                                        {item.productCategory}
                                                    </ALink2>
                                                    <span className="item-count" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>{item.count}</span>
                                                </div>
                                            ))} */}
                                            {/* Rendering other categories */}
                                            {category?.filter((item) => item.productCategory !== "All" && ['SetsCoordStyledSets', 'Dress', 'Shirts', 'Skirts', 'Trousers', 'Vests', 'Topwear'].includes(item.productCategory))
                                            .sort((a,b) => {
                                                const categoryA = a.productCategory === "SetsCoordStyledSets" ? "Co-ords" : a.productCategory;
                                                const categoryB = b.productCategory === "SetsCoordStyledSets" ? "Co-ords" : b.productCategory;
                                                return categoryA.localeCompare(categoryB)
                                            })
                                            .map((item, index) => (
                                                <div className="filter-item" key={`cat_${index}`}>
                                                    <ALink2 style={{ fontFamily: "'Gotham Light',sans-serif", fontSize: "1.5rem" }} href="" category={item.productCategory}>
                                                        {item.productCategory === "SetsCoordStyledSets" ? "Co-ords" : item.productCategory}
                                                    </ALink2>
                                                    {/* <span className="item-count" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>{item.count}</span> */}
                                                </div>
                                            ))}
                                        </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) }
                    </SlideToggle>
                    {occasionCategory?.length>0 ?<SlideToggle collapsed={ false }>
                        { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#category" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Occasion</a>
                                </h3>

                                <div ref={ setCollapsibleElement }>
                                    <div className="widget-body pt-0">
                                        <div className="filter-items filter-items-count">
                                            {occasionCategory && occasionCategory?.map((item, index) => (
                                                <div className="filter-item" key={ `cat_${index}` }>
                                                    <ALink2 style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}} href="" category={item.occasionCategory}>
                                                        {item.occasionCategory}
                                                    </ALink2>
                                                    <span className="item-count"  style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ item.count }</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) }
                    </SlideToggle>:null}
                    <SlideToggle collapsed={ false }>
                        { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#category" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Material</a>
                                </h3>

                                <div ref={ setCollapsibleElement }>
                                    <div className="widget-body pt-0">
                                        <div className="filter-items filter-items-count">
                                            {materialCategory && materialCategory?.map((item, index) => (
                                                <div className="filter-item" key={ `cat_${index}` }>
                                                    <ALink2 style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}} href="" category={item.materialCategory}>
                                                        {item.materialCategory === "Polyester"? "Recycled Poly":item.materialCategory}
                                                    </ALink2>
                                                    {/* <span className="item-count"  style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ item.count }</span> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) }
                    </SlideToggle>

                    <SlideToggle collapsed={ false }>
                        {
                            ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title mb-2"><a href="#Size" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Size</a></h3>
                                    <div ref={ setCollapsibleElement }>
                                        <div className="widget-body pt-0">
                                            <div className="filter-items">
                                                {
                                                    shopData?.sizes.map( ( item, index ) => (
                                                        <div className="filter-item" key={ index }>
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox"
                                                                    className="custom-control-input"
                                                                    id={ `size-${index + 1}` }
                                                                    onChange={ e => onAttrClick( e, 'size', item.slug ) }
                                                                    checked={ containsAttrInUrl( 'size', item.slug ) ? true : false }
                                                                />
                                                                <label className="custom-control-label" style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}} htmlFor={ `size-${index + 1}` }>{ item.size }</label>
                                                            </div>
                                                        </div>
                                                    ) )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </SlideToggle>

                    {/* <SlideToggle collapsed={ false }>
                        {
                            ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title mb-2"><a href="#colour" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Colour</a></h3>
                                    <div ref={ setCollapsibleElement }>
                                        <div className="widget-body pt-0">
                                            <div className="filter-colors">
                                                {
                                                    shopData.colors.map( ( item, index ) => (
                                                        <ALink href={ getUrlForAttrs( 'color', item.color_name ) } className={ containsAttrInUrl( 'color', item.color_name ) ? 'selected' : '' } style={ { backgroundColor: item.color } } key={ index } scroll={ false }>
                                                            <span className="sr-only">Color Name</span>
                                                        </ALink>
                                                    ) )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </SlideToggle> */}

                    {/* <SlideToggle collapsed={ false }>
                        {
                            ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title mb-2"><a href="#brand" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Brand</a></h3>
                                    <div ref={ setCollapsibleElement }>
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
                                    </div>
                                </div>
                            )
                        }
                    </SlideToggle> */}

                    {/* <SlideToggle collapsed={ false }>
                        { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#price" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Price</a>
                                </h3>

                                <div ref={ setCollapsibleElement }>
                                    <div className="widget-body pt-0">
                                        <div className="filter-price">
                                            <div className="filter-price-text d-flex justify-content-between">
                                                <span style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.5rem"}}>
                                                    Price Range:&nbsp;
                                                    <span className="filter-price-range">${ priceRange.min } - ${ priceRange.max }</span>
                                                </span>

                                                <ALink href={ { pathname: router.pathname, query: { ...query, minPrice: priceRange.min, maxPrice: priceRange.max, page: 1 } } } className="pr-2" scroll={ false }>Filter</ALink>
                                            </div>

                                            <div className="price-slider">
                                                <InputRange
                                                    formatLabel={ value => `$${value}` }
                                                    maxValue={ 1000 }
                                                    minValue={ 0 }
                                                    step={ 50 }
                                                    value={ priceRange }
                                                    onChange={ onChangePriceRange }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) }
                    </SlideToggle> */}
                </div>
            </aside>
        </>
    );
}

export default React.memo( ShopSidebarOne );