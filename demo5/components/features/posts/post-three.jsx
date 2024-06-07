import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import OwlCarousel from '~/components/features/owl-carousel';
import { actions as demoAction } from '~/store/demo';

function PostThree ( props ) {
    const { post, adClass = "" } = props;
    const openVideoModal = ( e ) => {
        e.preventDefault();
        props.showVideo();
    }

    let date = new Date( post.date );
    let options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };

    return (
        <article className={ `entry entry-mask ${adClass}` }>
            {
                post.image.length <= 1 ?
                    <figure className="entry-media" style={ { paddingTop: `${post.image[ 0 ].height / post.image[ 0 ].width * 100}%` } }>

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
                    <ALink href={ `/blog/single/default/${post.slug}` }>{ date.toLocaleDateString( 'en-US', options ) }</ALink>
                    <span className="meta-separator">|</span>
                    <ALink href={ `/blog/single/default/${post.slug}` }>{ post.comments } Comments</ALink>
                </div>

                <h2 className="entry-title">
                    <ALink href={ `/blog/single/default/${post.slug}` }>
                        { post.title }
                    </ALink>
                </h2>

                <div className="entry-cats">
                    in&nbsp;
                            { post.blog_categories.map( ( cat, index ) => (
                    <span key={ index }>
                        <ALink href={ { pathname: '/blog/classic', query: { category: cat.slug } } }>{ cat.name }</ALink>
                        { index < post.blog_categories.length - 1 ? ', ' : '' }
                    </span>
                ) ) }
                </div>
            </div>
        </article >
    );
}

export default connect( null, { ...demoAction } )( PostThree )