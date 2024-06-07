import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import StickyBox from "react-sticky-box";
// import {useState, } from 'react';

import withApollo from "~/server/apollo";
import { GET_PRODUCT } from "~/server/queries";

import Breadcrumb from "~/components/partials/product/breadcrumb";
import GallerySticky from "~/components/partials/product/gallery/gallery-sticky";
import Gallery from "~/components/partials/product/gallery/gallery";
import DetailOne from "~/components/partials/product/details/detail-one";
import InfoThree from "~/components/partials/product/info-tabs/info-three";
import RelatedProductsOne from "~/components/partials/product/related/related-one";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import product from "~/store/product";
import { actions as singleProductActions } from "~/store/singleProduct";
import { actions as relatedProductActions } from "~/store/related-product";
import CloseIcon from "@mui/icons-material/Close";

function ProductSticky() {
  const dispatch = useDispatch();
  const slug = useRouter().query.slug;
  // console.log(slug)
  const formattedTitle = slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const user = useSelector((state) => state.auth.user);
  // const productSingle = useSelector((state) => state.singleProduct.singleProduct);
  // console.log(productSingle)
  // const productSlug = productSingle?.productSlug;
  // const [productData, setProductData] = useState();
  const [sizechart, setSizechart] = useState(false);

  const handlesizechart = () => {
    setSizechart(!sizechart);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/products/get-single-product-detail",
        { productSlug: slug },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200 || response.status == 201) {
        // console.log(response.data.product)
        // setProductData(response.data.product)
        dispatch(singleProductActions.setSingleProduct(response.data.product));
      } else {
        console.log(response.data.error);
        dispatch(singleProductActions.setSingleProduct(null));
      }
    } catch (error) {
      console.log(error);
      dispatch(singleProductActions.setSingleProduct(null));
    }
  };

  const fetchRelatedProduct = async () => {
    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/products/get-related-product-by-slug",
        { productSlug: slug },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(
          relatedProductActions.setRelatedProducts(
            response.data.relatedProducts
          )
        );
      } else {
        dispatch(relatedProductActions.setRelatedProducts([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(relatedProductActions.setRelatedProducts([]));
    }
  };
  useEffect(() => {
    fetchRelatedProduct();
    fetchProduct();
  }, [dispatch, slug]);

  const productData = useSelector((state) => state.singleProduct.singleProduct);
  const relateProduct = useSelector(
    (state) => state.relatedProduct.relatedProducts
  );
  const filteredProduct = relateProduct.filter((product) => product !== null);
  // console.log(filteredProduct);
  // console.log(filteredProduct)
  // console.log(relateProduct)
  // console.log(productData)

  return (
    <>
      <div className="main" style={{ background: "#f8f7f3" }}>
        <Breadcrumb formattedTitle={formattedTitle} current="Sticky Info" />
        <div className="page-content">
          <div className="container skeleton-body">
            <div className="product-details-top">
              <div className={`row skel-pro-single sticky loaded`}>
                <div className="col-md-6">
                  <div className="skel-product-gallery"></div>
                  {<GallerySticky product={productData} />}
                </div>
                <div className="col-md-6">
                  <StickyBox className="sticky-content" offsetTop={70}>
                    <div className="entry-summary row">
                      <div className="col-md-12">
                        <div className="entry-summary1 mt-2 mt-md-0"></div>
                      </div>
                      <div className="col-md-12">
                        <div className="entry-summary2"></div>
                      </div>
                    </div>
                    {
                      <>
                        <DetailOne
                          handlesizechart={handlesizechart}
                          product={productData}
                        />
                        <InfoThree product={productData} />
                      </>
                    }
                  </StickyBox>
                </div>
              </div>
            </div>

            <RelatedProductsOne products={filteredProduct} />
          </div>
        </div>
        {sizechart && (
          <div
            className="sizechartcontainer"
            style={{
              backgroundColor: "#4d4d4d",
              color: "white",
              border: "none",
              
            }}
          >
            <div
              className="headerSize"
              style={{
                backgroundColor: "#4d4d4d",
                color: "white",
                position: "relative",
                height: "auto",
              }}
            >
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "15px",
                }}
              >
                <span className="headerTitle">
                  <h2 style={{ color: "white", textAlign: "center" }}>
                    Size Guide
                  </h2>
                </span>
                <div>
                  <p style={{ marginBottom: "10px" ,color:"white" ,fontWeight:"lighter" }}>
                    These are body measurements. All measurements in inches.
                  </p>
                </div>
              </div>

              <div
                className="hover"
             
                style={{
                  zIndex:"100",
                  height: "30px",
                  width: "30px",
                  color: "black",
                  textAlign: "center",
                  position: "absolute",
                  top: "7px",
                  right: "7px",
                  padding: "1px",
                  backgroundColor: "white",
                  borderRadius: "100%",
                  cursor:"pointer"
                }}
              >
                <CloseIcon
                  onClick={() => handlesizechart()}
                
               
                />
              </div>
            </div>
            <div
              className="innerSizeTable"
              style={{ backgroundColor: "#4d4d4d" }}
            >
              <table>
                <tr>
                  <th>SIZE</th>

                 
                  <th>BUST</th>
                  <th>WAIST</th>
                  <th>HIPS</th>
                </tr>

                <tr>
                  <td>XS</td>

                 
                  <td>33</td>
                  <td>26</td>
                  <td>35</td>
                </tr>
                <tr>
                  <td>S</td>

                  
                  <td>35</td>
                  <td>28</td>
                  <td>37</td>
                </tr>
                <tr>
                  <td>M</td>
                 

                  <td>37</td>
                  <td>30</td>
                  <td>39</td>
                </tr>
                <tr>
                  <td>L</td>
                  

                  <td>39</td>
                  <td>32</td>
                  <td>41</td>
                </tr>
                <tr>
                  <td>XL</td>
                 

                  <td>41</td>
                  <td>34</td>
                  <td>43</td>
                </tr>
                <tr>
                  <td>XXL</td>

              
                  <td>43.5</td>
                  <td>36</td>
                  <td>45.5</td>
                </tr>
              </table>
            </div>
            <p
             style={{color:"white",marginBottom:"10px"}}>The following chart will help you match our size scheme to your usual size</p>
          </div>
        )}
      </div>
    </>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(ProductSticky);
