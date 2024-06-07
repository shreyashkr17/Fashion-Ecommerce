import React, { useEffect } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { countTo } from '~/utils';
import { homeData } from '~/utils/data';

function About2 () {
    useEffect( () => {
        countTo();
    }, [] );

    return (
        <div className="main">
            <PageHeader title="About us 2" subTitle="Pages" />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="#">Pages</ALink>
                        </li>
                        <li className="breadcrumb-item active">About us 2</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text text-center mt-3">
                                <h2 className="title text-center mb-2">Who We Are</h2>
                                <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. </p>
                                <img src="images/about/about-2/signature.png" alt="signature" className="mx-auto mb-5" width="140" height="46" />
                                <img src="images/about/about-2/img-1.jpg" alt="temp" className="mx-auto mb-6" width="933" height="390" />
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-puzzle-piece"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Design Quality</h3>
                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero <br />eu augue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-life-ring"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Professional Support</h3>
                                    <p>Praesent dapibus, neque id cursus faucibus, <br />tortor neque egestas augue, eu vulputate <br />magna eros eu erat. </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Made With Love</h3>
                                    <p>Pellentesque a diam sit amet mi ullamcorper <br />vehicula. Nullam quis massa sit amet <br />nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-2"></div>

                <div className="bg-image pt-7 pb-5 pt-md-12 pb-md-9" style={ { backgroundImage: `url(images/backgrounds/bg-4.jpg)` } } >
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="40" data-speed="3000" data-refresh-interval="50">0</span>k+
                                    </div>
                                    <h3 className="count-title text-white">Happy Customer</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="20" data-speed="3000" data-refresh-interval="50">0</span>+
                                    </div>
                                    <h3 className="count-title text-white">Years in Business</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="95" data-speed="3000" data-refresh-interval="50">0</span>%
                                    </div>
                                    <h3 className="count-title text-white">Return Clients</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="15" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title text-white">Awards Won</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-light-2 pt-6 pb-7 mb-6">
                    <div className="container">
                        <h2 className="title text-center mb-4">Meet Our Team</h2>

                        <div className="row">
                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-1.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Samanta Grey<span>Founder & CEO</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-2.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Bruce Sutton<span>Sales & Marketing Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-3.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Janet Joy<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-4.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Mark Pocket<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-5.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Damion Blue<span>Sales & Marketing Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-6.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Lenard Smith<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-7.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Rachel Green<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-8.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">David Doe<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-3">
                            <ALink href="/blog/classic" className="btn btn-sm btn-minwidth-lg btn-outline-primary-2">
                                <span>LETS START WORK</span>
                                <i className="icon-long-arrow-right"></i>
                            </ALink>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="brands-text text-center mx-auto mb-6">
                                <h2 className="title">The world's premium design brands in one destination.</h2>
                                <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nis</p>
                            </div>
                            <div className="brands-display">
                                <div className="row justify-content-center">
                                    {
                                        homeData?.brands.slice( 0, 8 ).map( ( brand, index ) =>
                                            <div className="col-6 col-sm-4 col-md-3" key={ index }>
                                                <ALink href="#" className="brand">
                                                    <img src={ brand.image } alt="Brand Name" width={ brand.width } height={ brand.height } />
                                                </ALink>
                                            </div>
                                        )
                                    }
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default React.memo( About2 );