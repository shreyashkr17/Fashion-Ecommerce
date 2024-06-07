import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {toast} from "react-toastify"
import StickyBox from 'react-sticky-box';
import BlogSidebar from '~/components/partials/blog/sidebar/blog-sidebar';

function slugToTitle(slug) {
    const words = slug.split('-');
    const capitalizedWords = words?.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const title = capitalizedWords.join(' ');
    return title;
}

function SingleBlog() {
    
    const [ toggle, setToggle ] = useState( false );
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    // console.log("User", user.user.userId)
    const type = useRouter().query.type;
    // console.log(type)
    const title = slugToTitle(type);

    const [blogDetail, setBlogDetail] =  useState();
    const [content, setContent] = useState(""); 
    const [allComment, setAllComments] = useState();

    const data = {slug:type}
    const fetchBlogDetail = async () => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/posts/get-post-detail', data, {
                headers:{
                    'Content-Type':'application/json',
                    // authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                // console.log(response.data.post);
                setBlogDetail(response.data.post);
            }else{
                console.log('Failed to fetch Blog Details')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        if(type){
            fetchBlogDetail();
        }
    },[type]);

    

    const secondData = {
        slug:type,
        content:content
    }

    const addComment = async () => {
        // console.log("Data", secondData)
        try {
            const response = await axios.post('https://njs.iretiensemble.com/posts/post-comments', secondData, {
                headers:{
                    'Content-Type':'application/json',
                    authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                toast.success("Comment Added Succesfully");
            } 
        } catch(err){
            console.log("Error from client Side");
        }
    }

    const getAllComment = async () => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/posts/get-all-comments', {slug:type}, {
                headers:{
                    'Content-Type':'application/json',
                    // authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                // console.log(response.data.comments);
                setAllComments(response.data.comments);
            }
        } catch (error) {
            console.log("Error from Client Side");
        }
    }

    useEffect(()=>{
        if(type){
            getAllComment();
        }
    },[])

    
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
                    <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif", fontWeight:"800"}}>{title}</li>
                </ol>
            </div>
        </nav>
        <div className="page-content">
            <div className="container">
                <div className={ `row skeleton-body loaded` }>
                    <div className="col-lg-9">
                        <article className="entry single-entry">
                            {
                                <figure>
                                    <LazyLoadImage
                                        alt="Post"
                                        src={ blogDetail && blogDetail.image.length>0 && blogDetail.image[0]}
                                        threshold={ 500 }
                                        effect="blur"
                                    />
                                </figure>
                            }
                            <div className="entry-body">
                                <div className="entry-meta">
                                    <span className="entry-author" style={{fontFamily:"'Gotham Thin',sans-serif"}}>
                                        by <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{blogDetail && blogDetail.author}</ALink>
                                    </span>
                                    <span className="meta-separator" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>|</span>
                                    <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>
                                        {/* { ( new Date( blogDetail.date ) ).toLocaleDateString( 'en-US', options ) } */}
                                        {blogDetail && blogDetail.date}
                                    </ALink>
                                    <span className="meta-separator" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>|</span>
                                    <ALink href="#" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>
                                        {/* { blogDetail.comments } Comments */}
                                        {blogDetail && blogDetail.comments} Comments
                                    </ALink>
                                </div>
                                <h2 className="entry-title">
                                    {/* { blogDetail.title } */}
                                    {blogDetail &&  blogDetail.title}
                                </h2>

                                <div className="entry-cats">
                                    <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>in</span>
                                    {
                                        blogDetail && blogDetail.blog_categories && blogDetail.blog_categories.map( ( cat, index ) => (
                                            <span key={ index }>
                                                <ALink style={{fontFamily:"'Gotham Thin',sans-serif"}} href={""}>{ cat.name }</ALink>{ index <  blogDetail && blogDetail.blog_categories.length - 1 ? ', ' : '' }
                                            </span>
                                        ) )
                                    }
                                </div>
                                <div className="entry-content editor-content">
                                    <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>
                                        Blog Content
                                    </p>
                                    <div className="pb-1"></div>
                                    <img
                                        src={blogDetail && blogDetail.image.length>0 && blogDetail.image[0]}
                                        alt="image"
                                        className="float-sm-left"
                                    />
                                    <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>{blogDetail && blogDetail.content} </p>

                                    <div className="pb-1"></div>

                                    {blogDetail && blogDetail.image.length>1 ?blogDetail.image.map((item) => (
                                        <div className="position-relative">
                                            <div className="lazy-overlay"></div>
                                            <LazyLoadImage
                                                alt="Post"
                                                src={item}
                                                threshold={ 500 }
                                                effect="blur"
                                            />
                                        </div>
                                    )):null}
                                </div>
                                <div className="entry-footer row no-gutters flex-column flex-md-row">
                                    <div className="col-md-auto mt-2 mt-md-0">
                                        <div className="social-icons social-icons-color">
                                            <span className="social-label" style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800"}}>Share this post:</span>
                                            <ALink
                                                href="#"
                                                className="social-icon social-facebook"
                                                title="Facebook"
                                            >
                                                <i className="icon-facebook-f"></i>
                                            </ALink>
                                            <ALink
                                                href="#"
                                                className="social-icon social-twitter"
                                                title="Twitter"
                                            >
                                                <i className="icon-twitter"></i>
                                            </ALink>
                                            <ALink
                                                href="#"
                                                className="social-icon social-pinterest"
                                                title="Pinterest"
                                            >
                                                <i className="icon-pinterest"></i>
                                            </ALink>
                                            <ALink
                                                href=""
                                                className="social-icon social-linkedin"
                                                title="Linkedin"
                                            >
                                                <i className="icon-linkedin"></i>
                                            </ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        
                        <div className="comments">
                            <h3 className="title">{blogDetail && blogDetail.comments} Comments</h3>
                            <ul>
                                {allComment && allComment.length>0 ? allComment.map((item) => (
                                    <li>
                                        <div className="comment">
                                            <div className="comment-body">
                                                <div className="comment-user">
                                                    <h4>
                                                        <ALink href="#" style={{fontFamily:"'Gotham Medium',sans-serif"}}>{item.firstName} {item.lastName}</ALink>
                                                    </h4>
                                                    <span className="comment-date" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{item.date}</span>
                                                </div>
                                                <div className="comment-content">
                                                    <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>{item.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )):(
                                    <h1>No Comments</h1>
                                )}
                                {/* <li>
                                    <div className="comment">
                                        <figure className="comment-media">
                                            
                                        </figure>
                                        <div className="comment-body">
                                            <div className="comment-user">
                                                <h4>
                                                    <ALink href="#" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Jimmy Pearson</ALink>
                                                </h4>
                                                <span className="comment-date" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>November 9, 2018 at 2:19 pm</span>
                                            </div>
                                            <div className="comment-content">
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}

                                {/* <li>
                                    <div className="comment">
                                        <figure className="comment-media">
                                            <ALink href="#">
                                                <img
                                                    src="images/blog/comments/3.jpg"
                                                    alt="User name"
                                                />
                                            </ALink>
                                        </figure>
                                        <div className="comment-body">
                                            <div className="comment-user">
                                                <h4>
                                                    <ALink href="#" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Johnathan Castillo</ALink>
                                                </h4>
                                                <span className="comment-date" style={{fontFamily:"'Gotham Thin',sans-serif"}}>November 9, 2018 at 2:19 pm</span>
                                            </div>
                                            <div className="comment-content">
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                        </div>

                        <div className="reply">
                            <div className="heading">
                                <h3 className="title">Leave A Reply</h3>
                                <p className="title-desc" style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>Your email address will not be published. Required fields are marked *</p>
                            </div>
                            <form>
                                <label htmlFor="reply-message" className="sr-only">Comment</label>
                                <textarea
                                    cols="30"
                                    rows="4"
                                    id="reply-message"
                                    className="form-control"
                                    placeholder="Comment *"
                                    required
                                    value={content}
                                    onChange={(e) => {setContent(e.target.value)}}
                                    style={{fontFamily:"'Gotham Medium',sans-serif"}}
                                ></textarea>
                                

                                <button onClick={addComment} type="submit" className="btn btn-outline-primary-2">
                                    <span>POST COMMENT</span>
                                    <i className="icon-long-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <StickyBox className="sticky-content" offsetTop={ 70 }>
                            {/* <BlogSidebar /> */}
                        </StickyBox>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleBlog
