import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import PostOne from '~/components/features/posts/post-one';

import withApollo from '~/server/apollo';
import { GET_POSTS_BY_PAGE } from '~/server/queries'

function BlogGrid4Cols () {
    const [ getPosts, { data, loading, error } ] = useLazyQuery( GET_POSTS_BY_PAGE );
    const router = useRouter();
    const query = useRouter().query;
    const posts = data && data.postsByPage.data;

    useEffect( () => {
        getPosts( {
            variables: {
                page: 'grid-4',
                category: query.category
            }
        } )
    }, [ query.category ] )

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <PageHeader title="Blog Grid 4 Columns" subTitle="Blog" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/blog/classic">Blog</ALink>
                        </li>
                        <li className="breadcrumb-item active">Grid 4 Columns</li>
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
                                        <li className={ `${query.category ? '' : 'active'}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: '' } } }
                                            >
                                                All Blog Posts
                                                <span>8</span>
                                            </ALink>
                                        </li>
                                        <li className={ `${query.category == 'lifestyle' ? 'active' : ''}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: 'lifestyle' } } }
                                            >
                                                Lifestyle
                                                <span>3</span>
                                            </ALink>
                                        </li>
                                        <li className={ `${query.category == 'shopping' ? 'active' : ''}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: 'shopping' } } }
                                            >
                                                Shopping
                                                <span>1</span>
                                            </ALink>
                                        </li>
                                        <li className={ `${query.category == 'travel' ? 'active' : ''}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: 'travel' } } }
                                            >
                                                Travel
                                                <span>3</span>
                                            </ALink>
                                        </li>
                                        <li className={ `${query.category == 'hobbies' ? 'active' : ''}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: 'hobbies' } } }
                                            >
                                                Hobbies
                                                <span>2</span>
                                            </ALink>
                                        </li>
                                        <li className={ `${query.category == 'fashion' ? 'active' : ''}` }>
                                            <ALink
                                                href={ { pathname: router.pathname, query: { category: 'fashion' } } }
                                            >
                                                Fashion
                                                <span>2</span>
                                            </ALink>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="row">
                                    {
                                        posts.length == 0 ?
                                            <p
                                                className="blogs-info"
                                            >No posts were found matching your selection.</p>
                                            :
                                            posts?.map( ( post, index ) => (
                                                <div
                                                    className="col-sm-6 col-md-4 col-lg-3"
                                                    key={ index }
                                                >
                                                    <PostOne
                                                        post={ post }
                                                        adClass="text-center"
                                                        isAuthor={ false }
                                                    />
                                                </div>
                                            ) )
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default withApollo( { ssr: typeof window == undefined } )( BlogGrid4Cols );