import { useQuery } from '@apollo/react-hooks';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';
import PostOne from '~/components/features/posts/post-one';
import PostTwo from '~/components/features/posts/post-two';
import PostThree from '~/components/features/posts/post-three';

import withApollo from '~/server/apollo';
import { GET_ELEMENT_POSTS } from '~/server/queries';

function BlogPosts () {
    const { data, loading, error } = useQuery( GET_ELEMENT_POSTS );
    const posts = data && data.elementPosts;

    if ( error ) {
        return ( <div>{ error }</div> )
    }

    return (
        <div className="main">
            <PageHeader title="Blog Posts" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Blog Posts</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container skeleton-body">
                    <h2 className="title text-center mb-2">Classic</h2>

                    {
                        loading ?
                            <>
                                <div className="skel-list-post mb-6"></div>
                                <div className="skel-list-post"></div>
                            </>
                            :
                            <>
                                <PostTwo post={ posts[ 0 ] } />
                                <PostTwo post={ posts[ 1 ] } />
                            </>
                    }

                    <hr className="mb-5" />

                    <h2 className="title text-center mb-2">Grid 2 Columns</h2>

                    <div className="row max-col-2">
                        {
                            loading ?
                                <>
                                    <div className="col-md-6 skel-grid-post mb-2"></div>
                                    <div className="col-md-6 skel-grid-post"></div>
                                </>
                                :
                                <>
                                    <div className="col-md-6">
                                        <PostOne post={ posts[ 5 ] } adClass="entry-grid text-center" />
                                    </div>

                                    <div className="col-md-6">
                                        <PostOne post={ posts[ 6 ] } adClass="entry-grid text-center" />
                                    </div>
                                </>
                        }
                    </div>

                    <hr className="mb-5" />

                    <h2 className="title text-center mb-2">Grid 3 Columns</h2>

                    <div className="row justify-content-center">
                        {
                            loading ?
                                <>
                                    <div className="col-sm-6 col-md-4 skel-grid-post mb-2"></div>
                                    <div className="col-sm-6 col-md-4 skel-grid-post mb-2"></div>
                                    <div className="col-sm-6 col-md-4 skel-grid-post mb-2"></div>
                                </>
                                :
                                <>
                                    <div className="col-sm-6 col-md-4">
                                        <PostOne post={ posts[ 7 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <PostOne post={ posts[ 8 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <PostOne post={ posts[ 9 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                    </div>
                                </>
                        }

                    </div>

                    <hr className="mb-5" />

                    <h2 className="title text-center mb-2">Grid 4 Columns</h2>

                    {
                        loading ?
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-4 col-lg-3 skel-grid-post"></div>
                                <div className="col-sm-6 col-md-4 col-lg-3 skel-grid-post"></div>
                                <div className="col-sm-6 col-md-4 col-lg-3 skel-grid-post"></div>
                                <div className="col-sm-6 col-md-4 col-lg-3 skel-grid-post"></div>
                            </div>
                            :
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-lg-3">
                                    <PostOne post={ posts[ 7 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <PostOne post={ posts[ 8 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <PostOne post={ posts[ 9 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <PostOne post={ posts[ 10 ] } adClass="entry-grid text-center" isAuthor={ false } />
                                </div>
                            </div>
                    }

                    <hr className="mb-5" />

                    <h2 className="title text-center mb-2">Grid 3 Columns <span className="title-separator">/</span> Mask</h2>

                    {
                        loading ?
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-4 skel-mask-post"></div>
                                <div className="col-sm-6 col-md-4 skel-mask-post"></div>
                                <div className="col-sm-6 col-md-4 skel-mask-post"></div>
                            </div>
                            :
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-4">
                                    <PostThree post={ posts[ 11 ] } />
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <PostThree post={ posts[ 12 ] } />
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <PostThree post={ posts[ 13 ] } />
                                </div>
                            </div>
                    }
                </div>
            </div>

            <ElementList />
        </div>
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( BlogPosts );