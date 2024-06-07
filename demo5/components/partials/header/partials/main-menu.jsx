import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';
import ALink2 from '~/components/features/alink2';
import Harshita from "@/assets/Harshita.jpg"
import Sample1 from "@/assets/Sample1.jpeg"
import Sample2 from "@/assets/Sample2.jpeg"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function MainMenu() {
    const router = useRouter();
    let path = router.asPath;
    let query = router.query;

    function showAllDemos( e ) {
        let demoItems = document.querySelectorAll( '.demo-item.hidden' );

        for ( let i = 0; i < demoItems.length; i++ ) {
            demoItems[ i ].classList.toggle( 'show' );
        }

        document.querySelector( '.view-all-demos' ).classList.toggle( 'disabled-hidden' );
        e.preventDefault();
    }

    function handleCategoryClick(category){
        router.push({
            pathname:'/shop/sidebar/3cols',
            query:{category:category}
        });
    }

    return (
        <nav className="main-nav">
            <ul className="menu sf-arrows">
                <li className={ `megamenu-container ${ path === '/' ? 'active' : '' }` } id="menu-home">
                    {/* <ALink href="/" className="" style={{width:"100%"}}>Home</ALink> */}
                </li>
                <li className={ path.indexOf( "/shop" ) > -1 ? 'active' : '' }>
                    <ALink href="/shop/sidebar/3cols" className="sf-with-ul" scroll={ false } style={{fontFamily:"'Gotham Black',sans-serif"}}>Shops</ALink>

                    <div className="megamenu megamenu-md">
                        <div className="row no-gutters">
                            <div className="col-md-8">
                                <div className="menu-col">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* <div className="menu-title" style={{fontFamily:"'Gotham Medium',sans-serif"}}>New In</div> */}
                                            {/* <ul>
                                                <li className={ ( path.indexOf( "shop/sidebar" ) > -1 && query.type == 'list' ) ? "active" : '' }>
                                                    <ALink2 category="New Categories" href="/shop/sidebar/3cols" style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}} scroll={ false }>New Categories</ALink2>
                                                </li>
                                            </ul> */}

                                            <div className="class-md-6">
                                                
                                            </div>
                                            <div className="menu-title mt-1" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Clothings</div>
                                            <ul>
                                                <li className={ ( path.indexOf( "shop/sidebar" ) > -1 && query.type == 'boxed' ) ? "active" : '' }>
                                                    <ALink2 href="/shop/sidebar/3cols" category="All" style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}} scroll={ false }><span>All</span></ALink2>
                                                </li>
                                                <li className={`dropdown ${(path.indexOf("shop/sidebar") > -1 && query.type === 'fullwidth') ? "active" : ''}`}>
                                                    <ALink2 href="/shop/sidebar/3cols" category="Topwear" scroll={false} style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}}>
                                                        Topwear
                                                    </ALink2>
                                                    <ul className="dropdown-content" style={{border:"2px solid black", borderRadius:"4px", justifyContent:"center", alignItems:"center"}}>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Tops" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Tops</span>
                                                            </ALink2>
                                                        </li>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Shirts" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Shirts</span>
                                                            </ALink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className={`dropdown ${(path.indexOf("shop/sidebar") > -1 && query.type === 'fullwidth') ? "active" : ''}`}>
                                                    <ALink2 href="/shop/sidebar/3cols" category="DressJumpSuits" scroll={false} style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}}>
                                                        Dress & JumpSuits
                                                    </ALink2>
                                                    <ul className="dropdown-content" style={{border:"2px solid black", borderRadius:"4px", justifyContent:"center", alignItems:"center"}}>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Dress" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Dress</span>
                                                            </ALink2>
                                                        </li>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Jumpsuits" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Jumpsuits</span>
                                                            </ALink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className={`dropdown ${(path.indexOf("shop/sidebar") > -1 && query.type === 'fullwidth') ? "active" : ''}`}>
                                                    <ALink2 href="/shop/sidebar/3cols" category="Bottomwear" scroll={false} style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}}>
                                                        Bottomwear
                                                    </ALink2>
                                                    <ul className="dropdown-content" style={{border:"2px solid black", borderRadius:"4px", justifyContent:"center", alignItems:"center"}}>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Skirts" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Skirts</span>
                                                            </ALink2>
                                                        </li>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Trousers" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Trousers</span>
                                                            </ALink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className={`dropdown ${(path.indexOf("shop/sidebar") > -1 && query.type === 'fullwidth') ? "active" : ''}`}>
                                                    <ALink2 href="/shop/sidebar/3cols" category="Blazer Vests" scroll={false} style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}}>
                                                        Blazer & Vests
                                                    </ALink2>
                                                    <ul className="dropdown-content" style={{border:"2px solid black", borderRadius:"4px", justifyContent:"center", alignItems:"center"}}>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Blazer" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Blazer</span>
                                                            </ALink2>
                                                        </li>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="Vests" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Vests</span>
                                                            </ALink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className={`dropdown ${(path.indexOf("shop/sidebar") > -1 && query.type === 'fullwidth') ? "active" : ''}`}>
                                                    <ALink2 href="/shop/sidebar/3cols" category="SetsCoordStyledSets" scroll={false} style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}}>
                                                        Sets
                                                    </ALink2>
                                                    <ul className="dropdown-content" style={{border:"2px solid black", borderRadius:"4px", justifyContent:"center", alignItems:"center"}}>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="CoordSets" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span><span>Coord Sets</span>
                                                            </ALink2>
                                                        </li>
                                                        <li>
                                                            <ALink2 style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem", fontWeight:"800"}} href="/shop/sidebar/3cols" category="StyledSets" scroll={false}>
                                                                <span><KeyboardDoubleArrowRightIcon /></span> <span>Styled Sets</span>
                                                            </ALink2>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="menu-title" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Shop By</div>
                                            <ul>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 href="/shop/sidebar/3cols" category="DateNight Outfits" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Date-Night Outfits</ALink2></li>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 category="Workwear" href="/shop/sidebar/3cols" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}><span>Workwear</span></ALink2></li>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 category="Weekend" href="/shop/sidebar/3cols" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Weekend</ALink2></li>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 category="Vacation Stores" href="/shop/sidebar/3cols" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Vacation Stores</ALink2></li>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 category="Winter Outfits" href="/shop/sidebar/3cols" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Winter Outfits</ALink2></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="menu-title mt-1" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Collections</div>
                                            <ul>
                                                <li className={ path.indexOf( "shop/sidebar" ) > -1 ? "active" : '' }><ALink2 href="/shop/sidebar/3cols" category="AFRA" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>AFRA</ALink2></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="banner banner-overlay">
                                    <ALink href="/shop/sidebar/list" className="banner banner-menu">
                                        <img src="outputShopMenu.jpg" alt="Banner" />

                                        <div className="banner-content banner-content-top">
                                            <div className="banner-title text-white">NEW <br /><span><strong>IN</strong></span></div>
                                        </div>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                
                <li className={ path.indexOf( "product/" ) > -1 ? 'active' : '' }>
                    <ALink href="" className="sf-with-ul">Collections</ALink>

                    <div className="megamenu megamenu-lg">
                        <div className="row no-gutters">
                            <div className="col-sm-7" style={{marginLeft:"30px", marginBottom:"10px"}}>
                                <div className="menu-title mt-2" style={{fontFamily:"'Gotham Medium',sans-serif"}}>By Artist</div>
                                <ul>
                                    <div className="innerChildColl">
                                        <div className="leftInnerChild">
                                            <li className={ path.indexOf( "shop/collections/harshitaSemiColon" ) > -1 ? "active" : '' }><ALink href="/shop/collections/harshitaSemiColon" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Harshita x AFRA</ALink></li>
                                            <img src={Harshita} alt=""/>
                                        </div>
                                        {/* <div className="leftInnerChild">
                                            <li className={ path.indexOf( "shop/collections/projectFallWinter" ) > -1 ? "active" : '' }><ALink href="/shop/collections/projectFallWinter" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif",marginLeft:"30px", textAlign:"center", fontSize:"1.45rem",fontWeight:"800"}}>Coming Soon...</ALink></li>
                                            <img src={""} alt=""/>
                                        </div> */}
                                        {/* <div className="leftInnerChild">
                                            <li className={ path.indexOf( "shop/collections/projectFallWinter" ) > -1 ? "active" : '' }><ALink href="/shop/collections/projectFallWinter" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif",marginLeft:"30px", textAlign:"center", fontSize:"1.45rem",fontWeight:"800"}}>Coming Soon...</ALink></li>
                                            <img src={""} alt=""/>
                                        </div> */}
                                    </div>
                                </ul>
                            </div>

                            <div className="col-sm-7" style={{marginLeft:"30px", marginBottom:"10px"}}>
                                <div className="menu-title mt-2" style={{fontFamily:"'Gotham Medium',sans-serif"}}>By Season</div>
                                <ul>
                                    <div className="innerChildColl">
                                        <div className="leftInnerChild">
                                            <li className={ path.indexOf( "collections/seasonSpringSummer" ) > -1 ? "active" : '' }><ALink href="/shop/collections/seasonSpringSummer" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Spring Summer 2024</ALink></li>
                                            <img src="Collection.jpg" alt=""/>
                                        </div>
                                        {/* <div className="leftInnerChild">
                                            <li className={ path.indexOf( "collections/seasonSpringSummer" ) > -1 ? "active" : '' }><ALink href="/shop/collections/seasonSpringSummer" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif",marginLeft:"30px", textAlign:"center", fontSize:"1.45rem",fontWeight:"800"}}>Coming Soon...</ALink></li>
                                            <img src={""} alt=""/>
                                        </div> */}
                                        {/* <div className="leftInnerChild">
                                            <li className={ path.indexOf( "collections/seasonFallWinter" ) > -1 ? "active" : '' }><ALink href="/shop/collections/seasonFallWinter" scroll={ false } style={{fontFamily:"Gotham Thin, sans-serif",marginLeft:"30px", textAlign:"center", fontSize:"1.45rem",fontWeight:"800"}}>Coming Soon...</ALink></li>
                                            <img src={""} alt=""/>
                                        </div> */}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li className={ path.indexOf( "pages" ) > -1 ? 'active' : '' }>
                    <ALink href="#" className="sf-with-ul">Discover Ireti</ALink>

                    <ul>
                        <li className={ path.indexOf( "pages/login" ) > -1 ? 'active' : '' }><ALink href="/pages/about" style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>About Brand</ALink></li>
                        <li className={ path.indexOf( "pages/faq" ) > -1 ? 'active' : '' }><ALink href="/pages/sustainable" style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Ethical Culture</ALink></li>
                        <li className={ path.indexOf( "404" ) > -1 ? 'active' : '' }><ALink href="/blog/listing/" style={{fontFamily:"Gotham Thin, sans-serif", fontSize:"1.45rem",fontWeight:"800"}}>Blog / In the Press</ALink></li>
                    </ul>
                </li>
                
            </ul>
        </nav>
    );
}

export default MainMenu;