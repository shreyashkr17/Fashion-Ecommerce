import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { useState, useEffect } from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import ProductTwelve from '~/components/features/products/product-twelve';

import { catFilter } from '~/utils';
import { trendingSlider } from '~/utils/data';
import axios from 'axios';

function TrendyCollection ( props ) {
    const { products = [], loading } = props;
    // console.log(products)

    // const [smPicture, setSmPicture] = useState( true );

    // useEffect(() => {
    //     const fetchSmPicture = async() => {
    //         // const data = {productSlug: }
    //         try {
    //             const response = await axios.post('https://njs.iretiensemble.com/products/get-sm-pictures',)
    //         } catch (error) {
                
    //         }
    //     }
    // })

    return (
        <div className="container trendy-products">
            <Tabs selectedTabClassName="show" defaultIndex={ 0 }>
                {products?.length>0 ?<div className="heading heading-center mb-3">
                    <h2 className="title" style={{fontFamily: '"Italianno", cursive',fontWeight: "600",fontSize:"4.8rem"}}>Trendy  Products</h2>
                    <TabList className="nav nav-pills justify-content-center" role="tablist">
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>All</span>
                        </Tab>

                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Women</span>
                        </Tab>

                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Men</span>
                        </Tab>

                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Accessories</span>
                        </Tab>
                    </TabList>
                </div>:null}

                <div className="tab-content tab-content-carousel">
                    <TabPanel>
                        <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ trendingSlider } isTheme={ false }>
                            {products?.slice(0,5).map((item,index)=>(
                                <ProductTwelve product={item} index={index}/>
                            ))}
                        </OwlCarousel>
                    </TabPanel>
                    <TabPanel>
                        <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ trendingSlider } isTheme={ false }>
                            {
                                catFilter( products, [ 'women' ] ).slice( 0, 5 ).map( ( item, index ) =>
                                    <ProductTwelve
                                        product={ item }
                                        key={ index } />
                                    )
                            }
                        </OwlCarousel>
                    </TabPanel>
                    <TabPanel>
                        <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ trendingSlider } isTheme={ false }>
                            {
                                catFilter( products, [ 'men' ] ).slice( 0, 5 ).map( ( item, index ) =>
                                    <ProductTwelve
                                        product={ item }
                                        key={ index } 
                                    />
                            )}
                        </OwlCarousel>
                    </TabPanel>
                    <TabPanel>
                        <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ trendingSlider } isTheme={ false }>
                            {
                                catFilter( products, [ 'men' ] ).slice( 0, 5 ).map( ( item, index ) =>
                                    <ProductTwelve
                                        product={ item }
                                        key={ index } />
                                    )
                            }
                        </OwlCarousel>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default TrendyCollection;