import React from 'react'
import ALink from '~/components/features/alink'
import OwlCarousel from '~/components/features/owl-carousel'
import { LazyLoadImage } from 'react-lazy-load-image-component';


import { mainSlider9 } from '~/utils/data'

function Team() {
  return (
    <div className="main" style={{background:"#f8f7f3"}}>
      {/*  <nav className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif", fontWeight:"800"}}>Founder's & Co-Founder's Message</li>
                </ol>
            </div>
        </nav>
  */}
        <div className="page-content pb-0">
            <div className="container">
                <h2 className="title text-center mb-4">Meet Our Team</h2>
                <OwlCarousel adClass="owl-simple" options={ mainSlider9 }>
                        <div className="member member-anim text-center">
                            <figure className="member-media">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="member"
                                    src="images/team/member-1.jpg"
                                    threshold={ 500 }
                                    effect="opacity"
                                    height={ 500 }
                                    width={ 376 }
                                />

                                <figcaption className="member-overlay">
                                    <div className="member-overlay-content">
                                        <h3 className="member-title"  style={{fontFamily:"'Gotham Black',sans-serif",fontWeight:"800",fontSize:"2rem"}}>Samanta Grey<span style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800",fontSize:"1.4rem"}}>Founder & CEO</span></h3>
                                        <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.7rem"}}>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p>
                                        <div className="social-icons social-icons-simple">
                                            <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                            <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                            <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>

                            <div className="member-content">
                                <h3 className="member-title">
                                    Samanta Grey
                                    <span>Founder & CEO</span>
                                </h3>
                            </div>
                        </div>

                        <div className="member member-anim text-center">
                            <figure className="member-media">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="member"
                                    src="images/team/member-2.jpg"
                                    threshold={ 500 }
                                    effect="opacity"
                                    height={ 500 }
                                    width={ 376 }
                                />

                                <figcaption className="member-overlay">
                                    <div className="member-overlay-content">
                                        <h3 className="member-title" style={{fontFamily:"'Gotham Black',sans-serif",fontWeight:"800",fontSize:"2rem"}}>Bruce Sutton<span style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800",fontSize:"1.4rem"}}>Sales & Marketing Manager</span></h3>
                                        <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.7rem"}}>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p>
                                        <div className="social-icons social-icons-simple">
                                            <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                            <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                            <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>

                            <div className="member-content">
                                <h3 className="member-title">
                                    Bruce Sutton
                                    <span>Sales & Marketing Manager</span>
                                </h3>
                            </div>
                        </div>

                        <div className="member member-anim text-center">
                            <figure className="member-media">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="member"
                                    src="images/team/member-3.jpg"
                                    threshold={ 500 }
                                    effect="opacity"
                                    height={ 500 }
                                    width={ 376 }
                                />

                                <figcaption className="member-overlay">
                                    <div className="member-overlay-content">
                                        <h3 className="member-title" style={{fontFamily:"'Gotham Black',sans-serif",fontWeight:"800",fontSize:"2rem"}}>Janet Joy<span style={{fontFamily:"'Gotham Medium',sans-serif",fontWeight:"800",fontSize:"1.4rem"}}>Product Manager</span></h3>
                                        <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.7rem"}}>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p>
                                        <div className="social-icons social-icons-simple">
                                            <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                            <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                            <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>

                            <div className="member-content">
                                <h3 className="member-title">
                                    Janet Joy
                                    <span>Product Manager</span>
                                </h3>
                            </div>
                        </div>
                    </OwlCarousel>
            </div>
        </div>
    </div>
  )
}

export default Team;
