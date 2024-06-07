import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import ALink from '~/components/features/alink';
import {toast} from "react-toastify";
const MapComponent = ( { text } ) => <div>{ text }</div>;

function Contact () {
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [querySubject, setQuerySubject] = useState('');
    const [queryMessage, setQueryMessage] = useState('');

    const handleSenderName = (e)=>{
        setSenderName(e.target.value);
    }

    const handleSenderEmail = (e)=>{
        setSenderEmail(e.target.value);
    }

    const handleSenderPhone = (e)=>{
        setSenderPhone(e.target.value);
    }

    const handleQuerySubject = (e)=>{
        setQuerySubject(e.target.value);
    }

    const handleQueryMessage = (e)=>{
        setQueryMessage(e.target.value);
    }

    const data = {
        senderName,
        senderEmail,
        senderPhone,
        querySubject,
        queryMessage
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/contactus/post-query', data, {
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            if(response.status === 200 || response.status === 201){
                setSenderName('');
                setSenderEmail('');
                setSenderPhone('');
                setQuerySubject('');
                setQueryMessage('');
                toast.success('Query sent successfully');
            }else{
                console.log('Error sending query')
            }
        } catch (error) {
            console.log(error);
        }
    } 
    return (
        <div className="main" style={{background:"#f8f7f3"}}>
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Contact us</li>
                    </ol>
                </div>
            </nav>

            <div className="container">
                <div className="page-header page-header-big text-center" style={ { backgroundImage: `url(bg3.jpeg)` } }>
                    <h1 className="page-title text-white" style={{fontSize:"5rem"}}>Contact us<span className="text-white" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800", textTransform:"uppercase"}}>keep in touch with us</span></h1>
                </div>
            </div>

            <div className="page-content pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <h2 className="title mb-1">Contact Information</h2>
                            <p className="mb-3" style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>Thank you for visiting our fashion website! We value your feedback, questions, and inquiries.
                            <br />
                            Please feel free to reach out to us using the following contact information:
                            <br />
                            <span style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.6rem"}}>Customer Service: </span>For assistance with orders, returns, or general inquiries, our customer service team is available to help you. You can reach us via email <strong>iretiensemble@gmail.com</strong> during our business hours.
                             
                            <br />
                            <br />
                            <span style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.6rem"}}>Collaborations and Press Inquiries: </span>For media inquiries, project collaborations, or press-related matters, please contact our PR team at <strong> projectireti@gmail.com </strong> We welcome opportunities to collaborate with artists from all fields, influencers, brands, and media outlets.
                            <br />
                            <br />
                            <span style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.6rem"}}>Feedback and Suggestions:</span>We greatly appreciate your feedback and suggestions for improving our website and services. If you have any comments or suggestions, please email us at <strong>iretiensemble@gmail.com</strong>. Your input helps us enhance the shopping experience for all our customers.
                            <br />
                            <br />
                            <span style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.6rem"}}>Social Media:</span>
                            Stay connected with us on social media for the latest updates, promotions, and fashion inspiration. Follow us on Instagram <strong>@iretiensemble</strong> for daily fashion trends and exclusive offers.We strive to provide excellent customer service and look forward to assisting you with any inquiries you may have. Thank you for choosing Ireti for your fashion needs!
                            </p>
                            
                        </div>
                        <div className="col-lg-6">
                            <h2 className="title mb-1">Got Any Questions?</h2>
                            <p className="mb-2" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Use the form below to get in touch with the sales team</p>

                            <form className="contact-form mb-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="cname" className="sr-only">Name</label>
                                        <input value={senderName} onChange={handleSenderName} type="text" className="form-control" style={{fontFamily:"'Gotham Medium',sans-serif"}} id="cname" placeholder="Name *" required />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="cemail" className="sr-only">Email</label>
                                        <input value={senderEmail} onChange={handleSenderEmail} type="email" className="form-control"style={{fontFamily:"'Gotham Medium',sans-serif"}} id="cemail" placeholder="Email *" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="cphone" className="sr-only">Phone</label>
                                        <input value={senderPhone} onChange={handleSenderPhone} type="tel" className="form-control"style={{fontFamily:"'Gotham Medium',sans-serif"}} id="cphone" placeholder="Phone" />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="csubject" className="sr-only">Subject</label>
                                        <input type="text" value={querySubject} onChange={handleQuerySubject} className="form-control"style={{fontFamily:"'Gotham Medium',sans-serif"}} id="csubject" placeholder="Subject" />
                                    </div>
                                </div>

                                <label htmlFor="cmessage" className="sr-only">Message</label>
                                <textarea value={queryMessage} onChange={handleQueryMessage} className="form-control" cols="30" rows="4" style={{fontFamily:"'Gotham Medium',sans-serif"}} id="cmessage" required placeholder="Message *"></textarea>

                                <button onClick={handleSubmit} className="btn btn-outline-primary-2 btn-minwidth-sm">
                                    <span>SUBMIT</span>
                                    <i className="icon-long-arrow-right"></i>
                                </button>
                                <div className="page-content pb-0 mt-5">
                                    <div className="row">
                                        <div className="col-lg-6 mb-2 mb-lg-0">
                                            <p className="mb-1" style={{fontFamily:"'Gotham Black',sans-serif",fontSize:"1.6rem"}}>
                                                Operating Address:
                                            </p>
                                            <p>N.G. Textiles, Vijaymandi,</p>
                                            <p>Muradnagar,</p>
                                            <p>Ghaziabad,</p>
                                            <p>201206</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2 mb-lg-0">
                                            <p className="mb-1" style={{fontFamily:"'Gotham Black',sans-serif",fontSize:"1.6rem"}}>
                                                Contact Information: +918288939653
                                            </p>
                                            <p>Email: 
                                                <strong>
                                                    <ALink href="mailto:iretiensemble@gmail.com">
                                                         iretiensemble@gmail.com
                                                    </ALink>
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="mt-4 mb-5" />

                    
                </div>
            </div>
        </div>
    )
}

export default Contact;