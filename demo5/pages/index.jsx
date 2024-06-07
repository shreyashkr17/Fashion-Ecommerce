import { useQuery } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/alink";
import OwlCarousel from "~/components/features/owl-carousel";
import SpecialCollection from "~/components/partials/home/special-collection";
import NewCollection from "~/components/partials/home/new-collection";
import TrendyCollection from "~/components/partials/home/trendy-collection";
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import Sample from "~/assets/SampleVideo.mp4";
import withApollo from "~/server/apollo";
import { GET_HOME_DATA } from "~/server/queries";
import { attrFilter } from "~/utils";

import { actions } from "~/store/demo";
import OutVideo from "~/assets/output5.mp4";
import AboutImage from "~/assets/aboutHomePage.jpg";
import { useSelector } from "react-redux";
import { actions as actionProducts } from "~/store/product";
import { useDispatch } from "react-redux";
import { isInstgramView } from "~/utils";
import { actions as singleProductActions } from "~/store/singleProduct";
import { actions as relatedProductActions } from "~/store/related-product";

import {
  homeData,
  introSlider,
  brandSlider,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
  fadeIn,
} from "~/utils/data";
import axios from "axios";
import { actions as instagramAction } from "~/store/instgram";

// window._AutofillCallbackHandler = window._AutofillCallbackHandler || function(){}

function Home(props) {
  // console.log(shreyash)
  const user = useSelector((state) => state.auth);

  const token = useSelector((state) => state.auth.token);

  const instgramDetails = useSelector(
    (state) => state.instagram.instagramDetails
  );

  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_HOME_DATA);
  const products = data && data.homeData.products;
  const topProducts = attrFilter(data && data.homeData.products, "top");

  const [topProductsData, setTopProductsData] = useState([]);

  useEffect(() => {
    if(isInstgramView()){
      window._AutofillCallbackHandler = window._AutofillCallbackHandler || function () {};
    }
  }, []);

  useEffect(() => {
    const fetchInstgramPosts = async () => {
      try {
        const response = await axios.get(
          "https://njs.iretiensemble.com/instagram/get-all-instagram",
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${token}`
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // console.log(response.data.instagram)
          dispatch(
            instagramAction.setInstagramDetails(response.data.instagram)
          );
        } else {
          dispatch(instagramAction.setInstagramDetails([]));
        }
      } catch (error) {
        // console.log(error);
        dispatch(instagramAction.setInstagramDetails([]));
      }
    };

    fetchInstgramPosts();
  }, [dispatch]);
  // const [allProduct, setAllProduct] = useState();
  const allProduct = useSelector((state) => state.product.products);
  // console.log(allProduct);
  useEffect(() => {
    const fetchTopProduct = async () => {
      try {
        const response = await axios.get(
          "https://njs.iretiensemble.com/products/get-top-product",
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${token}`
            },
          }
        );

        if (response.status == 200 || response.status == 201) {
          // console.log(response.data);
          setTopProductsData(response.data.topProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllTopProduct = async () => {
      try {
        const response = await axios.get(
          "https://njs.iretiensemble.com/products/get-all-products",
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${token}`
            },
          }
        );

        if (response.status == 200 || response.status == 201) {
          // console.log(response.data);
          dispatch(actionProducts.fetchProductsSuccess(response.data.products));
        } else {
          // dispatch(actionProducts.fetchProductsFailure(response.data.error));
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopProduct();
    fetchAllTopProduct();
  }, [dispatch]);

  useEffect(() => {
    document.querySelector(".header").classList.remove("position-relative");
    document.querySelector(".footer-middle").classList.add("border-0");

    return () => {
      document.querySelector(".footer-middle").classList.remove("border-0");
      document.querySelector(".header").classList.add("position-relative");
    };
  }, []);

  useEffect(() => {
    dispatch(singleProductActions.setSingleProduct(null));
    dispatch(relatedProductActions.setRelatedProducts([]));
  },[])

  function openVideoModal(e) {
    e.preventDefault();
    props.showVideo();
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div
      className="main home-page skeleton-body"
      style={{ background: "#f8f7f3" }}
    >
      <div className="intro-slider-container mb-0">
        <OwlCarousel
          adClass="intro-slider owl-theme owl-nav-inside owl-light"
          options={introSlider}
          style={{ background: "#f8f7f3" }}
        >
          <div
            className="intro-slide"
            style={{ backgroundImage: "url(Example4.jpg)" }}
          >
            {/* <video autoPlay loop muted playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
                            <source src="SampleVideo.mp4" type="video/mp4" />
                        </video> */}
            <div className="container intro-content text-center">
              <Reveal keyframes={fadeInUpShorter} delay={100} duration={500}>
                <>
                  {/* <h3 className="intro-subtitle text-white">Don’t Miss</h3> */}

                  <h3
                    className="intro-title text-white"
                    style={{ fontFamily: "'Gotham Black',sans-serif" }}
                  >
                    Spring Summer <span>'24</span>
                  </h3>
                  {/* <h7 className="intro-title text-white" style={{ fontFamily: "'Gotham Black',sans-serif",fontSize:"5rem" }}>'24</h7> */}
                  <div className="intro-text text-white">Afra</div>
                  <ALink
                    href="/shop/sidebar/3cols"
                    className="btn btn-primary"
                    style={{
                      fontFamily: "'Gotham Black',sans-serif",
                      fontSize: "1.5rem",
                    }}
                  >
                    Discover Now
                  </ALink>
                </>
              </Reveal>
            </div>
          </div>
        </OwlCarousel>
      </div>

      {/* <Reveal keyframes={fadeIn} delay={100} duration={500} triggerOnce style={{ background: "#f8f7f3" }}>
                <OwlCarousel adClass="brands-border owl-simple brand-carousel mb-5" options={brandSlider}>
                    {
                        homeData.brands.map((brand, index) => (
                            <ALink href="#" className="brand mr-0" key={index} >
                                <img src={brand.image} alt="brand" width={brand.width} height={brand.height} />
                            </ALink>
                        ))
                    }
                </OwlCarousel>
            </Reveal> */}

      <div className="container mt-5" style={{ background: "f8f87f3" }}>
        <div className="banner-group">
          <div className="row">
            <div className="col-md-6">
              <div className="banner banner-border banner-1">
                <ALink
                  href="/shop/sidebar/3cols/?category=DressJumpSuits"
                  className="lazy-media"
                >
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="banner"
                    src="Example1.jpg"
                    threshold={200}
                    width="574"
                    height="auto"
                    effect="blur"
                  />
                </ALink>

                <div className="banner-content" style={{ top: "17%" }}>
                  <h4 className="banner-subtitle">
                    <ALink
                      href="/shop/sidebar/3cols/?category=DressJumpSuits"
                      style={{
                        fontFamily: "'Gotham Thin',sans-serif",
                        fontSize: "1.8rem",
                      }}
                    >
                      Dresses & Jumpsuits
                    </ALink>
                  </h4>
                  <h3 className="banner-title">
                    <ALink
                      href="/shop/sidebar/3cols/?category=DressJumpSuits"
                      style={{
                        fontFamily: "'Gotham Medium',sans-serif",
                        fontSize: "1.8rem",
                      }}
                    >
                      <span style={{ letterSpacing: "0.8px" }}>AM TO PM</span>
                    </ALink>
                  </h3>
                  <ALink
                    href="/shop/sidebar/3cols/?category=DressJumpSuits"
                    className="btn btn-outline-primary-2 banner-link"
                    style={{
                      fontFamily: "'Gotham Thin',sans-serif",
                      fontSize: "1.3rem",
                    }}
                  >
                    View Products<i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="banner banner-border-hover banner-2">
                <ALink
                  href="/shop/sidebar/3cols/?category=Topwear"
                  className="lazy-media"
                >
                  <img src="Example2.jpg" alt="Banner" />
                </ALink>

                <div className="banner-content">
                  <h4 className="banner-subtitle">
                    <ALink
                      href="/shop/sidebar/3cols/?category=Topwear"
                      style={{
                        fontFamily: "'Gotham Thin',sans-serif",
                        fontSize: "1.8rem",
                        color: "#f8f7f3",
                      }}
                    >
                      Shirts & Tops
                    </ALink>
                  </h4>
                  <h3 className="">
                    <ALink
                      href="/shop/sidebar/3cols/?category=Topwear"
                      style={{
                        fontFamily: "'Gotham Medium',sans-serif",
                        fontSize: "1.8rem",
                      }}
                    >
                      <span style={{ letterSpacing: "0.8px" }}>Timeless</span>
                    </ALink>
                  </h3>
                  <ALink
                    href="/shop/sidebar/3cols/?category=Topwear"
                    className="btn btn-outline-primary-2 banner-link"
                    style={{
                      fontFamily: "'Gotham Thin',sans-serif",
                      fontSize: "1.3rem",
                      color: "#f8f7f3",
                    }}
                  >
                    View Products<i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>

              <div className="banner banner-border-hover banner-2">
                <ALink
                  href="/shop/sidebar/3cols/?category=SetsCoordStyledSets"
                  className="lazy-media"
                >
                  <img src="Example3.jpg" alt="Banner" />
                </ALink>

                <div className="banner-content">
                  <h4 className="banner-subtitle">
                    <ALink
                      href="/shop/sidebar/3cols/?category=SetsCoordStyledSets"
                      style={{
                        fontFamily: "'Gotham Thin',sans-serif",
                        fontSize: "1.8rem",
                        color: "#f8f7f3",
                      }}
                    >
                      Style Sets
                    </ALink>
                  </h4>
                  <h3 className="banner-title">
                    <ALink
                      href="/shop/sidebar/3cols/?category=SetsCoordStyledSets"
                      style={{
                        fontFamily: "'Gotham Medium',sans-serif",
                        fontSize: "1.8rem",
                        color: "#f8f7f3",
                      }}
                    >
                      <span>Multifunctional</span>
                    </ALink>
                  </h3>
                  <ALink
                    href="/shop/sidebar/3cols/?category=SetsCoordStyledSets"
                    className="btn btn-outline-primary-2 banner-link"
                    style={{
                      fontFamily: "'Gotham Thin',sans-serif",
                      fontSize: "1.3rem",
                      color: "#f8f7f3",
                    }}
                  >
                    View Products<i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4"></div>

    
   
      <div className="container mb-5 ">
<div className="row">


     <div className="col-md-6">

    
      <img src={AboutImage} style={{ backgroundImage: `url(${AboutImage})`,width:"100%",height:"auto" ,objectFit:"cover",margin:"auto"}} alt="" />
      </div>
      <div className="col-md-6" >
        <p className=" " style={{fontWeight:"600",textAlign:"center",padding:"10px", marginTop:"10px"}}>Ireti for us is a symbol of hope, resilience, and continuation.</p>
        <p style={{textAlign:"justify"}}>
          Ireti is the representation of a vibrant world where creativity knows
          no bounds! Its not just another brand but a platform that celebrates
          the boundless imagination of artists. Here, talent takes center stage,
          and the spotlight shines on the incredible works that paint the
          tapestry of our diverse artistic community...
        </p>
        <div className="ReadMoreBtn">
          <ALink href="/pages/about" className="btn btn-primary btn-rounded btn-center">Read more</ALink>
        </div>
      </div>

      </div>

      </div>
      <div
        className="video-banner video-banner-bg bg-image text-center"
        style={{ backgroundImage: "url(output.jpg)" }}
      >
        <div className="container">
          <Reveal
            keyframes={fadeInUpShorter}
            delay={200}
            duration={1000}
            triggerOnce
          >
            <>
              <h3 className="video-banner-title h1 text-white">
                <span
                  style={{
                    fontFamily: "'Gotham Thin',sans-serif",
                    fontSize: "3.5rem",
                  }}
                >
                  AFRA
                </span>
                <strong>
                  Spring <i>/</i> Summer’24
                </strong>
              </h3>
              <a
                href="https://ik.imagekit.io/dfgmy6xar/SampleVideo.mp4?updatedAt=1715404980849"
                className="btn-video btn-iframe"
                onClick={openVideoModal}
              >
                <i className="icon-play"></i>
              </a>
            </>
          </Reveal>
        </div>
      </div>

      {/* <SpecialCollection products={ allProduct } loading={ loading } /> */}

      <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
        <NewCollection products={allProduct} loading={loading} />
      </Reveal>

      <div className="mb-2"></div>

      {/* <div className="container">
                <div className="cta cta-separator mb-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 200 } duration={ 1000 } triggerOnce>
                                <div className="cta-wrapper cta-text text-center">
                                    <h3 className="cta-title">Shop Social</h3>
                                    <p className="cta-desc">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>

                                    <div className="social-icons social-icons-colored justify-content-center">
                                        <ALink href="#" className="social-icon social-facebook" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                        <ALink href="#" className="social-icon social-twitter" title="Twitter"><i className="icon-twitter"></i></ALink>
                                        <ALink href="#" className="social-icon social-instagram" title="Instagram"><i className="icon-instagram"></i></ALink>
                                        <ALink href="#" className="social-icon social-youtube" title="Youtube"><i className="icon-youtube"></i></ALink>
                                        <ALink href="#" className="social-icon social-pinterest" title="Pinterest"><i className="icon-pinterest"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-6">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 200 } duration={ 1000 } triggerOnce>
                                <div className="cta-wrapper text-center">
                                    <h3 className="cta-title">Get the Latest Deals</h3>
                                    <p className="cta-desc">and <br />receive <span className="text-primary">$20 coupon</span> for first shopping</p>

                                    <form action="#">
                                        <div className="input-group">
                                            <input type="email" className="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" required />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary btn-rounded" type="submit"><i className="icon-long-arrow-right"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div> */}

      <div className="pt-7 pb-4" style={{ backgroundColor: "#f8f7f3" }}>
        <div className="container">
          <div className="instagram-feed-container">
            <div className="row">
              {/* {
                                instgramDetails && instgramDetails?.length>0 && instgramDetails.slice( 0, 2 ).map( ( instagram, index ) => (
                                    <div
                                        className="feed-col"
                                        key={index}
                                    >
                                        <div className="instagram-feed">
                                            <img src={ instagram.thumbnailUrl } alt="img" width="218" height="218" />

                                            <div className="instagram-feed-content">
                                                <ALink href="#">
                                                    <i className="icon-heart-o"></i>
                                                </ALink>
                                                <ALink href="#">
                                                    <i className="icon-comments"></i>
                                                </ALink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            } */}

              {/* <div className="feed-col feed-col-title">
                                <div className="instagram-feed-title">
                                    <i className="icon-instagram"></i>
                                    <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"2rem"}}>
                                        @iretiensemble
                                    <br />on instagram
                                </p>
                                    <ALink href="www.instagram.com" style={{fontFamily:"'Gotham Black',sans-serif", fontSize:"1.5rem"}}>FOLLOW</ALink>
                                </div>
                            </div> */}

              {/* {
                                instgramDetails && instgramDetails.length>2 && instgramDetails.slice( 2, 9 ).map( ( instagram, index ) => (
                                    <div
                                        className="feed-col"
                                        key={index}
                                    >
                                        <div className="instagram-feed">
                                            <img src={ instagram.thumbnailUrl } alt="img" width="218" height="218" />

                                            <div className="instagram-feed-content">
                                                <ALink href="#">
                                                    <i className="icon-heart-o"></i>
                                                    {instagram.likes}
                                                </ALink>
                                                <ALink href="#">
                                                    <i className="icon-comments"></i>
                                                    {instagram.comments}
                                                </ALink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            } */}
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rocket"></i>
                </span>

                <div className="icon-box-content">
                  <h3
                    className="icon-box-title"
                    style={{ fontFamily: "'Gotham Medium',sans-serif" }}
                  >
                    Payment & Delivery
                  </h3>
                  <p style={{ fontFamily: "'Gotham Thin',sans-serif" }}>
                    Free shipping on all orders
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-refresh"></i>
                </span>

                <div className="icon-box-content">
                  <h3
                    className="icon-box-title"
                    style={{ fontFamily: "'Gotham Medium',sans-serif" }}
                  >
                    Return & Refund
                  </h3>
                  <p style={{ fontFamily: "'Gotham Thin',sans-serif" }}>
                    No return policy
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-life-ring"></i>
                </span>

                <div className="icon-box-content">
                  <h3
                    className="icon-box-title"
                    style={{ fontFamily: "'Gotham Medium',sans-serif" }}
                  >
                    Quality Support
                  </h3>
                  <p style={{ fontFamily: "'Gotham Thin',sans-serif" }}>
                    Always online feedback 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsletterModal />
    </div>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(
  connect(null, { ...actions })(Home)
);
