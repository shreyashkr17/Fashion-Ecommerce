import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'react-modal';
import Cookie from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ALink from '~/components/features/alink';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(51,51,51,0.6)',
        zIndex: '9002'
    }
};

Modal.setAppElement( 'body' );

function RedirectPopUp () {
    const token = useSelector(state => state.auth.token);
    const [ open, setOpen ] = useState( false );
    const [ doNotShow, setDoNotShow ] = useState( false );
    const [loader,setLoader] = useState(false);



    const handleRedirect = async () => {
       
    }

  

    useEffect( () => {
        let timer;
        Cookie.get( `hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}` ) || ( timer = setTimeout( () => {
            setOpen( true );
        }, 5000 ) );

        return () => {
            timer && clearTimeout( timer );
        };
    }, [] )

    function closeRedirectModal ( e ) {
        // document.getElementById( "redirect-popup-form" ).classList.remove( "ReactModal__Content--after-open" );

        // if ( document.querySelector( ".ReactModal__Overlay" ) ) {
        //     document.querySelector( ".ReactModal__Overlay" ).style.opacity = '0';
        // }

        // setTimeout( () => {
        //     setOpen( false );
        //     doNotShow && Cookie.set( `hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}`, "true", { expires: 7 } );
        // }, 350 );
        setOpen(false);
        doNotShow && Cookie.set(`hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}`, "true", { expires: 7 });
    }

    function handleChange ( e ) {
        setDoNotShow( e.target.checked );
    }

    return (
        <Modal
            isOpen={ open }
            onRequestClose={ closeRedirectModal }
            style={ customStyles }
            shouldReturnFocusAfterClose={ false }
            contentLabel="Redirect Modal"
            className="container newsletter-popup-container h-auto"
            overlayClassName="d-flex align-items-center justify-content-center"
            id="redirect-popup-form"
        >
            <div className="modal-content overflow-hidden">
                <div className="row justify-content-center position-relative">
                    <div className="col-12">
                        <div className="row no-gutters bg-white newsletter-popup-content">
                            <div className="col-xl-12 col-lg-12 banner-content-wrap" style={{background:"#f8f7f3"}}>

                                <div className="banner-content text-center">
                                    <h2 className="banner-title" style={{color:"#323C33"}}>
                                        Update <span style={{color:"#9FAFA1"}}><span style={ { fontWeight: '400' } }></span></span>  !</h2>
                                    <p className="mb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem",color:"#323C33"}}>
                                        Please Update your details at Dashboard
                                    </p>
                                    <div className="codeCont mb-1" style={{width:"100%", background:"", height:"40px",display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <div className=""  style={{margin:"auto",width:"100%"}}>
                                            <ALink href="/shop/dashboard" className="dashboard-link" title="dashboard">
                                                <button onClick={() => handleRedirect()} style={{padding:"10px",width:"fit-content",color:"white",backgroundColor:"black",letterSpacing:"1.5px",fontSize:"16px"}} className="btn" type="submit">
                                                    <span>Dashboard</span>
                                                </button>
                                            </ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeRedirectModal }><span>×</span></button>
                </div>
            </div>
        </Modal>
    );
}

export default RedirectPopUp;