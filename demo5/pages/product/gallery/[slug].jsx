import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryExtended from '~/components/partials/product/gallery/gallery-extended';
import DetailThree from '~/components/partials/product/details/detail-three';
import InfoOne from '~/components/partials/product/info-tabs/info-one';
import RelatedProductsOne from '~/components/partials/product/related/related-one';

function ProductDefault () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const { data, loading, error } = useQuery( GET_PRODUCT, { variables: { slug } } );
    const product = data && data.product.single;
    const related = data && data.product.related;
    const prev = data && data.product.prev;
    const next = data && data.product.next;

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Gallery" />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={ `skel-pro-single gallery mb-4 ${loading ? '' : 'loaded'}` }>
                            <div className="row">
                                <div className="col-12">
                                    <div className="skel-product-gallery"></div>
                                    {
                                        !loading ?
                                            <GalleryExtended product={ product } />
                                            : ""
                                    }
                                </div>

                                <div className="col-12">
                                    <div className="entry-summary row mt-5">
                                        <div className="col-md-12">
                                            <div className="entry-summary1"></div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="entry-summary2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            !loading ?
                                <DetailThree product={ product } />
                                : ""
                        }
                    </div>

                    {
                        loading ?
                            <div className="skel-pro-tabs"></div>
                            :
                            <InfoOne product={ product } />
                    }

                    <RelatedProductsOne products={ related } loading={ loading } />
                </div >
            </div >
        </div >
    )
}

export default withApollo( { ssr: typeof window == 'undefined' } )( ProductDefault );
