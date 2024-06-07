import React from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';

function Breadcrumb ( props ) {
    const router = useRouter();
    const { prev, next, current, fullWidth = false, formattedTitle } = props;
    // console.log(formattedTitle)

    return (
        <nav className="breadcrumb-nav border-0 mb-0">
            <div className={ 'd-flex align-items-center ' + ( fullWidth ? 'container-fluid' : 'container' ) }>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item">
                        <ALink href="" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Product</ALink>
                    </li>
                    <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800",color:"#14151a"}}>{formattedTitle}</li>
                </ol>

                {/* <nav className="product-pager ml-auto">
                    {
                        prev ?
                            <ALink
                                href={ {pathname: router.pathname, query: {slug: prev.slug}} }
                                className={ `product-pager-link product-pager-prev ${!next ? 'prev-only' : ''}` }
                            >
                                <i className="icon-angle-left"></i>
                                <span>Prev</span>
                                <div className="product-detail">
                                    <figure>
                                        <img
                                            src={ process.env.NEXT_PUBLIC_ASSET_URI + prev.sm_pictures[ 0 ].url }
                                            alt="product"
                                            width={ prev.sm_pictures[ 0 ].width }
                                            height={ prev.sm_pictures[ 0 ].height }
                                        />
                                    </figure>
                                    <h3 className="product-name mb-0">{ prev.name }</h3>
                                </div>
                            </ALink>
                            : ""
                    }
                    {
                        next ?
                            <ALink
                                href={ {pathname: router.pathname, query: {slug: next.slug}} }
                                className="product-pager-link product-pager-next"
                            >
                                <span>Next</span>
                                <i className="icon-angle-right"></i>
                                <div className="product-detail">
                                    <figure>
                                        <img
                                            src={ process.env.NEXT_PUBLIC_ASSET_URI + next.sm_pictures[ 0 ].url }
                                            alt="product"
                                            width={ next.sm_pictures[ 0 ].width }
                                            height={ next.sm_pictures[ 0 ].height }
                                        />
                                    </figure>
                                    <h3 className="product-name mb-0">{ next.name }</h3>
                                </div>
                            </ALink>
                            : ""
                    }
                </nav > */}
            </div >
        </nav >
    )
}

export default React.memo( Breadcrumb );