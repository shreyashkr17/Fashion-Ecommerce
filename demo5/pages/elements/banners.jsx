import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';

function Banners () {
    return (
        <div className="main">
            <PageHeader title="Banners" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Banners</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">2 Columns</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 275 }
                                        src="images/banners/banner-1.jpg"
                                        threshold={ 200 }
                                        width={ 300 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Praesent elementum <br />hendrerit tortor.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 275 }
                                        width={ 300 }
                                        src="images/banners/banner-2.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Donec consectetuer <br />ligula vulputate.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">3 Columns</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 300 }
                                        height={ 224 }
                                        src="images/banners/3cols/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Praesent elementum <br />hendrerit tortor.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 300 }
                                        height={ 224 }
                                        src="images/banners/3cols/banner-2.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Donec consectetuer <br />ligula vulputate.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        width={ 300 }
                                        height={ 224 }
                                        src="images/banners/3cols/banner-3.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title text-white">Phasellus ultrices <br />nulla quisnibh.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />
                </div>

                <div className="container-fluid">
                    <h2 className="title text-center mb-3">3 Columns Fullwidth</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 205 }
                                        width={ 300 }
                                        src="images/banners/3cols/banner-4.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Praesent elementum <br />hendrerit tortor.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 205 }
                                        width={ 300 }
                                        src="images/banners/3cols/banner-5.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Donec consectetuer <br />ligula vulputate.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 205 }
                                        width={ 300 }
                                        src="images/banners/3cols/banner-6.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title text-white">Phasellus ultrices <br />nulla quisnibh.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">Large Banner</h2>

                    <div className="row">
                        <div className="col-12">
                            <div className="banner banner-big">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 470 }
                                        width={ 300 }
                                        src="images/banners/banner-fullwidth.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle text-primary">Quisque a lectus</h4>
                                    <h3 className="banner-title text-white">Morbi interdum <br />mollis sapien.</h3>
                                    <p className="d-none d-lg-block">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, posuere a, pede.</p>

                                    <ALink href="#" className="btn btn-primary btn-rounded"><span>Click Here</span><i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">Grid (3 Banners)</h2>

                    <div className="row ">
                        <div className="col-lg-8">
                            <div className="banner banner-big">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 471 }
                                        width={ 300 }
                                        src="images/banners/grid/3cols/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Morbi in sem <br />placerat.</h3>
                                    <ALink href="#" className="btn btn-primary btn-rounded"><span>Click Here</span><i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                height={ 226 }
                                                width={ 300 }
                                                src="images/banners/grid/3cols/banner-2.jpg"
                                                threshold={ 200 }
                                                effect="black-and-white"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h4 className="banner-subtitle">Quisque a lectus</h4>
                                            <h3 className="banner-title text-white">Donec consectetuer <br />ligula vulputate.</h3>
                                            <ALink href="#" className="banner-link">Click here</ALink>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                height={ 226 }
                                                width={ 300 }
                                                src="images/banners/grid/3cols/banner-3.jpg"
                                                threshold={ 200 }
                                                effect="black-and-white"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h4 className="banner-subtitle">Quisque a lectus</h4>
                                            <h3 className="banner-title">Phasellus <br />ultrices nulla.</h3>
                                            <ALink href="#" className="banner-link">Click here</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title text-center mb-3">Grid (4 Banners)</h2>

                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-4">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 559 }
                                        width={ 300 }
                                        src="images/banners/grid/4cols/banner-1.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title">Phasellus <br />ultrices nulla.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-4 order-lg-last">
                            <div className="banner">
                                <ALink href="#">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        height={ 559 }
                                        width={ 300 }
                                        src="images/banners/grid/4cols/banner-4.jpg"
                                        threshold={ 200 }
                                        effect="black-and-white"
                                    />
                                </ALink>

                                <div className="banner-content">
                                    <h4 className="banner-subtitle">Quisque a lectus</h4>
                                    <h3 className="banner-title text-white">Donec consectetuer <br />ligula vulputate.</h3>
                                    <ALink href="#" className="banner-link">Click here</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                height={ 269 }
                                                width={ 300 }
                                                src="images/banners/grid/4cols/banner-2.jpg"
                                                threshold={ 200 }
                                                effect="black-and-white"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h4 className="banner-subtitle">Quisque a lectus</h4>
                                            <h3 className="banner-title">Phasellus <br />ultrices nulla.</h3>
                                            <ALink href="#" className="banner-link">Click here</ALink>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-12">
                                    <div className="banner">
                                        <ALink href="#">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                height={ 269 }
                                                src="images/banners/grid/4cols/banner-3.jpg"
                                                threshold={ 200 }
                                                effect="black-and-white"
                                            />
                                        </ALink>

                                        <div className="banner-content">
                                            <h4 className="banner-subtitle">Quisque a lectus</h4>
                                            <h3 className="banner-title text-white">Donec consectetuer <br />ligula vulputate.</h3>
                                            <ALink href="#" className="banner-link">Click here</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ElementList />
        </div>
    );
}

export default Banners;