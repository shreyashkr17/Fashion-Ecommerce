import { useQuery } from '@apollo/react-hooks';
import { useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import PostOne from '~/components/features/posts/post-one';

import withApollo from '~/server/apollo';
import { GET_POSTS_BY_PAGE } from '~/server/queries'

function BlogMasonry4Cols () {
    const { data, loading, error } = useQuery( GET_POSTS_BY_PAGE, { variables: { page: 'masonry-3' } } );
    const ref = useRef();
    const posts = data && data.postsByPage.data;
    let iso;

    useEffect( () => {
        if ( posts && posts.length > 0 ) {
            imagesLoaded( '.page-content' ).on( 'done', async function () {
                const Isotope = ( await import( 'isotope-layout' ) ).default;
                iso = new Isotope( ref.current, {
                    itemSelector: '.grid-item',
                } );
            } )
        }
    }, [ posts ] )

    function getPostCategory ( post ) {
        return post.blog_categories.reduce( ( acc, cur ) => {
            return acc + " " + cur.slug;
        }, "" );
    }

    function isoFilter ( e, cat ) {
        e.preventDefault();
        e.currentTarget.closest( '.menu-cat' ).querySelector( '.active' ).classList.remove( 'active' );
        e.currentTarget.parentElement.classList.add( 'active' );
        iso.arrange( {
            filter: function ( index, itemElem ) {
                if ( cat == '' ) return true;
                return itemElem.classList.contains( cat );
            }
        } );
    }

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <PageHeader title="Blog Masonry 4 Columns" subTitle="Blog" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/blog/classic">Blog</ALink>
                        </li>
                        <li className="breadcrumb-item active">Masonry 4 Columns</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className={ `container skeleton-body ${loading ? '' : 'loaded'}` }>
                    {
                        ( loading || !posts ) ?
                            <div className="row">
                                {
                                    [ 1, 2, 3, 4, 5, 6 ].map( item => (
                                        <div className="col-sm-6 col-md-4 col-lg-3" key={ item }>
                                            <div className="skel-grid-post"></div>
                                        </div>
                                    ) )
                                }
                            </div>
                            :
                            <>
                                <nav className="blog-nav">
                                    <ul className="menu-cat entry-filter justify-content-center">
                                        <li className="active">
                                            <a href="#" onClick={ e => isoFilter( e, '' ) }>
                                                All Blog Posts
                                                <span>12</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={ e => isoFilter( e, 'lifestyle' ) }>
                                                Lifestyle
                                                <span>3</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={ e => isoFilter( e, 'shopping' ) }>
                                                Shopping
                                                <span>2</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={ e => isoFilter( e, 'travel' ) }>
                                                Travel
                                                <span>6</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={ e => isoFilter( e, 'hobbies' ) }>
                                                Hobbies
                                                <span>2</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={ e => isoFilter( e, 'fashion' ) }>
                                                Fashion
                                                <span>2</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                {
                                    posts.length == 0 ?
                                        <div className="row">
                                            <p
                                                className="blogs-info"
                                            >No posts were found matching your selection.</p>
                                        </div>
                                        :
                                        <div className="row" ref={ ref }>
                                            {
                                                posts?.map( ( post, index ) => (
                                                    <div
                                                        className={ `col-sm-6 col-md-4 col-lg-3 grid-item${getPostCategory( post )}` }
                                                        key={ index }
                                                    >
                                                        <PostOne
                                                            post={ post }
                                                            adClass="text-center"
                                                        />
                                                    </div>
                                                ) )
                                            }
                                        </div>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default withApollo( { ssr: typeof window == undefined } )( BlogMasonry4Cols );