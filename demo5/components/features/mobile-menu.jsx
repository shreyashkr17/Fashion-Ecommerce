import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SlideToggle from "react-slide-toggle";
import ALink from "~/components/features/alink";
import Alink2 from "~/components/features/alink2";

function MobileMenu() {
  const user = useSelector((state) => state.auth.user);
  const session = useSession();



  // if(session?.data && !user){
  //     user = {
  //         user:{
  //             email:session.data?.user.email,
  //             firstName: session.data?.user.name.split(' ')[0],
  //             lastName: session.data?.user.name.split(' ').at(-1)
  //         }

  //     }
  // }
  let firstName, lastName;
  if (user) {
    firstName = user.firstName;
    lastName = user.lastName;
  }
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    router.events.on("routeChangeComplete", hideMobileMenu);
  }, []);

  function hideMobileMenu() {
    document.querySelector("body").classList.remove("mmenu-active");
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop/sidebar/list",
      query: {
        searchTerm: searchTerm,
        category: "",
      },
    });
  }

  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={hideMobileMenu}>
          <i className="icon-close"></i>
        </span>

        {/* <form action="#" method="get" onSubmit={ onSubmitSearchForm } className="mobile-search">
                    <label htmlFor="mobile-search" className="sr-only">Search</label>
                    <input type="text" className="form-control" value={ searchTerm } onChange={ onSearchChange } name="mobile-search" id="mobile-search" placeholder="Search product ..." required />
                    <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                </form> */}

        <nav className="mobile-nav">
          <ul className="mobile-menu">
            {user ? (
              <SlideToggle collapsed={true}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <li
                    className={
                      toggleState.toLowerCase() == "expanded" ? "open" : ""
                    }
                  >
                    {firstName && lastName ? (
                      <ALink href="/shop/dashboard">
                        {firstName} {lastName}
                        <span
                          className="mmenu-btn"
                          onClick={(e) => {
                            onToggle(e);
                            e.preventDefault();
                          }}
                        ></span>
                      </ALink>
                    ) : (
                      <ALink href="/shop/dashboard">
                        Hello User,
                        <span
                          className="mmenu-btn"
                          onClick={(e) => {
                            onToggle(e);
                            e.preventDefault();
                          }}
                        ></span>
                      </ALink>
                    )}
                    <ul ref={setCollapsibleElement}>
                      <li>
                        <ALink href="/shop/dashboard">
                          <span>Dashboard</span>
                        </ALink>
                      </li>
                      <li>
                        <ALink href="/shop/wishlist">
                          <span>Wishlist</span>
                        </ALink>
                      </li>
                      <li>
                        <ALink href="/shop/cart">
                          <span>Cart</span>
                        </ALink>
                      </li>
                    </ul>
                  </li>
                )}
              </SlideToggle>
            ) : (
              <SlideToggle collapsed={true}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <li
                    className={
                      toggleState.toLowerCase() == "expanded" ? "open" : ""
                    }
                  >
                    <ALink
                      href="/pages/login"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    >
                      Login/SignUp
                      <span
                        className="mmenu-btn"
                        onClick={(e) => {
                          onToggle(e);
                          e.preventDefault();
                        }}
                      ></span>
                    </ALink>
                    <ul ref={setCollapsibleElement}>
                      <li>
                        <ALink href="/pages/login">
                          <span>Login</span>
                        </ALink>
                      </li>
                      <li>
                        <ALink href="/pages/login">
                          <span>Register</span>
                        </ALink>
                      </li>
                    </ul>
                  </li>
                )}
              </SlideToggle>
            )}
            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() == "expanded" ? "open" : ""
                  }
                ></li>
              )}
            </SlideToggle>
            {/* <SlideToggle collapsed={ true }>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <li className={ toggleState.toLowerCase() == 'expanded' ? 'open' : '' }>
                                    <ALink href="/shop/sidebar/3cols">
                                        Shops
                                        <span className="mmenu-btn" onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }></span>
                                    </ALink>

                                    <ul ref={ setCollapsibleElement }>
                                        <li><ALink href="/shop/sidebar/3cols"><span>All</span></ALink></li>
                                        <li>
                                            
                                            <SlideToggle collapsed={ true }>
                                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                                <li className={ toggleState.toLowerCase() == 'expanded' ? 'open' : '' }>
                                                    <Alink2 href="/shop/sidebar/3cols" category="Topwear" scroll={false}>
                                                        <span>Topwear</span>
                                                    </Alink2>
                                                    <ul ref={ setCollapsibleElement }>
                                                        <li><Alink2 href="/shop/sidebar/3cols" category="Tops" scroll={false}>Tops</Alink2></li>
                                                        <li>
                                                            <Alink2 href="/shop/sidebar/3cols" category="Shirts" scroll={false}>
                                                                Shirts
                                                            </Alink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                                
                                            )}
                                            </SlideToggle>
                                        </li>
                                        <li><Alink2 category="Tops & Tees" href="/shop/sidebar/3cols">Tops & Tees</Alink2></li>
                                        <li><Alink2 category="Western Wear" href="/shop/sidebar/3cols">Western Wear</Alink2></li>
                                        <li><Alink2 category="Ethnic Wear" href="/shop/sidebar/3cols"><span>Ethnic Wear</span></Alink2></li>
                                        <li><Alink2 category="Tops" href="/shop/sidebar/3cols">Tops</Alink2></li>
                                        <li><Alink2 category="JumpSuits" href="/shop/sidebar/3cols">JumpSuits</Alink2></li>
                                        <li><Alink2 category="Dresses" href="/shop/sidebar/3cols"><span>Dresses<span className="tip tip-new">New</span></span></Alink2></li>
                                        <li><Alink2 category="Bottoms" href="/shop/cart">Bottoms</Alink2></li>
                                        <li><Alink2 category="Vests & Jackets" href="/shop/checkout">Vests & Jackets</Alink2></li>
                                        <li><Alink2 category="Featured" href="/shop/wishlist">Featured (Limited Condition)</Alink2></li>
                                        <li><Alink2 category="Party Edit" href="/shop/dashboard">Party Edit<span className="tip tip-new">New</span></Alink2></li>
                                        <li><Alink2 category="Linen Edit" href="/shop/dashboard">Linen Edit</Alink2></li>
                                    </ul>
                                </li>
                            ) }
                        </SlideToggle> */}
            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() === "expanded" ? "open" : ""
                  }
                >
                  <ALink href="/shop/sidebar/3cols">
                    Shops
                    <span
                      className="mmenu-btn"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    ></span>
                  </ALink>
                  <ul ref={setCollapsibleElement}>
                    <li>
                      <ALink href="/shop/sidebar/3cols">
                        <span>All</span>
                      </ALink>
                    </li>
                    <li>
                      <SlideToggle collapsed={true}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                          <li
                            className={
                              toggleState.toLowerCase() === "expanded"
                                ? "open"
                                : ""
                            }
                          >
                            <Alink2
                              href="/shop/sidebar/3cols"
                              category="Topwear"
                              scroll={false}
                            >
                              <span>Topwear</span>
                              <span
                                className="mmenu-btn"
                                onClick={(e) => {
                                  onToggle(e);
                                  e.preventDefault();
                                }}
                              ></span>
                            </Alink2>
                            <ul ref={setCollapsibleElement}>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Tops"
                                  scroll={false}
                                >
                                  Tops
                                </Alink2>
                              </li>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Shirts"
                                  scroll={false}
                                >
                                  Shirts
                                </Alink2>
                              </li>
                            </ul>
                          </li>
                        )}
                      </SlideToggle>
                      <SlideToggle collapsed={true}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                          <li
                            className={
                              toggleState.toLowerCase() === "expanded"
                                ? "open"
                                : ""
                            }
                          >
                            <Alink2
                              href="/shop/sidebar/3cols"
                              category="DressJumpSuits"
                              scroll={false}
                            >
                              <span>Dress & JumpSuits</span>
                              <span
                                className="mmenu-btn"
                                onClick={(e) => {
                                  onToggle(e);
                                  e.preventDefault();
                                }}
                              ></span>
                            </Alink2>
                            <ul ref={setCollapsibleElement}>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Dress"
                                  scroll={false}
                                >
                                  Dress
                                </Alink2>
                              </li>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Jumpsuits"
                                  scroll={false}
                                >
                                  Jumpsuits
                                </Alink2>
                              </li>
                            </ul>
                          </li>
                        )}
                      </SlideToggle>
                      <SlideToggle collapsed={true}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                          <li
                            className={
                              toggleState.toLowerCase() === "expanded"
                                ? "open"
                                : ""
                            }
                          >
                            <Alink2
                              href="/shop/sidebar/3cols"
                              category="Bottomwear"
                              scroll={false}
                            >
                              <span>Bottomwear</span>
                              <span
                                className="mmenu-btn"
                                onClick={(e) => {
                                  onToggle(e);
                                  e.preventDefault();
                                }}
                              ></span>
                            </Alink2>
                            <ul ref={setCollapsibleElement}>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Skirts"
                                  scroll={false}
                                >
                                  Skirts
                                </Alink2>
                              </li>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Trousers"
                                  scroll={false}
                                >
                                  Trousers
                                </Alink2>
                              </li>
                            </ul>
                          </li>
                        )}
                      </SlideToggle>
                      <SlideToggle collapsed={true}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                          <li
                            className={
                              toggleState.toLowerCase() === "expanded"
                                ? "open"
                                : ""
                            }
                          >
                            <Alink2
                              href="/shop/sidebar/3cols"
                              category="BlazerVests"
                              scroll={false}
                            >
                              <span>Bottomwear</span>
                              <span
                                className="mmenu-btn"
                                onClick={(e) => {
                                  onToggle(e);
                                  e.preventDefault();
                                }}
                              ></span>
                            </Alink2>
                            <ul ref={setCollapsibleElement}>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Blazer"
                                  scroll={false}
                                >
                                  Blazer
                                </Alink2>
                              </li>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="Vests"
                                  scroll={false}
                                >
                                  Vests
                                </Alink2>
                              </li>
                            </ul>
                          </li>
                        )}
                      </SlideToggle>
                      <SlideToggle collapsed={true}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                          <li
                            className={
                              toggleState.toLowerCase() === "expanded"
                                ? "open"
                                : ""
                            }
                          >
                            <Alink2
                              href="/shop/sidebar/3cols"
                              category="SetsCoordStyledSets"
                              scroll={false}
                            >
                              <span>Sets</span>
                              <span
                                className="mmenu-btn"
                                onClick={(e) => {
                                  onToggle(e);
                                  e.preventDefault();
                                }}
                              ></span>
                            </Alink2>
                            <ul ref={setCollapsibleElement}>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="StyledSets"
                                  scroll={false}
                                >
                                  Styled Sets
                                </Alink2>
                              </li>
                              <li>
                                <Alink2
                                  href="/shop/sidebar/3cols"
                                  category="CoordSets"
                                  scroll={false}
                                >
                                  Coord Sets
                                </Alink2>
                              </li>
                            </ul>
                          </li>
                        )}
                      </SlideToggle>
                      <li>
                        <Alink2 category="afra" href="/shop/sidebar/3cols">
                          <span>Afra</span>
                        </Alink2>
                      </li>
                    </li>
                    <SlideToggle collapsed={true}>
                      {({ onToggle, setCollapsibleElement, toggleState }) => (
                        <li
                          className={
                            toggleState.toLowerCase() === "expanded"
                              ? "open"
                              : ""
                          }
                        >
                          <Alink2
                            href="/shop/sidebar/3cols"
                            category="SetsCoordStyledSets"
                            scroll={false}
                          >
                            <span>Shop By</span>
                            <span
                              className="mmenu-btn"
                              onClick={(e) => {
                                onToggle(e);
                                e.preventDefault();
                              }}
                            ></span>
                          </Alink2>
                          <ul ref={setCollapsibleElement}>
                            <li>
                              <Alink2
                                href="/shop/sidebar/3cols"
                                category="DateNight Outfits"
                                scroll={false}
                              >
                                Date Night Outfits
                              </Alink2>
                            </li>
                            <li>
                              <Alink2
                                href="/shop/sidebar/3cols"
                                category="Workwear"
                                scroll={false}
                              >
                                Workwear
                              </Alink2>
                            </li>
                            {/* <li><Alink2 href="/shop/sidebar/3cols" category="Weekend" scroll={false}>Coord Sets</Alink2></li> */}
                            {/* <li><Alink2 href="/shop/sidebar/3cols" category="Vacation Stores" scroll={false}>Coord Sets</Alink2></li> */}
                            {/* <li><Alink2 href="/shop/sidebar/3cols" category="Winter Outfits" scroll={false}>Coord Sets</Alink2></li> */}
                          </ul>
                        </li>
                      )}
                    </SlideToggle>
                  </ul>
                </li>
              )}
            </SlideToggle>
            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() == "expanded" ? "open" : ""
                  }
                >
                  <ALink href="" className="sf-with-ul">
                    Collections
                    <span
                      className="mmenu-btn"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    ></span>
                  </ALink>
                  <ul ref={setCollapsibleElement}>
                    <SlideToggle collapsed={true}>
                      {({ onToggle, setCollapsibleElement, toggleState }) => (
                        <li
                          className={
                            toggleState.toLowerCase() === "expanded"
                              ? "open"
                              : ""
                          }
                        >
                          <Alink2 href="" category="" scroll={false}>
                            <span>By Artist</span>
                            <span
                              className="mmenu-btn"
                              onClick={(e) => {
                                onToggle(e);
                                e.preventDefault();
                              }}
                            ></span>
                          </Alink2>
                          <ul ref={setCollapsibleElement}>
                            <li>
                              <ALink
                                href="/shop/collections/harshitaSemiColon"
                                scroll={false}
                              >
                                Harshita X AFRA
                              </ALink>
                            </li>
                          </ul>
                        </li>
                      )}
                    </SlideToggle>
                    <SlideToggle collapsed={true}>
                      {({ onToggle, setCollapsibleElement, toggleState }) => (
                        <li
                          className={
                            toggleState.toLowerCase() === "expanded"
                              ? "open"
                              : ""
                          }
                        >
                          <Alink2 href="" category="" scroll={false}>
                            <span>By Season</span>
                            <span
                              className="mmenu-btn"
                              onClick={(e) => {
                                onToggle(e);
                                e.preventDefault();
                              }}
                            ></span>
                          </Alink2>
                          <ul ref={setCollapsibleElement}>
                            <li>
                              <ALink
                                href="/shop/collections/seasonSpringSummer"
                                scroll={false}
                              >
                                Spring Season 2024
                              </ALink>
                            </li>
                          </ul>
                        </li>
                      )}
                    </SlideToggle>
                  </ul>
                </li>
              )}
            </SlideToggle>
            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() == "expanded" ? "open" : ""
                  }
                >
                  <ALink href="#">
                    Discover Ireti
                    <span
                      className="mmenu-btn"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    ></span>
                  </ALink>
                  <ul ref={setCollapsibleElement}>
                    <li>
                      <ALink href="/pages/about">About Brand</ALink>
                    </li>
                    <li>
                      <ALink href="/pages/sustainable">Ethical Culture</ALink>
                    </li>
                    <li>
                      <ALink href="/blog/listing/">Blog / In The Press</ALink>
                    </li>
                    {/* <li><ALink href="/pages/coming-soon">Coming Soon</ALink></li> */}
                  </ul>
                </li>
              )}
            </SlideToggle>
            {/* <a>Hello world</a> */}

            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() == "expanded" ? "open" : ""
                  }
                >
                  <ALink href="#">
                    Legals
                    <span
                      className="mmenu-btn"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    ></span>
                  </ALink>
                  <ul ref={setCollapsibleElement}>
                    <li>
                      <ALink href="/pages/terms-conditions">
                        Terms & Conditions
                      </ALink>
                    </li>
                    <li>
                      <ALink href="/pages/shippingandpayments">
                        Shipping & Payments
                      </ALink>
                    </li>
                    <li>
                      <ALink href="/pages/shipping">Returns & Payments</ALink>
                    </li>
                    <li>
                      <ALink href="/pages/privacy">Privacy Policy</ALink>
                    </li>
                  </ul>
                </li>
              )}
            </SlideToggle>
          </ul>
        </nav>

        <div className="social-icons">
          <ALink href="#" className="social-icon" title="Facebook">
            <i className="icon-facebook-f"></i>
          </ALink>
          <ALink href="#" className="social-icon" title="Twitter">
            <i className="icon-twitter"></i>
          </ALink>
          <ALink
            href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk"
            className="social-icon"
            title="Instagram"
          >
            <i className="icon-instagram"></i>
          </ALink>
          <ALink href="#" className="social-icon" title="Youtube">
            <i className="icon-youtube"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
