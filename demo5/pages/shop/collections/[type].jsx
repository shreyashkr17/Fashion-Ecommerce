import React, { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "~/pages/404";
import { useDispatch, useSelector } from "react-redux";
import { actions as collectionActions } from "~/store/collection";
import Harshita from "@/assets/Harshita.jpg";
// import ShopListFour from '~/components/partials/shop/list/shop-list-four';
import ProductEleven from "~/components/features/products/product-eleven";
import { actions as productallActions } from "~/store/productdetailall";
// import { useSelector, useDispatch } from 'react-redux';

function collections() {
  const router = useRouter();
  const dispatch = useDispatch();
  const getAllProducts = useSelector(
    (state) => state.productalldetail.products
  );
  // console.log(getAllProducts);

  const type = router.query.type;

  const filterProducts = getAllProducts.filter((product) => {
    return product.products?.productCategory?.some((cat) => cat.name === type);
  });
  // console.log(filterProducts);

  let collectionName = "";
  let collectionSubName = "";
  if (type == "harshitaSemiColon") {
    collectionName = "Harshita";
  } else if (type == "seasonSpringSummer" || type == "seasonFallWinter") {
    collectionName = "By Season";
  }

  if (type == "harshitaSemiColon") {
    collectionSubName = "SemiColon";
  } else if (type == "projectFallWinter") {
    collectionSubName = "Fall Winter";
  } else if (type == "seasonSpringSummer") {
    collectionSubName = "Spring Summer";
  } else {
    collectionSubName = "Fall Winter";
  }

  const [pageTitle, setPageTitle] = useState("Project Spring Summer");
  const [navbarTitle, setNavbarTitle] = useState("Spring Summer");

  const [collectionDetail, setCollectionDetail] = useState();
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://njs.iretiensemble.com/products/get-all-products-variant-lgPics-smPics",
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${user.token}`
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(productallActions.setProducts(response.data.fetchedData));
      } else {
        // console.log(response.data);
        dispatch(productallActions.fetchProductsAllSuccess([]));
      }
    } catch (error) {
      // dispatch(productallActions.fetchProductsAllSuccess([]));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchCollectionDetail = async () => {
    const data = {
      collectionName: collectionName,
      collectionSubName: collectionSubName,
    };

    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/collections/get-single-collection",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // console.log(response.data);
        // setCollectionDetail(response.data.collectionDetail);
        dispatch(
          collectionActions.setCollectionDetails(response.data.collectionDetail)
        );
      } else {
        console.log("Error");
        dispatch(collectionActions.setCollectionDetails([]));
      }
      // console.log(response.data);
      // setCollectionDetail(response.data.error || response.data);
    } catch (error) {
      console.log(error);
      dispatch(collectionActions.setCollectionDetails([]));
    }
  };

  useEffect(() => {
    if (type && collectionName && collectionSubName) {
      fetchCollectionDetail();
    }
  }, []);

  const collection = useSelector((state) => state.collection.collections);
  // console.log(collection);

  const openVideoModal = (e) => {
    e.preventDefault();
    props.showVideo();
  };

  useEffect(() => {
    if (type == "harshitaSemiColon") {
      setPageTitle("Harshita");
      setNavbarTitle("AFRA");
    } else if (type == "projectFallWinter") {
      setPageTitle("By Project");
      setNavbarTitle("Fall Winter");
    } else if (type == "seasonSpringSummer") {
      setPageTitle("By Season");
      setNavbarTitle("Spring Summer");
    } else {
      setPageTitle("By Season");
      setNavbarTitle("Fall Winter");
    }
  }, [type]);

  // if(!collection || collection.length === 0){
  //     return <h1><Error/></h1>
  // }
  return (
    <>
      <div className="main" style={{ background: "#f8f7f3" }}>
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink
                  style={{ fontFamily: "'Gotham Thin',sans-serif" }}
                  href="/"
                >
                  Home
                </ALink>
              </li>
              <li
                style={{ fontFamily: "'Gotham Thin',sans-serif" }}
                className="breadcrumb-item active"
              >
                {pageTitle}
              </li>
              <li
                style={{
                  fontFamily: "'Gotham Thin',sans-serif",
                  fontWeight: "800",
                }}
                className="breadcrumb-item active"
              >
                {navbarTitle}
              </li>
            </ol>
          </div>
        </nav>
        <div className="page-content">
          {type === "harshitaSemiColon" && (
            <div className="containerArtist">
              <div className="innerContaArtist">
                <div className="leftConta">
                  <div>
                    <h2 className="title mb-3 text-center">About Artist</h2>
                    <p
                      style={{
                        fontFamily: "'Gotham Thin',sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Hi, my name is Harshita Gupta, a passionate textile
                      designer with a love for color, texture, and innovation.
                      Nestled in the heart of Mathura, the birthplace of Lord
                      Krishna. After studying bachelor of textile design from
                      NIFT Bhopal, I embarked on a journey of learning and
                      experimenting with various mediums and techniques to find
                      my unique style as an artist. Along the way, I discovered
                      a passion for exploring the abstract modern art and love
                      for different surface design techniques. I am deeply
                      passionate about collaboration and believe that the most
                      meaningful designs emerge from a synergy of ideas
                      and perspectives ,so is this collection. I want to describe
                      the artworks which are digitally made inspired from grunge
                      rustic look with minimal subtle colours with a tinge of an
                      accent colour which gives the artwork a different look
                      with the amalgamation of different textures and techniques
                      in different mediums. At the heart of my design philosophy
                      lies a commitment to storytelling through textiles. In
                      this collection, each design is a reflection of the
                      brand's identity, values, and aspirations, meticulously
                      crafted to resonate with the audience and leave a lasting
                      impression. Every pattern, colour, and texture aligns
                      seamlessly with the vision of the brand.
                    </p>
                  </div>
                </div>
                <div className="rightConta">
                  {/* <img src={Harshita} alt="" /> */}
                  <video
                    src="outputHarshita.mp4"
                    autoplay="true"
                    loop="true"
                    muted="true"
                    width={300}
                  />
                </div>
              </div>
            </div>
          )}
          {type === "seasonSpringSummer" && (
            <div className="containerArtist">
              <h2 className="title mb-3 text-center">About Collection</h2>
              <div className="innerContaArtist">
                <div className="leftConta1">
                  <p
                    style={{
                      fontFamily: "'Gotham Thin',sans-serif",
                      fontWeight: "800",
                    }}
                  >
                    It needs to be mentioned that nature is often used as a
                    source of fashion inspiration. Most shapes and structures
                    that are formed naturally are incredibly close to
                    perfection. Every print, colour, motif, embroidery and
                    silhouette in the AFRA'24 is inspired from elements of Afra,
                    a hebrew name for earth.
                    <br />
                    <br />
                    Along with the elements of the planet we also have the core
                    of fashion that lives inside each person.
                    <br />
                    <br />
                    At Ireti our manner is simple, functional and full of
                    character.
                  </p>
                </div>
                <div className="rightConta">
                  {/* <img src={Harshita} alt="" /> */}
                  {/* <video src="outputHarshita.mp4" autoplay="true" loop="true" muted="true" width={300} /> */}
                </div>
              </div>
            </div>
          )}
          {collection &&
            collection?.map((collect, index) => (
              <>
                <div className="container">
                  <hr className="mt-5 mb-4" />
                  <h2 className="title mb-3 text-center">
                    {collect.collectionTitle}
                  </h2>
                </div>

                <div className="video-banner video-banner-poster text-center">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h3 className="video-banner-title h3">
                          <span
                            style={{
                              fontFamily: "'Gotham Medium',sans-serif",
                              fontWeight: "600",
                            }}
                          ></span>
                          Story
                        </h3>

                        <p
                          style={{
                            fontFamily: "'Gotham Thin',sans-serif",
                            fontSize: "1.65rem",
                          }}
                        >
                          {collect.colectionDescription}
                        </p>
                      </div>

                      <div className="col-md-6">
                        {collect.collectionType === "video" ? (
                          <div className="video-poster">
                            <video
                              src={collect?.collectionSrcURl}
                              autoplay
                              muted
                              loop
                              width={200}
                            ></video>
                          </div>
                        ) : (
                          <div className="video-poster">
                            <div className="lazy-overlay"></div>

                            <LazyLoadImage
                              alt="poster"
                              width={300}
                              // height={ 390 }
                              src={collect.collectionSrcURl}
                              threshold={200}
                              effect="opacity"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

          {filterProducts ? (
            type === "seasonSpringSummer" ? (
              <div className="collectionProducts mt-2 mb-2">
                <h1>Spring Summer 2024 Products</h1>
              </div>
            ) : type === "harshitaSemiColon" ? (
              <div className="collectionProducts mt-2 mb-2">
                <h1>
                  Harshita{" "}
                  <span style={{ fontFamily: "'Gotham Light',sans-serif" }}>
                    X
                  </span>{" "}
                  Afra Products
                </h1>
              </div>
            ) : null
          ) : null}

          {filterProducts ? (
            filterProducts.length < 4 ? (
              <div className="collectionListMain">
                <div className="collectionProductCont1">
                  {filterProducts?.map((product) => (
                    <ProductEleven product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="collectionListMain">
                <div className="collectionProductCont">
                  {filterProducts?.map((product) => (
                    <ProductEleven product={product} />
                  ))}
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}

export default collections;
