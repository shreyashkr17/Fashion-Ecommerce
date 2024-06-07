import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import OwlCarousel from '~/components/features/owl-carousel';
import { actions as demoAction } from '~/store/demo';

function PostOne ( props ) {
    const { post, adClass = "", isContent = true, isAuthor = true } = props;
    const openVideoModal = ( e ) => {
        e.preventDefault();
        props.showVideo();
    }

    let date = new Date( post.date );
    let options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };

    return (
        <article className={ `entry ${adClass}` }>
            {
                post.image.length <= 1 ?
                    <figure className={ `entry-media ${post.type == 'video' ? 'entry-video' : ''}` } style={ { paddingTop: `${post.image[ 0 ].height / post.image[ 0 ].width * 100}%` } }>
                        {
                            post.type !== 'video' ?
                                <ALink href={ `/blog/single/default/${post.slug}` }>
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="Post"
                                        src={ process.env.NEXT_PUBLIC_ASSET_URI + post.image[ 0 ].url }
                                        threshold={ 500 }
                                        effect="blur"
                                        height="auto"
                                    />
                                </ALink>
                                :
                                <>
                                    <ALink href={ `/blog/single/default/${post.slug}` }>
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="Post"
                                            src={ process.env.NEXT_PUBLIC_ASSET_URI + post.image[ 0 ].url }
                                            threshold={ 500 }
                                            effect="blur"
                                            height="auto"
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
                    <figure className="entry-media" style={ { paddingTop: `${post.image[ 0 ].height / post.image[ 0 ].width * 100}%` } }>
                        <OwlCarousel adClass="owl-simple owl-light owl-nav-inside cols-1" options={ { dots: false, nav: true, responsive: { 992: { nav: true } } } }>
                            {
                                post?.image.map( ( item, index ) =>
                                    <ALink href={ `/blog/single/default/${post.slug}` } key={ index }>
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="Post"
                                            src={ `${process.env.NEXT_PUBLIC_ASSET_URI + item.url}` }
                                            threshold={ 500 }
                                            effect="blur"
                                        />
                                    </ALink>
                                )
                            }
                        </OwlCarousel>
                    </figure>
            }
            <div className="entry-body">
                <div className="entry-meta">
                    {
                        isAuthor ?
                            <>
                                <span className="entry-author">
                                    by <ALink href={ `/blog/single/default/${post.slug}` }>{ post.author }</ALink>
                                </span>
                                <span className="meta-separator">|</span>
                            </>
                            : ""
                    }
                    <ALink href={ `/blog/single/default/${post.slug}` } style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ date.toLocaleDateString( 'en-US', options ) }</ALink>
                    <span className="meta-separator" style={{fontFamily:"'Gotham Medium',sans-serif"}}>|</span>
                    <ALink href={ `/blog/single/default/${post.slug}` } style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ post.comments } Comments</ALink>
                </div>

                <h2 className="entry-title">
                    <ALink href={ `/blog/single/default/${post.slug}` }>
                        { post.title }
                    </ALink>
                </h2>

                <div className="entry-cats">
                    <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>in</span>
                    {
                        post?.blog_categories?.map( ( cat, index ) => (
                            <span key={ index }>
                                <ALink style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}} href={ { pathname: '/blog/classic', query: { category: cat.slug } } }> { cat.name }</ALink>
                                { index < post.blog_categories.length - 1 ? ', ' : '' }
                            </span>
                        ) )
                    }
                </div>
                {
                    isContent ?
                        <div className="entry-content">
                            <p>{ post.content }</p>
                            <ALink href={ `/blog/single/default/${post.slug}` } className="read-more">Continue Reading</ALink>
                        </div>
                        : ""
                }
            </div>
        </article >
    );
}

export default connect( null, { ...demoAction } )( PostOne )