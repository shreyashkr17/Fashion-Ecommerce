import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';

import { actions as demoAction } from '~/store/demo';

function PostTwo ( props ) {
    
    const router = useRouter();
    const { blog, imageSize = 4 } = props;
    // console.log(blog.image.length)
    const openVideoModal = ( e ) => {
        e.preventDefault();
        props.showVideo();
    }
    let date = new Date( blog.date );
    let options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };

    return (
        <article className="entry entry-list">
            <div className="row align-items-center">
                {/* <div className={ `col-md-${imageSize}` }>
                    {
                        blog.image.length <= 1 ?
                            <figure className={ `entry-media ${blog.type == 'video' ? 'entry-video' : ''}` } >
                                {
                                    blog.type !== 'video' ?
                                        <ALink href={ `/pages/singleblog/${blog.slug}` }>
                                            <div className="lazy-overlay">

                                            <LazyLoadImage
                                                alt="Post"
                                                src={blog?.image[0]}
                                                threshold={ 500 }
                                            />
                                            </div>
                                        </ALink>
                                        :
                                        <>
                                            <ALink href={ `/pages/singleblog/${blog.slug}` }>
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    alt="Post"
                                                    src={blog && blog.image.length>0 ? blog.image[0]:""}
                                                    threshold={ 500 }
                                                />
                                            </ALink>
                                            <a
                                                href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                                                onClick={ openVideoModal }
                                                className="btn-video btn-iframe"
                                            ><i className="icon-play"></i></a>
                                        </>
                                }
                            </figure>
                            :
                            <figure className="entry-media" >
                                <OwlCarousel adClass="owl-simple owl-light owl-nav-inside cols-1" options={ { dots: false, nav: true, responsive: { 992: { nav: true } } } }>
                                    {
                                        blog && blog.image && blog.image.map( ( item, index ) =>
                                            <ALink href={ `/pages/singleblog/${blog.slug}` } key={ index }>
                                                <div className="lazy-overlay"></div>
                                                <LazyLoadImage
                                                    alt="Post"
                                                    src={ item }
                                                    threshold={ 500 }
                                                    effect="blur"
                                                />
                                            </ALink>
                                        )
                                    }
                                </OwlCarousel>
                            </figure>

                    }
                </div> */}

                <div className={ `col-md-${16 - imageSize}` }>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span className="entry-author" style={{fontFamily:"'Gotham Medium',sans-serif"}}>
                                by <ALink href="">{ blog.author }</ALink>
                            </span>
                            <span className="meta-separator" style={{fontFamily:"'Gotham Medium',sans-serif"}}>|</span>
                            <ALink href="" style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ blog.date}</ALink>
                            <span className="meta-separator">|</span>
                            <ALink href="" style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ blog.comments } Comments</ALink>
                        </div>

                        <h2 className="entry-title">
                            <ALink href={ `/pages/singleblog/${blog.slug}` }>
                                { blog.title }
                            </ALink>
                        </h2>

                        <div className="entry-cats">
                            <span style={{fontFamily:"'Gotham Medium',sans-serif", color:"#14151A"}}>in</span>
                            { blog?.blog_categories.map( ( cat, index ) => (
                            <span key={ index }>
                                <ALink style={{fontFamily:"'Gotham Thin',sans-serif"}} href={ { pathname: '/blog/classic', query: { category: cat.slug } } }> { cat.name }</ALink>
                                <span style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ index < blog.blog_categories.length - 1 ? ', ' : '' }</span>
                            </span>
                        ) ) }
                        </div>

                        <div className="entry-content">
                            <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>{blog.content.split(' ').slice(0, 30).join(' ')}...</p>
                            <ALink href={ `/pages/singleblog/${blog.slug}` } style={{fontFamily:"'Gotham Medium',sans-serif"}} className="read-more">Continue Reading</ALink>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    );
}


export default connect( null, demoAction )( PostTwo );