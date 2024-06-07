import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import StickyBox from 'react-sticky-box';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import BlogSidebar from '~/components/partials/blog/sidebar/blog-sidebar';
import OwlCarousel from '~/components/features/owl-carousel';
import RelatedPosts from '~/components/partials/blog/related/related-posts';

import withApollo from '~/server/apollo';
import { GET_POST } from '~/server/queries';
import { actions as demoAction } from '~/store/demo';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import axios from 'axios';
import {useSelector} from 'react-redux';
import blog from '~/store/blog';

function BlogDefault ( props ) {
    // const user = useSelector(state => state.auth.user);
    // const token = useSelector(state => state.auth.token);
    // console.log(user.token);
    // const slug = useRouter().query.type;
    // console.log(slug)

    // // useEffect( () => {
    // //     window.addEventListener( "resize", resizeHandle );
    // //     resizeHandle();

    // //     return () => {
    // //         window.removeEventListener( "resize", resizeHandle );
    // //     }
    // // }, [] )

    // const [blogDetail, setBlogDetails] = useState({});
    // useEffect(() => {
    //     const data = {slug:slug}
    //     const fetchSingleblog = async () => {
    //         const res = await axios.post('https://njs.iretiensemble.com/posts/get-post-detail', data, {
    //             headers:{
    //                 'Content-Type':'application/json',
    //                 authorization: `Bearer ${token}`
    //             }
    //         });

    //         if(res.status === 201 || res.status === 200){
    //             console.log(res.data);
    //             setBlogDetails(res.data.post);
    //         }
    //     }

    //     fetchSingleblog();
    // },[])

    // // const formattedSlug = slug.split( '-' ).join( ' ' );
    // // console.log(formattedSlug)
    // const { data, loading, error } = useQuery( GET_POST, { variables: { slug } } );
    // const [ toggle, setToggle ] = useState( false );
    // const post = data && data.post.single;
    // const categories = data && data.post.categories;
    // const related = data && data.post.related;
    // const prev = data && data.post.prev;
    // const next = data && data.post.next;
    // const options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };
    

    // // const openVideoModal = ( e ) => {
    // //     e.preventDefault();
    // //     props.showVideo();
    // // }

    // function resizeHandle () {
    //     if ( document.querySelector( "body" ).offsetWidth < 992 )
    //         setToggle( true );
    //     else
    //         setToggle( false );
    // }

    // function toggleSidebar () {
    //     if (
    //         document
    //             .querySelector( 'body' )
    //             .classList.contains( 'sidebar-filter-active' )
    //     ) {
    //         document
    //             .querySelector( 'body' )
    //             .classList.remove( 'sidebar-filter-active' );
    //     } else {
    //         document
    //             .querySelector( 'body' )
    //             .classList.add( 'sidebar-filter-active' );
    //     }
    // }

    // function hideSidebar () {
    //     document
    //         .querySelector( 'body' )
    //         .classList.remove( 'sidebar-filter-active' );
    // }

    // if ( error ) {
    //     return <div></div>
    // }

    

    // // console.log(blogDetail)
    // return (
    //     <div className="main" style={{background:"#f8f7f3"}}>
    //         hello world
    //         <PageHeader title="Default With Sidebar" subTitle="Single Post" />
    //         <nav className="breadcrumb-nav">
    //             <div className="container">
    //                 <ol className="breadcrumb">
    //                     <li className="breadcrumb-item">
    //                         <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
    //                     </li>
    //                     <li className="breadcrumb-item">
    //                         <ALink href="/blog/listing" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Blog</ALink>
    //                     </li>
    //                     <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif", fontWeight:"800"}}>Hello</li>
    //                 </ol>
    //             </div>
    //         </nav>
    //         <div className="page-content">
    //             <div className="container">
    //                 <div className={ `row skeleton-body ${!loading ? 'loaded' : ''}` }>
    //                     <div className="col-lg-9">
    //                         {
    //                             loading ?
    //                                 <div className="skel-single-post"></div>
    //                                 :
    //                                 <>
    //                                     <article className="entry single-entry">
    //                                         {
    //                                             blogDetail.image.length <= 1 ?
    //                                                 <figure className={ `entry-media ${blogDetail.type == 'video' ? 'entry-video' : ''}` } >
    //                                                     {/* {
    //                                                         blogDetail.type !== 'video' ?
    //                                                             <LazyLoadImage
    //                                                                 alt="Post"
    //                                                                 src={ blogDetail.image[ 0 ] }
    //                                                                 threshold={ 500 }
    //                                                                 effect="blur"
    //                                                             />
    //                                                             :
    //                                                             <>
    //                                                                 <LazyLoadImage
    //                                                                     alt="Post"
    //                                                                     src={ blogDetail.image[ 0 ] }
    //                                                                     threshold={ 500 }
    //                                                                     effect="blur"
    //                                                                 />
    //                                                                 <a
    //                                                                     href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
    //                                                                     // onClick={ openVideoModal }
    //                                                                     className="btn-video btn-iframe"
    //                                                                 ><i className="icon-play"></i></a>
    //                                                             </>
    //                                                     } */}
    //                                                 </figure>
    //                                                 :
    //                                                 <figure className="entry-media" style={ { paddingTop: `${post.image[ 0 ].height / post.image[ 0 ].width * 100}%` } }>
    //                                                     {/* <OwlCarousel adClass="owl-simple owl-light owl-nav-inside cols-1" options={ { dots: false, nav: true, responsive: { 992: { nav: true } } } }>
    //                                                         {
    //                                                             blogDetail.image.map( ( item, index ) =>
    //                                                                 <div key={ index }>
    //                                                                     <div className="lazy-overlay"></div>

    //                                                                     <LazyLoadImage
    //                                                                         alt="Post"
    //                                                                         src={ `${item}` }
    //                                                                         threshold={ 500 }
    //                                                                         effect="blur"
    //                                                                     />
    //                                                                 </div>
    //                                                             )
    //                                                         }
    //                                                     </OwlCarousel> */}
    //                                                 </figure>

    //                                         }

    //                                         <div className="entry-body">
    //                                             <div className="entry-meta">
    //                                                 <span className="entry-author" style={{fontFamily:"'Gotham Thin',sans-serif"}}>
    //                                                     by <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{ blogDetail.author }</ALink>
    //                                                 </span>
    //                                                 <span className="meta-separator" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>|</span>
    //                                                 <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{ ( new Date( blogDetail.date ) ).toLocaleDateString( 'en-US', options ) }</ALink>
    //                                                 <span className="meta-separator">|</span>
    //                                                 <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{ blogDetail.comments } Comments</ALink>
    //                                             </div>

    //                                             <h2 className="entry-title">
    //                                                 {/* { blogDetail.title } */}
    //                                             </h2>

    //                                             <div className="entry-cats">
    //                                                 <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>in</span>
    //                                                 {
    //                                                     blogDetail.blog_categories.map( ( cat, index ) => (
    //                                                         <span key={ index }>
    //                                                             <ALink style={{fontFamily:"'Gotham Thin',sans-serif"}} href={ { pathname: '/blog/classic', query: { category: cat.slug } } }> { cat.name }</ALink>
    //                                                             { index < blogDetail.blog_categories.length - 1 ? ', ' : '' }
    //                                                         </span>
    //                                                     ) )
    //                                                 }
    //                                             </div>

    //                                             <div className="entry-content editor-content">
    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>{ blogDetail.content }</p>

    //                                                 <div className="pb-1"></div>

    //                                                 <img
    //                                                     src="images/blog/single/2.jpg"
    //                                                     alt="image"
    //                                                     className="float-sm-left"
    //                                                 />

    //                                                 <h3>Quisque volutpat mattiseros.</h3>

    //                                                 <ul style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>
    //                                                     <li>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</li>
    //                                                     <li>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.</li>
    //                                                     <li>Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</li>
    //                                                 </ul>

    //                                                 <div className="pb-1 clearfix"></div>

    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>
    //                                                     Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
    //                                                     <ALink href="#"> sollicitudin laoreet</ALink> viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
    //                                                 </p>
    //                                                 <blockquote>
    //                                                     <p style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.6rem"}}>“ Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. ”</p>
    //                                                 </blockquote>

    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.</p>

    //                                                 <div className="pb-1"></div>

    //                                                 <h3>Morbi interdum mollis sapien.</h3>

    //                                                 <div className="position-relative">
    //                                                     <div className="lazy-overlay"></div>

    //                                                     <LazyLoadImage
    //                                                         alt="Post"
    //                                                         src="images/blog/single/3.jpg"
    //                                                         threshold={ 500 }
    //                                                         effect="blur"
    //                                                     />
    //                                                 </div>

    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>
    //                                                     Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent <ALink href="#">elementum hendrerit</ALink> tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
    //                                                 </p>
    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl. Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan quis, faucibus non, congue vel, arcu.</p>
    //                                             </div>
    //                                             <div className="entry-footer row no-gutters flex-column flex-md-row">
    //                                                 <div className="col-md">
    //                                                     <div className="entry-tags">
    //                                                         <span style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800"}}>Tags:</span>
    //                                                         <ALink href="#" style={{background:"#323C33"}}>photography</ALink>
    //                                                         <ALink href="#" style={{background:"#323C33"}}>style</ALink>
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-md-auto mt-2 mt-md-0">
    //                                                     <div className="social-icons social-icons-color">
    //                                                         <span className="social-label" style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800"}}>Share this post:</span>
    //                                                         <ALink
    //                                                             href="#"
    //                                                             className="social-icon social-facebook"
    //                                                             title="Facebook"
    //                                                         >
    //                                                             <i className="icon-facebook-f"></i>
    //                                                         </ALink>
    //                                                         <ALink
    //                                                             href="#"
    //                                                             className="social-icon social-twitter"
    //                                                             title="Twitter"
    //                                                         >
    //                                                             <i className="icon-twitter"></i>
    //                                                         </ALink>
    //                                                         <ALink
    //                                                             href="#"
    //                                                             className="social-icon social-pinterest"
    //                                                             title="Pinterest"
    //                                                         >
    //                                                             <i className="icon-pinterest"></i>
    //                                                         </ALink>
    //                                                         <ALink
    //                                                             href="#"
    //                                                             className="social-icon social-linkedin"
    //                                                             title="Linkedin"
    //                                                         >
    //                                                             <i className="icon-linkedin"></i>
    //                                                         </ALink>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>

    //                                         <div className="entry-author-details" style={{background:"white"}}>
    //                                             <figure className="author-media">
    //                                                 <ALink href="#">
    //                                                     <img
    //                                                         src="images/blog/single/author.jpg"
    //                                                         alt="User name"
    //                                                     />
    //                                                 </ALink>
    //                                             </figure>

    //                                             <div className="author-body">
    //                                                 <div
    //                                                     className="author-header row no-gutters flex-column flex-md-row"
    //                                                 >
    //                                                     <div className="col">
    //                                                         <h4>
    //                                                             <ALink href="#">John Doe</ALink>
    //                                                         </h4>
    //                                                     </div>

    //                                                     <div className="col-auto mt-1 mt-md-0">
    //                                                         <ALink href="#" className="author-link" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>
    //                                                             View all posts by John Doe
    //                                                         <i
    //                                                                 className="icon-long-arrow-right"
    //                                                             ></i>
    //                                                         </ALink>
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="author-content">
    //                                                     <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.4rem"}}>Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat.</p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </article>

    //                                     <nav className="pager-nav">
    //                                         {
    //                                             prev ?
    //                                                 <ALink
    //                                                     className="pager-link pager-link-prev"
    //                                                     href={ `/blog/single/default/${prev.slug}` }
    //                                                 >
    //                                                     Previous Post
    //                                                 <span className="pager-link-title">{ prev.title }</span>
    //                                                 </ALink>
    //                                                 :
    //                                                 <ALink href="#" className="pager-link">
    //                                                     <span className="page-link-title ml-4" style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800"}}>This is the first blog.</span>
    //                                                 </ALink>
    //                                         }
    //                                         {
    //                                             next ?
    //                                                 <ALink
    //                                                     className="pager-link pager-link-next"
    //                                                     href={ `/blog/single/default/${next.slug}` }
    //                                                 >
    //                                                     Next Post
    //                                                 <span className="pager-link-title">{ next.title }</span>
    //                                                 </ALink>
    //                                                 :
    //                                                 <ALink href="#" className="pager-link">
    //                                                     <span className="page-link-title mr-4">This is the last blog.</span>
    //                                                 </ALink>

    //                                         }
    //                                     </nav>
    //                                 </>
    //                         }

    //                         {/* <RelatedPosts related={ related } loading={ loading } /> */}

    //                         <div className="comments">
    //                             <h3 className="title">3 Comments</h3>

    //                             <ul>
    //                                 <li>
    //                                     <div className="comment">
    //                                         <figure className="comment-media">
    //                                             <ALink href="#">
    //                                                 <img
    //                                                     src="images/blog/comments/1.jpg"
    //                                                     alt="User name"
    //                                                 />
    //                                             </ALink>
    //                                         </figure>

    //                                         <div className="comment-body">
    //                                             {/* <ALink href="#" className="comment-reply">Reply</ALink> */}
    //                                             <div className="comment-user">
    //                                                 <h4>
    //                                                     <ALink href="#" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Jimmy Pearson</ALink>
    //                                                 </h4>
    //                                                 <span className="comment-date" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>November 9, 2018 at 2:19 pm</span>
    //                                             </div>

    //                                             <div className="comment-content">
    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </li>

    //                                 <li>
    //                                     <div className="comment">
    //                                         <figure className="comment-media">
    //                                             <ALink href="#">
    //                                                 <img
    //                                                     src="images/blog/comments/3.jpg"
    //                                                     alt="User name"
    //                                                 />
    //                                             </ALink>
    //                                         </figure>

    //                                         <div className="comment-body">
    //                                             {/* <ALink href="#" className="comment-reply">Reply</ALink> */}
    //                                             <div className="comment-user">
    //                                                 <h4>
    //                                                     <ALink href="#" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Johnathan Castillo</ALink>
    //                                                 </h4>
    //                                                 <span className="comment-date" style={{fontFamily:"'Gotham Thin',sans-serif"}}>November 9, 2018 at 2:19 pm</span>
    //                                             </div>

    //                                             <div className="comment-content">
    //                                                 <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </li>
    //                             </ul>
    //                         </div>

    //                         <div className="reply">
    //                             <div className="heading">
    //                                 <h3 className="title">Leave A Reply</h3>

    //                                 <p className="title-desc" style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>Your email address will not be published. Required fields are marked *</p>
    //                             </div>

    //                             <form action="#">
    //                                 <label htmlFor="reply-message" className="sr-only">Comment</label>
    //                                 <textarea
    //                                     name="reply-message"
    //                                     id="reply-message"
    //                                     cols="30"
    //                                     rows="4"
    //                                     className="form-control"
    //                                     required
    //                                     placeholder="Comment *"
    //                                     style={{fontFamily:"'Gotham Medium',sans-serif"}}
    //                                 ></textarea>

    //                                 <div className="row">
    //                                     <div className="col-md-6">
    //                                         <label htmlFor="reply-name" className="sr-only">Name</label>
    //                                         <input
    //                                             type="text"
    //                                             className="form-control"
    //                                             id="reply-name"
    //                                             name="reply-name"
    //                                             required
    //                                             placeholder="Name *"
    //                                             style={{fontFamily:"'Gotham Medium',sans-serif"}}
    //                                         />
    //                                     </div>

    //                                     <div className="col-md-6">
    //                                         <label htmlFor="reply-email" className="sr-only">Email</label>
    //                                         <input
    //                                             type="email"
    //                                             className="form-control"
    //                                             id="reply-email"
    //                                             name="reply-email"
    //                                             required
    //                                             placeholder="Email *"
    //                                         />
    //                                     </div>
    //                                 </div>

    //                                 <button type="submit" className="btn btn-outline-primary-2">
    //                                     <span>POST COMMENT</span>
    //                                     <i className="icon-long-arrow-right"></i>
    //                                 </button>
    //                             </form>
    //                         </div>
    //                     </div>
    //                     {/* <div className="col-lg-3">
    //                         <StickyBox className="sticky-content" offsetTop={ 70 }>
    //                             <BlogSidebar categories={ categories } toggle={ toggle } />
    //                             {
    //                                 toggle ?
    //                                     <button className="sidebar-fixed-toggler right" onClick={ toggleSidebar }>
    //                                         <i className="icon-cog"></i>
    //                                     </button>
    //                                     : ''
    //                             }
    //                             <div className="sidebar-filter-overlay" onClick={ hideSidebar }></div>
    //                         </StickyBox>
    //                     </div> */}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    const user = useSelector(state => state.auth.user);
    const slug = useRouter().query.type;
    // console.log(user);
    // console.log(slug)

    const [blogDetail, setBlogDetails] = useState({});

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const data = {slug:slug}
            try {
                const response = await axios.post('https://njs.iretiensemble.com/posts/get-post-detail', data, {
                    headers:{
                        'Content-Type':'application/json',
                        // authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200 || response.status === 201){
                    // console.log(response.data.post);
                    setBlogDetails(response.data.post);
                }else{
                    console.log('Failed to fetch Blog Details')
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchBlogDetail();
    },[]);
    return (
        <div className="main" style={{background:"#f8f7f3"}}>
            <nav className="breadcrumb-nav">
                 <div className="container">
                     <ol className="breadcrumb">
                         <li className="breadcrumb-item">
                             <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                         </li>
                         <li className="breadcrumb-item">
                             <ALink href="/blog/listing" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Blog</ALink>
                         </li>
                         <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif", fontWeight:"800"}}>{blogDetail.title}</li>
                     </ol>
                 </div>
             </nav>
             <div className="page-content">
                <div className="container">
                    <div>
                        <div className="col-lg-9">
                            <article className="entry single-entry">
                                {
                                  blogDetail && blogDetail.image && blogDetail.image.length <= 1?
                                        <figure className={ `entry-media ${blogDetail.type == 'video' ? 'entry-video' : ''}`}>
                                            { 
                                                blogDetail.type !== 'video' ?
                                                    <LazyLoadImage
                                                        alt="Post"
                                                        src={ blogDetail.image[ 0 ] }
                                                        threshold={ 500 }
                                                        effect="blur"
                                                    />
                                                    :
                                                    <>
                                                        <LazyLoadImage
                                                            alt="Post"
                                                            src={ blogDetail.image[ 0 ] }
                                                            threshold={ 500 }
                                                            effect="blur"
                                                        />
                                                        <a
                                                            href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                                                            // onClick={ openVideoModal }
                                                            className="btn-video btn-iframe"
                                                        ><i className="icon-play"></i></a>
                                                    </>
                                            } 
                                        </figure>
                                        :
                                        <figure 
                                            className="entry-media" 
                                            // style={ { paddingTop: `${post.image[ 0 ].height / post.image[ 0 ].width * 100}%` } }
                                        >
                                            {
                                              blogDetail && blogDetail.image && blogDetail?.image.map( ( item, index ) =>
                                                    <div key={ index }>
                                                        <div className="lazy-overlay"></div>

                                                        <LazyLoadImage
                                                            alt="Post"
                                                            src={ `${item}` }
                                                            threshold={ 500 }
                                                            effect="blur"
                                                        />
                                                    </div>
                                                )}
                                        </figure>
                                }
                            </article>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}

export default withApollo( { ssr: typeof window == undefined } )( connect( null, { ...demoAction } )( BlogDefault ) );