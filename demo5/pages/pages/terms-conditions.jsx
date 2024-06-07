import React from 'react'
import ALink from '~/components/features/alink'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

function termsCond() {
  return (
    <div className="main" style={{background:"#f8f7f3"}}>
        <nav className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/" style={{fontFamily:"'Gotham Light',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Light',sans-serif", fontWeight:"800"}}>Terms & Conditions</li>
                </ol>
            </div>
        </nav>
        <div className="main">
            <div className="col-12" style={{textAlign:"center"}}>
                <h2 className="title mb-3">TERMS & CONDITIONS</h2>
            </div>
            <div className="" style={{padding:"0 50px"}}>
                <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                    <TabList className="nav nav-pills justify-content-center" id="tabs-6" role="tablist">
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>LEGAL MENTIONS</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>ONLINE TERMS AND CONDITIONS OF SALE</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>GENERAL TERMS OS USE</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link" style={{fontFamily:"'Gotham Medium',sans-serif"}}>COOKIES</span>
                        </Tab>
                    </TabList>
                    <div className="tab-pane tab-content">
                        <TabPanel>
                            <p style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}}>This website is operated by Ireti, and the terms "we", "us", and "our" refer to Ireti throughout the site.
                            <br />
                            <br />
                            By accessing or using the website, you agree to be bound by these Terms of Service. The Terms of Service apply to all users of the site, including browsers, vendors, customers, merchants, and content contributors.
                            <br />
                            <br />
                            Ireti reserves the right to update, change, or replace any part of these Terms of Service by posting updates and changes to the website.Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
                        </TabPanel>
                        <TabPanel>
                            <p  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}}>You represent that you are at least the age of majority in your state or province of residence.
                            <br />
                            You may not use Ireti's products for any illegal or unauthorized purpose, nor violate any laws in your jurisdiction.You must not transmit any worms, viruses, or any code of a destructive nature.
                            <br />
                            A breach or violation of the Terms will result in an immediate termination of your Services.
                            Ireti reserves the right to refuse service to anyone for any reason at any time.You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission.</p>

                        </TabPanel>
                        {/* <TabPanel>
                            <p>The company ELSA SCHIAPARELLI SAS (simplified joint-stock company, with its registered office at 21, Place Vendôme - 75001 Paris - registered at the Paris Trade Company Register under the number 572 161 123) in its capacity as controller, undertakes to that the collection and processing of your personal data, made from the site www.schiaparelli.com (hereinafter the Site) comply with the Data Protection Act of 6 January 1978, amended by Law No. 2004-801 of 6 August 2004 relating to the protection of individuals with regard to the processing of personal data and the European Regulation 2016/679 of 27/04/2016 on the protection of personal data.
                            <br />
                            <br />
                            As part of this commitment, ELSA SCHIAPARELLI has implemented a Privacy Policy to provide you with all information regarding our practices regarding the collection, use and disclosure of information about you, which has been collected via our Site.
                            <br />
                            <br />
                            By browsing our Site, you agree to the collection, use and disclosure of your personal data as described in this Privacy Policy.
                            <br />
                            <br />
                            In case of modification or update, the revised Privacy Policy will be published on our Site, with the date of its update.
                            <br />
                            <br />
                            We invite you to regularly review our Privacy Policy, to stay informed of any changes that may have occurred.</p>
                        </TabPanel> */}
                        <TabPanel>
                            <p  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}}>Ireti is not responsible if information on the site is not accurate, complete, or current. The material on the site is provided for general information only and should not be solely relied upon for making decisions.
                            <br />
                            <br />
                            Prices for Ireti's products are subject to change without notice.
                            <br />
                            <br />
                            Ireti reserves the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.Ireti does not warrant the quality of any products, services, information, or other material purchased or obtained through the Service.
                            <br />
                            <br />
                            Ireti may provide access to third-party tools and is not responsible for their content or accuracy.</p>
                        </TabPanel>
                        <TabPanel>
                            <p  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}}>When you connect to our Site, various cookies may be installed, subject to your choice, in your terminal (whether it is a computer, tablet or mobile phone, hereinafter referred to as your Terminal) allowing us to recognize the browser of your Terminal during the validity period of the cookie concerned.
                            <br />
                            <br />
                            Thanks to our Cookie Policy, we specify what a cookie is, we specify the cookies issued by our Site and indicate the means at your disposal to make settings for these cookies. At any time, you can change your preferences by clicking on the following link:</p>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    </div>
  )
}

export default termsCond
