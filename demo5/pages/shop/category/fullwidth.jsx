import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import ShopSidebarTwo from '~/components/partials/shop/sidebar/shop-sidebar-two';

function CategoryFullwidth() {
    function openSidebar() {
        document
            .querySelector( 'body' )
            .classList.add( 'sidebar-filter-active' );
    }

    function closeSidebar() {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );
    }

    return (
        <div className="main shop">
            <PageHeader title="Product Category Fullwidth" subTitle="Shop" />

            <nav aria-label="breadcrumb" className="breadcrumb-nav breadcrumb-with-filter">
                <div className="container-fluid">
                    <button className="sidebar-toggler" onClick={ openSidebar }><i className="icon-bars"></i>Filters</button>

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/">Home</ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop/sidebar/3cols">Shop</ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop/sidebar/3cols">Product Category</ALink></li>
                        <li className="breadcrumb-item active">Fullwidth</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="categories-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-1.jpg"
                                                    alt="banner"
                                                    width={ 280 }
                                                    height={ 210 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Jackets</h3>
                                                <h4 className="banner-subtitle">2 Products</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/3cols/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-2.jpg"
                                                    alt="banner"
                                                    width={ 210 }
                                                    height={ 210 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Jeans</h3>
                                                <h4 className="banner-subtitle">1 Product</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-3.jpg"
                                                    alt="banner"
                                                    width={ 280 }
                                                    height={ 450 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Sportwear</h3>
                                                <h4 className="banner-subtitle">0 Product</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>

                                    <div className="col-sm-8">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-4.jpg"
                                                    alt="banner"
                                                    width={ 320 }
                                                    height={ 450 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Bags</h3>
                                                <h4 className="banner-subtitle">4 Products</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-5.jpg"
                                                    alt="banner"
                                                    width={ 320 }
                                                    height={ 450 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Dresses</h3>
                                                <h4 className="banner-subtitle">3 Products</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>

                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-6.jpg"
                                                    alt="banner"
                                                    width={ 210 }
                                                    height={ 210 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Shoes</h3>
                                                <h4 className="banner-subtitle">2 Products</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-7.jpg"
                                                    alt="banner"
                                                    width={ 210 }
                                                    height={ 210 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">T-shirts</h3>
                                                <h4 className="banner-subtitle">0 Products</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>

                                        <div className="banner banner-cat banner-badge">
                                            <ALink href="/shop/sidebar/3cols">
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    src="images/category/fullwidth-page/banner-8.jpg"
                                                    alt="banner"
                                                    width={ 210 }
                                                    height={ 450 }
                                                    effect="blur"
                                                    threshold={ 500 }
                                                />
                                            </ALink>

                                            <ALink className="banner-link" href="/shop/sidebar/3cols">
                                                <h3 className="banner-title">Jumpers</h3>
                                                <h4 className="banner-subtitle">1 Product</h4>
                                                <span className="banner-link-text">Shop Now</span>
                                            </ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-filter-overlay" onClick={ closeSidebar }></div>
                <ShopSidebarTwo></ShopSidebarTwo>
            </div >
        </div >
    )
}

export default CategoryFullwidth;