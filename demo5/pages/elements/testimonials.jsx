import { useEffect } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';
import { parallax } from '~/utils';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider5, mainSlider6, mainSlider7 } from '~/utils/data';

function Testimonials () {
    useEffect( () => {
        document.addEventListener( 'scroll', parallax, true );

        return () => {
            document.removeEventListener( 'scroll', parallax );
        }
    }, [] )

    return (
        <div className="main">
            <PageHeader title="Testimonials" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Testimonials</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">Quote Sign <span className="title-separator">/</span> Centered Align</h2>

                    <OwlCarousel adClass="owl-testimonials cols-1"
                        options={ mainSlider5 }>
                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                            <cite>
                                Jenson Gregory
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                            <cite>
                                Damon Stone
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicabo a, modi voluptatibus. Perferendis perspiciatis, voluptate, distinctio earum veritatis animi tempora eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                            <cite>
                                John Smith
	                			<span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>

                    <hr className="mt-5 mb-5" />
                    <h2 className="title text-center mb-3">Quote Sign <span className="title-separator">/</span> Centered Align <span className="title-separator">/</span> 2 Columns</h2>

                    <OwlCarousel adClass="owl-testimonials cols-md-2 cols-1"
                        options={ mainSlider6 }>
                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.  ”</p>
                            <cite>
                                Jenson Gregory
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus. ”</p>

                            <cite>
                                Victoria Ventura
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicabo a, modi voluptatibus. Perferendis, voluptate, distinctio earum veritatis animi. ”</p>

                            <cite>
                                John Smith
	                			<span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>

                    <hr className="mt-5 mb-5" />
                    <h2 className="title text-center mb-3">Quote Sign <span className="title-separator">/</span> Centered Align <span className="title-separator">/</span> 3 Columns</h2>

                    <OwlCarousel adClass="owl-testimonials cols-1 cols-md-2 cols-lg-3"
                        options={ mainSlider7 }>
                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus quet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis. ”</p>
                            <cite>
                                Jenson Gregory
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusand. ”</p>

                            <cite>
                                Victoria Ventura
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicab, modi animi. ”</p>

                            <cite>
                                Angelica Lynch
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial testimonial-icon text-center">
                            <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicab. ”</p>

                            <cite>
                                John Smith
	                			<span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>
                </div>

                <div className="mb-5"></div>

                <div className="bg-image bg-overlay pt-5 pb-4" style={ { backgroundImage: 'url(images/backgrounds/bg-1.jpg)' } }>
                    <div className="container">
                        <h2 className="title text-center text-white mb-3">Quote Sign <span className="title-separator">/</span> Centered Align <span className="title-separator">/</span> Dark Background</h2>

                        <OwlCarousel adClass="owl-testimonials owl-light cols-1"
                            options={ mainSlider5 }>
                            <blockquote className="testimonial testimonial-icon text-center text-white">
                                <p>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                                <cite>
                                    Jenson Gregory
		                			<span>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote className="testimonial testimonial-icon text-center text-white">
                                <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                                <cite>
                                    Damon Stone
		                			<span>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote className="testimonial testimonial-icon text-center text-white">
                                <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicabo a, modi voluptatibus. Perferendis perspiciatis, voluptate, distinctio earum veritatis animi tempora eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                                <cite>
                                    John Smith
		                			<span>Customer</span>
                                </cite>
                            </blockquote>
                        </OwlCarousel>
                    </div>
                </div>

                <div className="mb-5"></div>

                <div className="container">
                    <h2 className="title text-center mb-3">Customer Photo <span className="title-separator">/</span> Centered Align</h2>

                    <OwlCarousel adClass="owl-testimonials-photo cols-1"
                        options={ mainSlider5 }>
                        <blockquote className="testimonial text-center">
                            <img src="images/testimonials/user-1.jpg" alt="user" />
                            <p>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                            <cite>
                                Jenson Gregory
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial text-center">
                            <img src="images/testimonials/user-2.jpg" alt="user" />
                            <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                            <cite>
                                Victoria Ventura
	                			<span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>

                    <hr className="mt-5 mb-5" />
                    <h2 className="title text-center mb-3">Customer Photo <span className="title-separator">/</span> Centered Align <span className="title-separator">/</span> 2 Columns</h2>

                    <OwlCarousel adClass="owl-testimonials-photo cols-1 cols-md-2"
                        options={ mainSlider6 }>
                        <blockquote className="testimonial text-center">
                            <img src="images/testimonials/user-1.jpg" alt="user" />
                            <p>“  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.  ”</p>
                            <cite>
                                Jenson Gregory
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial text-center">
                            <img src="images/testimonials/user-2.jpg" alt="user" />
                            <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus. ”</p>

                            <cite>
                                Victoria Ventura
	                			<span>Customer</span>
                            </cite>
                        </blockquote>

                        <blockquote className="testimonial text-center">
                            <img src="images/testimonials/user-1.jpg" alt="user" />
                            <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicabo a, modi voluptatibus. Perferendis, voluptate, distinctio earum veritatis animi. ”</p>

                            <cite>
                                John Smith
	                			<span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>
                </div>
            </div>
            <ElementList />
        </div>
    )
}

export default Testimonials ;