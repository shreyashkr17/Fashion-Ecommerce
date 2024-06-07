import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import PostTwo from '~/components/features/posts/post-two';
import BlogSidebar from '~/components/partials/blog/sidebar/blog-sidebar';

import withApollo from '~/server/apollo';
import { GET_POSTS_BY_PAGE } from '~/server/queries'
import { scrollToPageContent } from '~/utils';

import { useDispatch } from 'react-redux';
import blog, { actions as blogActions } from '~/store/blog';
import axios from 'axios';
import { useSelector } from 'react-redux';

function BlogListing () {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const blogs = useSelector(state => state.blog.blogDetails);
    // console.log(blogs)
    // console.log(user);
    const router = useRouter();
    const dispatch = useDispatch();
    const [ getPosts, { data, loading, error } ] = useLazyQuery( GET_POSTS_BY_PAGE );
    const [ toggle, setToggle ] = useState( false );
    const posts = data && data.postsByPage.data;
    const categories = data && data.postsByPage.categories;


    useEffect( () => {
        getPosts( {
            variables: {
                page: 'listing',
                category: router.query.category
            }
        } );

        scrollToPageContent();
    }, [ router.query ] )

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


    useEffect(() => {
        const fetchBlogs = async() => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/posts/get-all-posts', {
                    headers:{
                        'Content-Type': 'application/json',
                        // authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200 || response.status === 201){
                    // console.log(response.data)
                    dispatch(blogActions.setBlogDetails(response.data.posts));
                }else{
                    // console.log('error');
                    dispatch(blogActions.setBlogDetails([]))
                }
            } catch (error) {
                console.log(error);
                dispatch(blogActions.setBlogDetails([]))
            }
        }

        fetchBlogs();
    },[])

    return (
        <div className="main" style={{background:"#f8f7f3"}}>
            <PageHeader title="Blog Listing" subTitle="Blog" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/"  style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/blog/listing"  style={{fontFamily:"'Gotham Thin',sans-serif"}}>Blog</ALink>
                        </li>
                        <li className="breadcrumb-item active"  style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Blog Lists</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <div className="row skeleton-body">
                        <div className="col-lg-12">
                            {
                                ( loading || !posts ) ?
                                    [ 1, 2, 3, 4, 5, 6 ].map( ( item ) => (
                                        <div className="skel-list-post mb-6" key={ item }></div>
                                    ) )
                                    :
                                    blogs && blogs.length == 0 ?
                                        <div style={{width:"auto", height:"100vh"}}>
                                            <p className="blogs-info">
                                                No posts were found matching your selection.
                                            </p>
                                        </div>
                                        
                                        :
                                        blogs?.map( ( blog, index ) => (
                                            <PostTwo blog={ blog } key={ index } imageSize={ 5 }></PostTwo>
                                        ) )
                            }
                        </div>
                        <div className={ `col-lg-3 skel-shop-sidebar skeleton-body ${!loading ? 'loaded' : ''}` }>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <StickyBox className="sticky-content" offsetTop={ 70 }>
                                {/* <BlogSidebar categories={ categories } toggle={ toggle } /> */}
                                {
                                    toggle ?
                                        <button className="sidebar-fixed-toggler right" onClick={ toggleSidebar }>
                                            <i className="icon-cog"></i>
                                        </button>
                                        : ''
                                }
                                <div className="sidebar-filter-overlay" onClick={ hideSidebar }></div>
                            </StickyBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo( { ssr: typeof window == 'undefined' } )( BlogListing );