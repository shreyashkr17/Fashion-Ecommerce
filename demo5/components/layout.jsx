import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import VideoModal from "./features/modals/video-modal";
import QuickViewModal from "./features/modals/quickview-modal";
import QuickViewModalTwo from "./features/modals/quickview-modal-two";
import MobileMenu from "./features/mobile-menu";
import CartOverlay from "./partials/header/partials/cart-overlay";

import { actions } from '../store/demo';
import { isSafariBrowser, isEdgeBrowser } from "~/utils";

function Layout ( { children, hideQuick, hideVideo } ) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [showCartOverlay, setShowCartOverlay] = useState(false);
    const router = useRouter( "" );
    let scrollTop;

    useEffect( () => {
        if ( router.pathname.includes( 'pages/coming-soon' ) ) {
            document.querySelector( "header" ).classList.add( "d-none" );
            document.querySelector( "footer" ).classList.add( "d-none" );
        } else {
            document.querySelector( "header" ).classList.remove( "d-none" );
            document.querySelector( "footer" ).classList.remove( "d-none" );
        }
    }, [ router.pathname ] )

    useEffect( () => {
        hideQuick();
        hideVideo();
        scrollTop = document.querySelector( '#scroll-top' );
        window.addEventListener( 'scroll', scrollHandler, false );
    }, [] )

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.innerWidth);

        // Update window width on resize
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleBodyClassChange = () => {
            if (document.body.classList.contains('mmenu-active')) {
                setShowCartOverlay(false);
            }
        };

        document.body.addEventListener('classChange', handleBodyClassChange);

        return () => {
            document.body.removeEventListener('classChange', handleBodyClassChange);
        };
    }, []);
    function toScrollTop () {
        if ( isSafariBrowser() || isEdgeBrowser() ) {
            let pos = window.pageYOffset;
            let timerId = setInterval( () => {
                if ( pos <= 0 ) clearInterval( timerId );
                window.scrollBy( 0, -120 );
                pos -= 120;
            }, 1 );
        } else {
            window.scrollTo( {
                top: 0,
                behavior: 'smooth'
            } );
        }
    }

    function scrollHandler () {
        if ( window.pageYOffset >= 400 ) {
            scrollTop.classList.add( 'show' );
        } else {
            scrollTop.classList.remove( 'show' );
        }
    }

    function hideMobileMenu () {
        document.querySelector( 'body' ).classList.remove( 'mmenu-active' );
    }

    const toggleCartOverlay = () => {
        setShowCartOverlay(!showCartOverlay);
    };
    const hideCartOverLay = () => {
        setShowCartOverlay(false);
    }
    return (
        <>
        
            <div className="page-wrapper">
                
                <Header toggleCartOverlay={toggleCartOverlay} hideCartOverLay={hideCartOverLay}/>
               
                { children }
                
                <Footer />
            </div>
            <div className="mobile-menu-overlay" onClick={ hideMobileMenu }></div>
            <button id="scroll-top" title="Back to top" onClick={ toScrollTop }>
                <i className="icon-arrow-up" style={{color:"#f8f7f3"}}></i>
            </button>
            <MobileMenu />
            {showCartOverlay && windowWidth<=720 && <CartOverlay toggleCartOverlay={toggleCartOverlay} showCartOverlay={showCartOverlay}/>}
            <ToastContainer
                autoClose={ 3000 }
                duration={ 300 }
                newestOnTo={ true }
                className="toast-container"
                position="top-right"
                closeButton={ false }
                hideProgressBar={ true }
                newestOnTop={ true }
                draggable={ false }
            />
            {
                router.pathname === '/' ?
                    <QuickViewModalTwo />
                    :
                    <QuickViewModal />

            }
            <VideoModal />
           
        </>
    )
}

export default connect( null, { ...actions } )( Layout );