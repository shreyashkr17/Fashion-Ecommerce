import React from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import PostOne from '~/components/features/posts/post-one';

import { mainSlider1 } from '~/utils/data';

function RelatedPosts ( props ) {
    const { related = [], loading = false } = props;

    return (
        <div className="related-posts">
            <h3 className="title">Related Posts</h3>
            {
                !loading && related.length == 0 ?
                    <p
                        className="blogs-info"
                    >No related posts were found.</p>
                    : loading ?
                        <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-2" options={ mainSlider1 }>
                            {
                                [ 1, 2, 3, 4 ].map( ( item, index ) =>
                                    <div className="skel-pro" key={ index }></div>
                                )
                            }
                        </OwlCarousel>
                        :
                        <OwlCarousel adClass="owl-simple" options={ mainSlider1 }>
                            {
                                related?.map( ( post, index ) =>
                                    <PostOne post={ post } isContent={ false } isAuthor={ false } adClass="entry-grid" key={ "related_" + index } />
                                )
                            }
                        </OwlCarousel>
            }
        </div>
    )
}

export default React.memo( RelatedPosts );