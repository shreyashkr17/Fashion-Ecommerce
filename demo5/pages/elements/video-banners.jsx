import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';

import { actions } from '~/store/demo';

function VideoBanners ( props ) {
    const openVideoModal = ( e ) => {
        e.preventDefault();
        props.showVideo();
    }
    return (
        <div className="main">
            <PageHeader title="Video Banner" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Video Banner</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title mb-3 text-center">Fullwidth Banner</h2>
                </div>

                <div
                    className="video-banner video-banner-bg bg-image text-center"
                    style={ { backgroundImage: "url('images/video/bg-1.jpg')" } }
                >
                    <div className="container">
                        <h3 className="video-banner-title h1 text-white">
                            <span>New Video</span>
                            <strong>Womens New Arrivals</strong>
                        </h3>

                        <a
                            href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                            onClick={ openVideoModal }
                            className="btn-video btn-iframe"
                        >
                            <i className="icon-play"></i>
                        </a>
                    </div>
                </div>

                <div className="container">
                    <hr className="mt-5 mb-4" />
                    <h2 className="title mb-3 text-center">Video Banner with Description</h2>
                </div>

                <div className="video-banner video-banner-poster text-center">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <h3 className="video-banner-title h3">
                                    <span className="text-primary">New Video</span>Womens New Arrivals
                            </h3>

                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>
                            </div>

                            <div className="col-md-6">
                                <div className="video-poster">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="poster"
                                        width={ 570 }
                                        height={ 390 }
                                        src="images/video/poster-1.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />

                                    <div className="video-poster-content">
                                        <a
                                            href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                                            onClick={ openVideoModal }
                                            className="btn-video btn-iframe"
                                        >
                                            <i className="icon-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div className="container">
                    <hr className="mt-5 mb-4" />
                    <h2 className="title mb-3 text-center">Video Banner with Background</h2>
                </div>

                <div
                    className="video-banner bg-image text-center pt-8 pb-8"
                    style={ { backgroundImage: "url('images/video/bg-2.jpg')" } }
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                                <div className="video-poster">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="poster"
                                        width={ 770 }
                                        height={ 400 }
                                        src="images/video/poster-2.jpg"
                                        threshold={ 200 }
                                        effect="opacity"
                                    />
                                    <div className="video-poster-content">
                                        <h3 className="h4 video-poster-title text-white">Womens New Arrivals</h3>

                                        <a
                                            href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                                            onClick={ openVideoModal }
                                            className="btn-video btn-iframe"
                                        >
                                            <i className="icon-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div className="container">
                    <hr className="mt-5 mb-4" />
                    <h2 className="title mb-3 text-center">Deal Video Banner</h2>
                </div>

                <div className="video-banner bg-light pt-5 pb-5">
                    <div className="container align-items-center">
                        <div className="video-banner-box bg-white">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <div className="video-box-content">
                                        <h3 className="video-banner-title h1">
                                            <span className="text-primary">New Video</span>
                                            <strong>Deal Banner</strong>
                                        </h3>

                                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</p>
                                        <ALink href="#" className="btn btn-outline-primary">
                                            <span>Click Here</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </ALink>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="video-poster">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="poster"
                                            width={ 540 }
                                            height={ 440 }
                                            src="images/video/poster-3.jpg"
                                            threshold={ 200 }
                                            effect="opacity"
                                        />


                                        <div className="video-poster-content">
                                            <a
                                                href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                                                onClick={ openVideoModal }
                                                className="btn-video btn-iframe"
                                            >
                                                <i className="icon-play"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <ElementList />
        </div >
    )
}

export default connect( null, actions )( VideoBanners );