import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import ProductTwelve from '~/components/features/products/product-twelve';

import { fadeInLeftShorter, fadeInRightShorter } from '~/utils/data';

function SpecialCollection ( props ) {
    const { products = [], loading } = props;

    return (
        <div className="pt-6 pb-6" style={{background:"#f8f7f3"}}>
            <div className="container">
                <div className="banner-set">
                    <div className="row">
                        <div className="col-lg-6">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="banner-set-content text-center" style={{background:"#f8f7f3"}}>
                                    <div className="set-content-wrapper">
                                        <h4 style={{ fontFamily: '"Italianno", cursive',fontWeight: "600", letterSpacing: ".25rem",fontSize:"4.5rem"}}>Special</h4>
                                        <h2 style={{fontFamily:"'Gotham Black',sans-serif",fontSize:"3.5rem"}}># Refine Your Style.</h2>

                                        <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.65rem"}}>Get on our exclusive email list and be the first to hear about sales, coupons, new arrivals and more! </p>

                                        <div className="banner-set-products">
                                            <div className="row">
                                                <div className="products text-left">
                                                    {
                                                        loading ?
                                                            [ 1, 2 ].map( item =>
                                                                <div className="col-6" key={ item }>
                                                                    <div className="skel-pro"></div>
                                                                </div>
                                                            )
                                                            :
                                                            products?.slice( 0, 2 ).map( ( item, index ) =>
                                                                <div className="col-6" key={ index + item.name } >
                                                                    <ProductTwelve product={ item } />
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-6">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="banner-set-image banner-border-hover">
                                    <ALink href="#">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            src="images/home/banners/banner-4.jpg"
                                            alt="banner"
                                            width={ 100 }
                                            height={ 500 }
                                            effect="blur"
                                        />
                                    </ALink>

                                    <div className="banner-content">
                                        <h3 className="banner-title"><ALink href="#"><span style={{fontFamily:"'Gotham Black',sans-serif",fontSize:"3rem"}}>Casual basics and<br />trendy key pieces.</span></ALink></h3>
                                        <h4 className="banner-subtitle" style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"2rem"}}>in this look</h4>

                                        <h4 className="banner-detail" style={{fontFamily:"'Gotham Black',sans-serif",fontSize:"1.5rem",textTransform:"uppercase"}}>• Rib-knit cardigan <br />• Linen-blend paper bag trousers</h4>
                                        <h4 className="banner-price" style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"2rem"}}>$19.99 - $48.00</h4>
                                        <ALink href="/shop/sidebar/list" className="btn btn-outline-primary-2 banner-link">buy all</ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialCollection;
