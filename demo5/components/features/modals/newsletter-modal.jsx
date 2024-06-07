import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'react-modal';
import Cookie from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RedirectPopUp from './redirectPopUp'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import {  toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(51,51,51,0.6)',
        zIndex: '9001'
    }
};

Modal.setAppElement( 'body' );

function NewsletterModal () {
    const token = useSelector(state => state.auth.token);
    const user = useSelector( ( state ) => state.auth.user );
    // console.log( "token and user",token, user );

    const [ open, setOpen ] = useState( false );
    const [ doNotShow, setDoNotShow ] = useState( false );
    const [copiedText, setCopiedText] = useState('');
    const [email, setEmail] = useState('');
    const [loader,setLoader] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubscription = async () => {
        const data = {email};

        try {
            const response = await axios.post('https://njs.iretiensemble.com/contactus/subscription-email', data, {
                header:{
                    'Content-type':'application/json',
                }
            });
            
            if(response.status === 400 ){
                setEmail('');
                toast.warning("You are already subscribed to our newsletter.")
            }
            if(response.status === 200 || response.status === 201){
                setEmail('')
                toast.success("Subscribed Sucessfully");
              
            }
        } catch (error) {
            console.log(error);
        }
    }

    const copiedtoClipboard = () => {
        const textToCopy = 'IRETI10'
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        },1000);
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            setCopiedText(textToCopy);
            setTimeout(() =>{
                setCopiedText('');
            },60000);
        })
        .catch((error) => {
            console.error('Failed to copy text:', error)
        })
    };

    useEffect( () => {
        let timer;
        Cookie.get( `hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}` ) || ( timer = setTimeout( () => {
            setOpen( true );
        }, 5000 ) );

        return () => {
            timer && clearTimeout( timer );
        };
    }, [] )

    function closeModal ( e ) {
        document.getElementById( "newsletter-popup-form" ).classList.remove( "ReactModal__Content--after-open" );

        if ( document.querySelector( ".ReactModal__Overlay" ) ) {
            document.querySelector( ".ReactModal__Overlay" ).style.opacity = '0';
        }

        setTimeout( () => {
            setOpen( false );
            doNotShow && Cookie.set( `hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}`, "true", { expires: 7 } );
        }, 350 );
    }

    function handleChange ( e ) {
        setDoNotShow( e.target.checked );
    }

    return (
        <Modal
            isOpen={ open }
            onRequestClose={ closeModal }
            style={ customStyles }
            shouldReturnFocusAfterClose={ false }
            contentLabel="Newsletter Modal"
            className="container newsletter-popup-container h-auto"
            overlayClassName="d-flex align-items-center justify-content-center"
            id="newsletter-popup-form"
        >
            <div className="modal-content overflow-hidden">
                <div className="row justify-content-center position-relative">
                    <div className="col-12">
                        <div className="row no-gutters bg-white newsletter-popup-content">
                            <div className="col-xl-3-5col col-lg-7 banner-content-wrap" style={{background:"#f8f7f3"}}>

                                <div className="banner-content text-center">
                                    <h2 className="banner-title" style={{color:"#323C33"}}>Treat <span style={{color:"#9FAFA1"}}>'s<span style={ { fontWeight: '400' } }></span></span> ON US !</h2>
                                    <p className="mb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem",color:"#323C33"}}>Get 10% off on your first purchase with</p>
                                    <div className="codeCont mb-1" style={{width:"100%", background:"", height:"40px",display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <div className="innerCodeCopyCont" style={{width:"60%", display:"flex",margin:"auto", height:"100%", background:"yellow", justifyContent:"center", alignItems:"center"}}>
                                            <div className="readOnlyCont" style={{border: "1px solid #323C33",width:"80%", background:"#f5f5f5", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                <h4 style={{margin:"auto"}}>IRETI10</h4>
                                            </div>
                                            <div className="readOnlyCont" style={{width:"20%", background:"#222", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", cursor:"pointer"}} onClick={copiedtoClipboard}>
                                                {loader ? <CheckIcon fontSize='medium' className='CopyIcon' style={{color:"white"}}/>:<ContentPasteIcon fontSize='medium' className='CopyIcon' style={{color:"white"}}/>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem",color:"#323C33"}}>Subscribe to our newsletter and be the first to learn about our latest news.</p>
                                    <div className="input-group input-group-round">
                                        <input style={{fontFamily:"'Gotham Medium',sans-serif",border: "1px solid #323C33",color:"#323C33"}} type="email" className="form-control form-control-white" placeholder="Your Email Address" aria-label="Email Adress" required value={email} onChange={handleChangeEmail} />
                                        <div className="input-group-append">
                                            <button onClick={() => handleSubscription()} className="btn" type="submit"><span>go</span></button>
                                        </div>
                                    </div>
                                    

                                    <div className="custom-control custom-checkbox pl-4 ml-3">
                                        <input type="checkbox" className="custom-control-input" id="register-policy" style={{border: "1px solid black",fontSize:"1.6rem" , color:"#323C33"}} onChange={ handleChange } />
                                        <label className="custom-control-label" style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem",color:"#323C33"}} htmlFor="register-policy">Do not show this popup again</label>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-2-5col col-lg-5 d-none d-lg-block">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="newsletter"
                                    src="PopUp.jpg"
                                    threshold={ 0 }
                                    width={ 396 }
                                    height={ 442 }
                                    effect="blur"
                                    className="newsletter-img"
                                />
                            </div>
                        </div>
                    </div>
                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeModal }><span>×</span></button>
                </div>
            </div>
            {user&& !user.firstname && !user.lastName && !user.phoneNo?<div>

            <RedirectPopUp/>
            </div>:""}
        </Modal>
    );
}

export default NewsletterModal;