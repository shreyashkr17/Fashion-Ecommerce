import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';
import OwlCarousel from '~/components/features/owl-carousel';

const sliderSetting = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            nav: true,
            items: 4
        }
    }
}

function Categories () {
    return (
        <div className="main">
            <PageHeader title="Product Category" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Product Category</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">2 Columns</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 570 }
                                        height={ 280 }
                                        src="images/banners/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h3 className="banner-title">Women</h3>

                                    <h4 className="banner-subtitle">18 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 280 }
                                        src="images/banners/banner-2.jpg"
                                        width={ 570 }
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h3 className="banner-title">Men</h3>

                                    <h4 className="banner-subtitle">12 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">3 Columns Badge Style</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 370 }
                                        height={ 250 }
                                        src="images/category/3cols/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content banner-content-overlay text-center">
                                    <h3 className="banner-title">Women</h3>

                                    <h4 className="banner-subtitle">18 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 370 }
                                        height={ 250 }
                                        src="images/category/3cols/banner-2.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content banner-content-overlay text-center">
                                    <h3 className="banner-title">Men</h3>

                                    <h4 className="banner-subtitle">12 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 370 }
                                        height={ 250 }
                                        src="images/category/3cols/banner-3.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content banner-content-overlay text-center">
                                    <h3 className="banner-title">Accessories</h3>

                                    <h4 className="banner-subtitle">8 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">4 Columns Carousel</h2>

                    <OwlCarousel adClass="owl-simple" options={ sliderSetting }>
                        <div className="banner banner-cat">
                            <ALink href="#">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="banner"
                                    width={ 270 }
                                    height={ 300 }
                                    src="images/category/4cols/banner-1.jpg"
                                    threshold={ 200 }
                                    effect="opacity"
                                />
                            </ALink>

                            <div className="banner-content banner-content-static text-center">
                                <h3 className="banner-title">Women</h3>

                                <h4 className="banner-subtitle">18 Products</h4>

                                <ALink
                                    href="/shop/sidebar/list"
                                    className="banner-link p-0"
                                >Shop Now</ALink>
                            </div>
                        </div>
                        <div className="banner banner-cat">
                            <ALink href="#">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="banner"
                                    width={ 270 }
                                    height={ 300 }
                                    src="images/category/4cols/banner-2.jpg"
                                    threshold={ 200 }
                                    effect="opacity"
                                />
                            </ALink>

                            <div className="banner-content banner-content-static text-center">
                                <h3 className="banner-title">Men</h3>

                                <h4 className="banner-subtitle">12 Products</h4>

                                <ALink
                                    href="/shop/sidebar/list"
                                    className="banner-link p-0"
                                >Shop Now</ALink>
                            </div>
                        </div>
                        <div className="banner banner-cat">
                            <ALink href="#">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="banner"
                                    width={ 270 }
                                    height={ 300 }
                                    src="images/category/4cols/banner-3.jpg"
                                    threshold={ 200 }
                                    effect="opacity"
                                />
                            </ALink>

                            <div className="banner-content banner-content-static text-center">
                                <h3 className="banner-title">Shoes & Boots</h3>

                                <h4 className="banner-subtitle">15 Products</h4>

                                <ALink
                                    href="/shop/sidebar/list"
                                    className="banner-link p-0"
                                >Shop Now</ALink>
                            </div>
                        </div>
                        <div className="banner banner-cat">
                            <ALink href="#">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="banner"
                                    width={ 270 }
                                    height={ 300 }
                                    src="images/category/4cols/banner-4.jpg"
                                    threshold={ 200 }
                                    effect="opacity"
                                />
                            </ALink>

                            <div className="banner-content banner-content-static text-center">
                                <h3 className="banner-title">Accessories</h3>

                                <h4 className="banner-subtitle">8 Products</h4>

                                <ALink
                                    href="/shop/sidebar/list"
                                    className="banner-link p-0"
                                >Shop Now</ALink>
                            </div>
                        </div>
                        <div className="banner banner-cat">
                            <ALink href="#">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="banner"
                                    width={ 270 }
                                    height={ 300 }
                                    src="images/category/4cols/banner-1.jpg"
                                    threshold={ 200 }
                                    effect="opacity"
                                />
                            </ALink>

                            <div className="banner-content banner-content-static text-center">
                                <h3 className="banner-title">Women</h3>

                                <h4 className="banner-subtitle">18 Products</h4>

                                <ALink
                                    href="/shop/sidebar/list"
                                    className="banner-link p-0"
                                >Shop Now</ALink>
                            </div>
                        </div>
                    </OwlCarousel>

                    <hr className="mb-4" />
                </div>

                <div className="container-fluid">
                    <h2 className="title text-center mb-3">3 Columns Fullwidth</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 600 }
                                        height={ 280 }
                                        src="images/category/fullwidth/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h3 className="banner-title">Women</h3>

                                    <h4 className="banner-subtitle">18 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 600 }
                                        height={ 280 }
                                        src="images/category/fullwidth/banner-2.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h3 className="banner-title">Men</h3>

                                    <h4 className="banner-subtitle">12 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner banner-cat">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 600 }
                                        height={ 280 }
                                        src="images/category/fullwidth/banner-3.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h3 className="banner-title">Accessories</h3>

                                    <h4 className="banner-subtitle">12 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">Masonry</h2>

                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-3">
                            <div className="banner banner-cat banner-link-anim banner-large">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 270 }
                                        height={ 549 }
                                        src="images/category/grid/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />

                                </ALink>

                                <div className="banner-content banner-content-bottom">
                                    <h3 className="banner-title">Accessories</h3>

                                    <h4 className="banner-subtitle">8 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 order-lg-last">
                            <div className="banner banner-cat banner-link-anim banner-large">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 270 }
                                        height={ 549 }
                                        src="images/category/grid/banner-4.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content banner-content-top">
                                    <h3 className="banner-title">Shoes & Boots</h3>

                                    <h4 className="banner-subtitle">15 Products</h4>

                                    <ALink href="/shop/sidebar/list" className="banner-link p-0">Shop Now</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner banner-cat banner-link-anim">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                width={ 750 }
                                                height={ 270 }
                                                src="images/category/grid/banner-2.jpg"
                                                threshold={ 200 }
                                                effect="opacity"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h3 className="banner-title">Women</h3>

                                            <h4 className="banner-subtitle">18 Products</h4>

                                            <ALink
                                                href="/shop/sidebar/list"
                                                className="banner-link p-0"
                                            >Shop Now</ALink>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner banner-cat banner-link-anim">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                width={ 750 }
                                                height={ 270 }
                                                src="images/category/grid/banner-3.jpg"
                                                threshold={ 200 }
                                                effect="opacity"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h3 className="banner-title">Men</h3>

                                            <h4 className="banner-subtitle">12 Products</h4>

                                            <ALink
                                                href="/shop/sidebar/list"
                                                className="banner-link p-0"
                                            >Shop Now</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">Grid Badge Style</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner banner-cat banner-badge">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 575 }
                                        height={ 545 }
                                        src="images/category/grid2/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />

                                </ALink>

                                <ALink className="banner-link" href="/shop/sidebar/list">
                                    <h3 className="banner-title">Accessories</h3>

                                    <h4 className="banner-subtitle">8 Products</h4>

                                    <span className="banner-link-text">Shop Now</span>
                                </ALink>
                            </div>
                        </div>

                        <div className="col-md-6 d-flex flex-column">
                            <div className="banner banner-cat banner-badge">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 570 }
                                        height={ 260 }
                                        src="images/category/grid2/banner-2.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <ALink className="banner-link" href="/shop/sidebar/list">
                                    <h3 className="banner-title">Women</h3>

                                    <h4 className="banner-subtitle">15 Products</h4>

                                    <span className="banner-link-text">Shop Now</span>
                                </ALink>
                            </div>

                            <div className="banner banner-cat banner-badge flex-grow-1">
                                <ALink href="#" className="h-100">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 570 }
                                        height={ 260 }
                                        className="h-100"
                                        src="images/category/grid2/banner-3.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <ALink className="banner-link" href="/shop/sidebar/list">
                                    <h3 className="banner-title">Men</h3>

                                    <h4 className="banner-subtitle">12 Products</h4>

                                    <span className="banner-link-text">Shop Now</span>
                                </ALink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ElementList />
        </div>
    );
}

export default Categories;