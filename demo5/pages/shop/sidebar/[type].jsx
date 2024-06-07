import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import StickyBox from 'react-sticky-box';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import ShopListOne from '~/components/partials/shop/list/shop-list-one';
import Pagination from '~/components/features/pagination';
import ShopSidebarOne from '~/components/partials/shop/sidebar/shop-sidebar-one';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';
import { scrollToPageContent } from '~/utils';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {actions as productallActions} from '~/store/productdetailall';
import product from '~/store/product';
import { actions as singleProductActions } from "~/store/singleProduct";
import { actions as relatedProductActions } from "~/store/related-product";

function ShopGrid() {
    const dispatch = useDispatch();
    const router = useRouter();
    const type = router.query.type;
    const category = router.query.category;
    const sortBy = router.query.sortBy;
    const user = useSelector( ( state ) => state.auth.user );
    // const token = useSelector( ( state ) => state.auth.token );
    // console.log(user);
    // console.log(category);
    const query = router.query;
    // console.log(qu)
    const [ getProducts, { data, loading, error } ] = useLazyQuery( GET_PRODUCTS );
    const [ firstLoading, setFirstLoading ] = useState( false );
    const [ perPage, setPerPage ] = useState( 5 );
    const [ pageTitle, setPageTitle ] = useState( 'List' );
    const [ toggle, setToggle ] = useState( false );
    const products = data && data.products.data;
    // const totalCount = data && data.products.totalCount;

    const selectedSizes = query.size ? query.size.split(','):[]
    // console.log(selectedSizes)

    // const [getAllProducts, setAllProduct] = useState();
    const getAllProducts = useSelector(state => state.productalldetail.products)
    

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('https://njs.iretiensemble.com/products/get-all-products-variant-lgPics-smPics', {
                headers:{
                    'Content-Type':'application/json',
                    // authorization: `Bearer ${user.token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                dispatch(productallActions.setProducts(response.data.fetchedData))
            }else{
                // console.log(response.data);
                dispatch(productallActions.fetchProductsAllSuccess([]))
            }
        } catch (error) {
            throw new error(error);
            dispatch(productallActions.fetchProductsAllSuccess([]))
        }
    }

    useEffect(() => {
        fetchAllProducts();
    },[])

    // console.log("get",getAllProducts);
    const filteredProducts = getAllProducts?.filter(product => {
        return product?.products.productCategory?.some(cat => cat.name === category) || product?.products.productOccasion?.some(cat => cat.name === category) || product?.products.productMaterial?.some(cat => cat.name === category);
    });
    // console.log(filteredProducts)
    

    useEffect( () => {
        window.addEventListener( "resize", resizeHandle );
        resizeHandle();
        return () => {
            window.removeEventListener( "resize", resizeHandle );
        }
    }, [] )

    function resizeHandle() {
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
                list: true
            }
        } );

        scrollToPageContent();
    }, [ query, perPage ] )

    useEffect( () => {
        if ( products ) setFirstLoading( true );
    }, [ products ] )

    useEffect( () => {
        if ( type == 'list' ) {
            setPageTitle( 'List' );
            setPerPage( 5 );
        } else if ( type == '2cols' ) {
            setPageTitle( 'Grid 2 Columns' );
            setPerPage( 6 );
        } else if ( type == '3cols' ) {
            setPageTitle( 'Grid 3 Columns' );
            setPerPage( 9 );
        } else if ( type == '4cols' ) {
            setPageTitle( 'Grid 4 Columns' );
            setPerPage( 12 );
        }
    }, [ type ] );

    useEffect(() => {
        dispatch(singleProductActions.setSingleProduct(null));
        dispatch(relatedProductActions.setRelatedProducts([]));
    },[])

    function onSortByChange( e ) {
        const sortBy = e.target.value;
        const query = {...router.query}
        query.sortBy = sortBy!=='default'?sortBy:undefined;

        router.push({pathname:router.pathname, query})
    }

    let sortedProducts;

    if(category && category.length>0 && sortBy && sortBy !== 'default' && filteredProducts && filteredProducts.length>0){
        sortedProducts = [...filteredProducts]
        if(sortBy === 'featured'){
            sortedProducts = sortedProducts.filter(product => product.products.producFeatured)
        }else{
            if(sortBy === 'pricelowhigh'){
                sortedProducts.sort((a, b) => {
                    const priceA = a.products.productSalePrice || a.products.productPrice;
                    const priceB = b.products.productSalePrice || b.products.productPrice;
                    return priceA - priceB;
                });
            }else if(sortBy === 'pricehighlow'){
                sortedProducts.sort((a, b) => {
                    const priceA = a.products.productSalePrice || a.products.productPrice;
                    const priceB = b.products.productSalePrice || b.products.productPrice;
                    return priceB - priceA;
                });
            }

            // console.log('Sorted Products:', sortedProducts);
        }
    }else if(!category && sortBy && sortBy !== 'default' && getAllProducts && getAllProducts.length>0){
        sortedProducts = [...getAllProducts]
        if(sortBy === 'featured'){
            sortedProducts = sortedProducts.filter(product => product.products.producFeatured)
        }else{
            if(sortBy === 'pricelowhigh'){
                sortedProducts.sort((a, b) => {
                    const priceA = a.products.productSalePrice || a.products.productPrice;
                    const priceB = b.products.productSalePrice || b.products.productPrice;
                    return priceA - priceB;
                });
            }else if(sortBy === 'pricehighlow'){
                sortedProducts.sort((a, b) => {
                    const priceA = a.products.productSalePrice || a.products.productPrice;
                    const priceB = b.products.productSalePrice || b.products.productPrice;
                    return priceB - priceA;
                });
            }
        }

        // console.log('Sorted Products:', sortedProducts);
    }

    const filteredSizeProducts = getAllProducts?.flatMap(product => {
        const uniqueProductIds = new Set();

        const filteredVariants = product.variantsData.filter(variant => {
            return variant?.variants.size.some(size => selectedSizes.includes(size.slug));
        });
        const uniqueProducts = filteredVariants?.map(filteredVariant => {
            if (!uniqueProductIds.has(product.products.productId)) {
                uniqueProductIds.add(product.products.productId);
                return { ...product };
            }
            return null;
        });

        return uniqueProducts.filter(product => product !== null);
    })
    // }else if(!category )
    // console.log(filteredSizeProducts)
    

    let showProduct, totalCount;

    if(sortBy && sortBy !== 'default' && sortedProducts && sortedProducts.length>0){
        // console.log('SortBy Selected')
        showProduct = sortedProducts;
        totalCount = sortedProducts.length
        // console.log('SortBy After Selected')
    }else if(category && category.length>0 && filteredProducts && filteredProducts.length>0){
        // console.log('Category Selected')
        showProduct = filteredProducts;
        totalCount = filteredProducts.length
        // console.log('Category After Selected')
    }else if(selectedSizes && selectedSizes.length>0 && filteredSizeProducts && filteredSizeProducts.length>0){
        // console.log('SelectedSize Selected')
        showProduct = filteredSizeProducts;
        totalCount = filteredSizeProducts.length
        // console.log('SelectedSize After Selected')
    }else {
        // console.log('GetAllProduct Selected')
        showProduct = getAllProducts;
        totalCount = getAllProducts.length
        // console.log('GetAllProduct After Selected')
    }

    function toggleSidebar() {
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

    function hideSidebar() {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );
    }

    if ( error ) {
        return <div></div>
    }

    

    return (
        <main className="main shop" style={{background:"#f8f7f3"}}>
            <PageHeader title={ pageTitle } subTitle="Shop" />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/"  style={{fontFamily:"'Gotham Light',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/3cols"  style={{fontFamily:"'Gotham Light',sans-serif",fontWeight:"800"}}>Shops</ALink>
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row skeleton-body">
                        <div className={ `col-lg-9 skel-shop-products ${ !loading ? 'loaded' : '' }` }>
                            <div className="toolbox">
                                <div className="toolbox-left">
                                    {
                                        !loading && products ?
                                            <div className="toolbox-info" style={{fontFamily:"'Gotham Light',sans-serif"}}>
                                                Showing Products
                                            </div>
                                            : ""
                                    }
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby" style={{fontFamily:"'Gotham Light',sans-serif"}}>Sort by:</label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control"
                                                onChange={ onSortByChange }
                                                value={ router.query.sortBy ? router.query.sortBy: 'default' }
                                                style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.3rem"}}
                                            >
                                                <option value="default" style={{fontFamily:"'Gotham Light',sans-serif"}}>Default</option>
                                                <option value="featured" style={{fontFamily:"'Gotham Light',sans-serif"}}>Featured</option>
                                                <option value="pricelowhigh" style={{fontFamily:"'Gotham Light',sans-serif"}}>Price: Low To High</option>
                                                <option value="pricehighlow" style={{fontFamily:"'Gotham Light',sans-serif"}}>Price: High To Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <ShopListOne products={ showProduct } perPage={ perPage } loading={ loading }></ShopListOne>

                            {
                                totalCount > perPage ?
                                    <Pagination perPage={ perPage } total={ totalCount }></Pagination>
                                    : ""
                            }
                        </div >

                        <aside className={ `col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${ ( !loading || firstLoading ) ? 'loaded' : '' }` }>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <StickyBox className="sticky-content" offsetTop={ 70 }>
                                <ShopSidebarOne toggle={ toggle }></ShopSidebarOne>
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

export default withApollo( { ssr: typeof window == 'undefined' } )( ShopGrid );