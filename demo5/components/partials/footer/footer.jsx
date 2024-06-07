import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify"
import ALink from '~/components/features/alink';

function Footer () {
    const router = useRouter( "" );
    const [ isBottomSticky, setIsBottomSticky ] = useState( false );
    const [ containerClass, setContainerClass ] = useState( 'container' );
    const [email, setEmail] = useState('');

    useEffect( () => {
        handleBottomSticky();
        setContainerClass( router.asPath.includes( 'fullwidth' ) ? 'container-fluid' : 'container' );
    }, [ router.asPath ] );

    useEffect( () => {
        window.addEventListener( 'resize', handleBottomSticky, { passive: true } );
        return () => {
            window.removeEventListener( 'resize', handleBottomSticky );
        }
    }, [] )

    function handleBottomSticky () {
        setIsBottomSticky( router.pathname.includes( 'product/default' ) && ( window.innerWidth > 991 ) );
    }

    const handleSubmitSubscription = async () => {
        if (email === "") {
toast.warning("Please enter your email address")
            return;
        }

        try {
            const response = await axios.post('https://njs.iretiensemble.com/contactus/subscription-email', {email}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            if(response.status === 200 || response.status === 201){
                toast.success("You have successfully subscribed to our newsletter");
                setEmail('');
            }
            if(response.status === 400){
                toast.warning("You have already subscribed to our newsletter");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred, please try again later");
        }
    }

    return (
        <footer className="footer footer-2" style={{background:"#323C33"}}>
            <div className="footer-middle">
                <div className={ containerClass }>
                    <div className="row">
                        <div className="col-sm-4 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title" style={{color:"#f8f7f3"}}>Services</h4>

                                <ul className="widget-list">
                                    <li><ALink href="/pages/contact" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Connect</ALink></li>
                                    {/* <li><ALink href="/pages/about">Get In Touch</ALink></li> */}
                                    <li><ALink href="/pages/career" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Careers</ALink></li>
                                    <li><ALink href="/pages/shippingandpayments" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Shipping & Payments</ALink></li>
                                    {/* <li><ALink href="/pages/faq" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>FAQs</ALink></li> */}
                                    <li><ALink href="/pages/shipping" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Returns & Exchanges</ALink></li>
                                    <li><ALink href="/#" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Track Your Order</ALink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title" style={{color:"#f8f7f3"}}>Legals</h4>

                                <ul className="widget-list">
                                    <li><ALink href="/pages/terms-conditions" style={{fontFamily:"'Gotham Thin',sans-serif" , fontSize:"1.5rem"}}>Terms & Conditions</ALink></li>
                                    <li><ALink href="/pages/privacy" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Privacy Policy</ALink></li>
                                    {/* <li><ALink href="#">Returns</ALink></li> */}
                                    <li><ALink href="/shop/dashboard" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>My Accounts</ALink></li>
                                    {/* <li><ALink href="#">Terms and conditions</ALink></li>
                                    <li><ALink href="#">Privacy Policy</ALink></li> */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <div className="widget">
                                <h4 className="widget-title"  style={{color:"#f8f7f3"}}>Stay-Up-To-Date</h4>
                            </div>
                            <div className="page-content">
                                {/* <nav className="breadcrumb-nav"> */}
                                {/* <div className="container"> */}
                                    <div className="cta cta-horizontal cta-horizontal-box bg-image mb-5" style={ { backgroundPosition: `center right`,paddingTop:"0rem" } }>
                                    <p className="mb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Subscribe to our newsletter and be the first to learn about our latest news.</p>
                                        <div className="row align-items-center">
                                            <div className="col-lg-12 col-xl-12">
                                                    <div className="input-group">
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" required  style={{fontFamily:"'Gotham Thin',sans-serif"}}/>
                                                        <div className="input-group-append">
                                                            <button onClick={() => handleSubmitSubscription()} className="btn btn-rounded"><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Subscribe</span><i className="icon-long-arrow-right"></i></button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="social-icons social-icons-color mt-2">
                                            <span className="social-label" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.5rem"}}>Social Media</span>

                                            <ALink href="#" className="social-icon social-facebook" rel="noopener noreferrer" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                            <ALink href="#" className="social-icon social-twitter" rel="noopener noreferrer" title="Twitter"><i className="icon-twitter"></i></ALink>
                                            <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon social-instagram" rel="noopener noreferrer" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            <ALink href="#" className="social-icon social-youtube" rel="noopener noreferrer" title="Youtube"><i className="icon-youtube"></i></ALink>
                                            <ALink href="#" className="social-icon social-pinterest" rel="noopener noreferrer" title="Pinterest"><i className="icon-pinterest"></i></ALink>
                                        </div>
                                    </div>
                                    
                                {/* </div> */}
                                {/* </nav> */}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                {/* <div className={ containerClass }>
                    <p className="footer-copyright mb-0">Copyright © { ( new Date() ).getFullYear() } Molla Store. All Rights Reserved.</p>
                    <ul className="footer-menu">
                        <li><ALink href="#">Terms Of Use</ALink></li>
                        <li><ALink href="#">Privacy Policy</ALink></li>
                    </ul>

                    
                </div> */}
            </div>
            {
                isBottomSticky ?
                    <div className="mb-10"></div>
                    : ""
            }
        </footer>
    );
}

export default React.memo( Footer );