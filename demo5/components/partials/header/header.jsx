import ALink from '~/components/features/alink';
import HeaderSearch from '~/components/partials/header/partials/header-search';
import CartMenu from '~/components/partials/header/partials/cart-menu';
import MainMenu from '~/components/partials/header/partials/main-menu';
import StickyHeader from '~/components/features/sticky-header';
import { useSession,signOut, getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {actions as authActions} from '~/store/auth';
import axios from 'axios'
import Ireti from '~/assets/Ireti.png'
import IretiWhite from '~/assets/LogoWhite.png'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RotatingText from '~/components/rotatingText/page';

function Header (props) {
    const router = useRouter();
    const {data:session}= useSession();
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const user = useSelector( ( state ) => state.auth.user );
    const {toggleCartOverlay,hideCartOverLay} = props
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    const handleFixedStateChange = (isFixed) => {
        setIsHeaderFixed(isFixed); // Update state based on fixed status
    };
    // console.log(token)
    // console.log(user);
    const handleSignOut = async () => {
        await signOut({callbackUrl:"https://www.iretiensemble.com/"});
        handleManualSignOut()
    };
    let firstName, lastName;
    if(user){
        firstName = user.firstName;
        lastName = user.lastName;
    }
    
    

    const handleManualSignOut = async () => {
        try {
            const response = await axios.post('https://njs.iretiensemble.com/users/logout');
            if(response.status === 201 || response.status === 200){
                // console.log(response.data);
                // const {user, token} = response.data;
                dispatch(authActions.logout());
                // handleSignOut()
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    function openMobileMenu () {
        document.querySelector( 'body' ).classList.add( 'mmenu-active' );

        hideCartOverLay();
    }

    

    return (
        <header className="header header-5 position-relative">
            <StickyHeader onFixedStateChange={handleFixedStateChange}>
                {(isFixed) => (<div className="header-middle sticky-header">
                    <div className="container-fluid">
                        <div className="header-left">
                            <button className="mobile-menu-toggler" onClick={ openMobileMenu }>
                                {/* <span className="sr-only">Toggle mobile menu</span> */}
                                <i className="icon-bars"></i>
                            </button>

                            {isFixed ? <ALink href="/" className="logo">
                                <img src={Ireti} alt="Ireti Logo" width={ 115 } height={ 35 } />
                            </ALink>: (
                                <ALink href="/" className="logo">
                                    <img src={IretiWhite} alt="Ireti Logo" width={ 115 } height={ 35 } />
                                </ALink>
                            )}
                            <MainMenu />
                        </div>
        
                        <div className="header-right">
                            <HeaderSearch />

                            {!user && !session  && <ALink href="/pages/login" className="wishlist-link" title="Wishlist">
                                <h2 style={{color:"", fontSize:"1.7rem", marginTop:"10px"}}>Login/SignUp</h2>
                            </ALink>}

                            {(user) && (
                                <ALink href="/shop/dashboard" className="wishlist-link" title="Wishlist">
                                  
                                    { firstName && lastName ? (
                                        isFixed? (
                                            <h2 style={{ color: "#1a1a1a", fontSize: "1.7rem", marginTop: "10px" }}>{firstName} {lastName}</h2>
                                        ):(<h2 style={{ color: "#f8f7f3", fontSize: "1.7rem", marginTop: "10px" }}>{firstName} {lastName}</h2>)
                                    ):(
                                        isFixed? (<h2 style={{ color: "#1a1a1a", fontSize: "1.7rem", marginTop: "10px" }}>Hello User, </h2>):(<h2 style={{ color: "#f8f7f3", fontSize: "1.7rem", marginTop: "10px" }}>Hello User, </h2>)
                                    )}
                                </ALink>
                            )}

                            <ALink href="/shop/wishlist" className="wishlist-link" title="Wishlist">
                                <i className="icon-heart-o"></i>
                            </ALink>
                            <CartMenu toggleCartOverlay={toggleCartOverlay} isFixed={isFixed}/>
                          {session?  <div>
                            { !session ? <></> : (
                                isFixed ? (<button onClick={handleSignOut} style={{ marginLeft: "1rem",fontSize:"1.7rem" }}>
                                    SignOut
                                </button>):(<button onClick={handleSignOut} style={{ marginLeft: "1rem",fontSize:"1.7rem", color:"#fff"}}>
                                    SignOut
                                </button>)
                                )
                            }   
   </div>:  <div>

  
                            {user && (
                                isFixed ? (<button onClick={handleManualSignOut} style={{ color:"#1a1a1a",marginLeft: "1rem",fontSize:"1.7rem" }}>
                                    SignOut
                                </button>):(
                                    <button onClick={handleManualSignOut} style={{ color:"#f8f7f3",marginLeft: "1rem",fontSize:"1.7rem" }}>
                                        SignOut
                                    </button>
                                )
                            )}
                          </div>}
                        
                        </div>
                    </div>
                </div>)}
            </StickyHeader>
            <div >

           <RotatingText/>
            </div>
        </header>
    )
}

export default Header;