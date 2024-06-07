import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import Team from '~/pages/pages/team';
import { homeData, mainSlider5, mainSlider9 } from '~/utils/data';
import Philosophy from './philosophy';


function About () {
    return (
        
        <div className="main" style={{background:"#f8f7f3"}}>
        
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif", fontWeight:"800"}}>About us</li>
                    </ol>
                </div>
            </nav>

            <div className="container">
                <div className="page-header page-header-big text-center" style={ { backgroundImage: `url(bg2.jpeg)` } } >
                    <h1 className="page-title text-white" style={{ fontSize:"5rem"}}>About us<span className="text-white">Who we are</span></h1>
                </div>
            </div>

            <div className="page-content pb-0">
                <div className="container">
                <div className="row">
                        <div className="col-lg-12 mb-3 mb-lg-0" style={{textAlign:"justify"}}>
                            <h2 className="title">About Us</h2>
                            <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Ireti for us is a symbol of hope, resilience, and continuation. <br />
Ireti is the representation of a vibrant world where creativity knows no bounds! Its not just another brand but a platform that celebrates the boundless imagination of artists. Here, talent takes center stage, and the spotlight shines on the incredible works that paint the tapestry of our diverse artistic community. From a homemaker that is good at crochet, an artist that has lost his job during Covid, somebody who has lost his passion between his 9-5, an artisan who didn’t get the resources to show the world his art. We are now letting Ireti reflect their expression along with everybody who is a part of this brand. Our motive is to be able to apprise stories of craftsmanship and grandeur, now and forever. Our brand objective is to use business and garments to inspire and implement solutions, cause no unnecessary harm and build the best product. 
Here you get to choose what you want to be. So, Welcome to a realm where creativity knows no limits, welcome to Ireti.
</p>
                        </div>

                      
                    </div>
                    <div className="mb-5"></div>
                    <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0" style={{textAlign:"justify"}}>
                            <h2 className="title">Our Vision</h2>
                            <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>At Ireti we aim to promote an idea; an idea of continuation, economic welfare, art and contemporary fashion. Our vision is to be the catalyst that empowers artists to reach their fullest potential. We aspire to create a nurturing environment where artistic minds can flourish, innovate, and inspire. By providing a global stage for artists of all genres, we aim to foster creativity, encourage collaboration, and amplify the voices of those who often go unheard. Our platform is driven by the belief that art has the power to connect, heal, and transform societies. We envision a world where every artist's unique vision finds its audience and where creative expression is cherished. Join us on this journey as we strive to make this vision a vibrant reality.</p>
                        </div>

                        <div className="col-lg-6" style={{textAlign:"justify"}}>
                            <h2 className="title">Our Mission</h2>
                            <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>To inspire the dream of a better life through contemporary timeless styles and storytelling. With the onset of fast fashion we want to create a brand that is fun, has a story, welcoming, engages the clients and helps them tap into their creativity and explore their personal style. We also believe that it is essential not only to provide products of the highest quality but also to treat every customer with attention, consideration and respect. Our clothes will serve us in more than one way than what the traditional approcach focuses on.
</p>
                        </div>
                    </div>

                    <div className="mb-5"></div>
                </div>
                <Philosophy />
                <div className="pt-6 pb-5 mb-6 mb-lg-8" style={{background:"#f8f7f3"}}>
                    <div className="container" style={{background:"#f8f7f3"}}>
                        <div className="row">
                            <div className="col-lg-5 mb-3 mb-lg-0" style={{textAlign:"justify"}}>
                                <h2 className="title">Who We Are</h2>
                                <p className="lead text-primary mb-3" style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"1.5rem",fontWeight:"800"}}>Empowering Excellence, Redefining Shopping.</p>
                                <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}} className="mb-2">At Ireti, we are a dedicated team committed to providing exceptional products and services to our customers. With a passion for innovation and customer satisfaction, we strive to create an online platform that meets the diverse needs of our users. Our values of integrity, quality, and reliability guide everything we do, ensuring that our customers can trust us as their preferred online destination. We believe in fostering a culture of creativity and collaboration, empowering our team to continually improve and evolve. At Ireti, we are more than just an e-commerce platform; we are a trusted partner, delivering value and excellence to our customers every day.</p>

                                <ALink href="/blog/listing" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>VIEW OUR BLOGS</span>
                                    
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-6 offset-lg-1">
                                <div className="about-images">
                                    <img src="bg1.jpeg" alt="" className="about-img-front" />
                                    {/* <img src="bg2.jpeg" alt="" className="about-img-back" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="brands-text">
                                <h2 className="title">The world's premium design brands in one destination.</h2>
                                <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Elevate your lifestyle with the ultimate destination for the world's most coveted design brands. Immerse yourself in a curated collection of exquisite home furnishings, fashion, accessories, and lifestyle products that epitomize sophistication and exclusivity. From iconic names to emerging talents, our meticulously curated offerings celebrate the finest in craftsmanship, innovation, and artistry. Discover a sanctuary where form meets function, where every piece tells a story of passion and heritage. Indulge in the extraordinary, where dreams take shape and luxury becomes a way of life. Experience the pinnacle of design at our premier destination.</p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="brands-display">
                                <div className="row justify-content-center">
                                    { homeData.brands.map( ( brand, index ) =>
                                        <div className="col-6 col-sm-4" key={ index }>
                                            <ALink href="#" className="brand">
                                                <img src={ brand.image } alt="Brand Name" width={ brand.width } height={ brand.height } />
                                            </ALink>
                                        </div>
                                    ) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <Team /> */}
                <div className="mb-2"></div>

                {/* <div className="about-testimonials pt-6 pb-6 position-relative" style={ { marginBottom: '-1px', background:"#f8f7f3" } }>
                    <div className="container">
                        <h2 className="title text-center mb-3">What Customer Say About Us</h2>

                        <OwlCarousel adClass="owl-simple owl-testimonials-photo" options={ mainSlider5 } >
                            <blockquote className="testimonial text-center">
                                <img src="images/testimonials/user-1.jpg" alt="user" />
                                <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.8rem"}}>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque aliquet nibh nec urna. <br />In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>
                                <cite style={{fontSize:"2rem"}}>
                                    Jenson Gregory
                                    <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"1.5rem"}}>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote className="testimonial text-center">
                                <img src="images/testimonials/user-2.jpg" alt="user" />
                                <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.8rem"}}>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                                <cite style={{fontSize:"2rem"}}>
                                    Victoria Ventura
                                    <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"1.5rem"}}>Customer</span>
                                </cite>
                            </blockquote>
                        </OwlCarousel>
                    </div>
                </div> */}
            </div>
            
        </div>
    )
}

export default About;