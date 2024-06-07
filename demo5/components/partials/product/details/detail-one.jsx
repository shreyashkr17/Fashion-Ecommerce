import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { connect, useSelector } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

import { canAddToCart, isInWishlist } from '~/utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {actions as variantActions } from '~/store/variant';
import GestureIcon from '@mui/icons-material/Gesture';
import CustomModal from '~/components/features/modals/custom-modal';

function DetailOne ( props ) {
    const router = useRouter();
    const user= useSelector((state) => state.auth.user);
    const { product, handlesizechart } = props;
    // console.log(product)
    const variant = product && product.variants;
    // console.log(variant)
    const uniqueColors = variant && [...new Set(variant?.map(item => ({ color: item.color, colorName: item.color_name })))];
    // console.log(uniqueColors)

    const uniqueSizes = variant && variant.reduce((acc, currentVariant) => {
        currentVariant.size.forEach(size=>{
            if(!acc.includes(size.name)){
                acc.push(size.name)
            }
        });

        return acc;
    },[]);
    // console.log(uniqueSizes)
    
    const ref = useRef( null );
    const productSlug = product && product.productSlug;
    const [ qty, setQty ] = useState( 1 );
    const [ qty2, setQty2 ] = useState( 1 );
    const [ colorArray, setColorArray ] = useState( [] );
    const [ sizeArray, setSizeArray ] = useState( [] );
    const [ variationGroup, setVariationGroup ] = useState( [] );
    const [ selectedVariant, setSelectedVariant ] = useState( { color: null, colorName: null, price: null, size: "" } );
    const [ showClear, setShowClear ] = useState( false );
    const [ showVariationPrice, setShowVariationPrice ] = useState( false );
    const [ maxPrice, setMaxPrice ] = useState( null );
    const [ minPrice, setMinPrice ] = useState( null );
    const [size, setSize] = useState();
    const [cartDisabled, setCartDisabled] = useState(false)

    const [isBottom, setIsBottom] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        let min = 99999;
        let max = 0;
        if(!variant || variant.length === 0){
            min = product && product.productPrice;
            max = product && product.productPrice;
        }
        variant && variant.length>0 && variant.forEach(vari => {
            // console.log(vari.price)
            if(vari.price < min){
                min = vari.price
            }
            if(vari.price > max){
                max = vari.price
            }
        },[product]);

        setMinPrice(min);
        setMaxPrice(max);

        if(variant && variant.length > 0){
            setVariationGroup([]);
            return;
        }

        const newVariantGroup = variant && variant.length>0 && variant.reduce((acc, cur) => {
            cur.size.forEach(size => {
                acc.push({
                    color: cur.color,
                    colorName: cur.color_name,
                    size: size.name,
                    price: cur.price
                });
            });
            return acc;
        },[]);

        setVariationGroup(newVariantGroup);

        if(variant && variant.length>0){
            setSize(getUniqueSize(variant))
        }
    },[variant])

    // console.log(minPrice,maxPrice)

    useEffect( () => {
        window.addEventListener( 'scroll', scrollHandler, {
            passive: true
        } );

        return () => {
            window.removeEventListener( 'scroll', scrollHandler );
        }
    }, [] )


    useEffect( () => {
        setSelectedVariant( { color: null, colorName: null, price: null, size: "" } );
        setQty( 1 );
        setQty2( 1 );
    }, [ router.query.slug ] )

    useEffect( () => {
        refreshSelectableGroup();
    }, [ variationGroup, selectedVariant,product ] )

    useEffect( () => {
        scrollHandler();
    }, [ router.pathname ] )

    useEffect( () => {
        if (!ref.current) return;
        setShowClear( ( selectedVariant.color || selectedVariant.size != "" ) ? true : false );
        setShowVariationPrice( ( selectedVariant.color && selectedVariant.size != "" ) ? true : false );
        let toggle = ref.current.querySelector( '.variation-toggle' );

        if ( toggle ) {
            if ( ( selectedVariant.color && selectedVariant.size != "" ) && toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }

            if ( ( !( selectedVariant.color && selectedVariant.size != "" ) ) && !toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }
        }
    }, [ selectedVariant ,product] );

    useEffect(() => {
        const isBottomThere = () => {
            product?.productCategory.map((cat) => {
                if(cat.name === "Bottomwear" || cat.name === "Bottomwear"){
                    setIsBottom(true);
                }
            })
        };

        isBottomThere();
    },[product])

    useEffect(()=>{
        if (selectedVariant.color && selectedVariant.size) {
            const matchingVariant = variant.find(item => item.color === selectedVariant.color && item.size.some(size => size.name === selectedVariant.size));
            if (matchingVariant) {
                setSelectedVariant({ ...selectedVariant, price: matchingVariant.price });
            }
        }
    }, [selectedVariant.color, selectedVariant.size, variant])

    function scrollHandler () {
        if ( router.pathname.includes( '/product/default' ) ) {
            let stickyBar = ref.current.querySelector( '.sticky-bar' );
            if ( stickyBar.classList.contains( 'd-none' ) && ref.current.getBoundingClientRect().bottom < 0 ) {
                stickyBar.classList.remove( 'd-none' );
                return;
            }
            if ( !stickyBar.classList.contains( 'd-none' ) && ref.current.getBoundingClientRect().bottom > 0 ) {
                stickyBar.classList.add( 'd-none' );
            }
        }
    }

    function onOpen (){
        setOpen(!isOpen);
    }

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, product ) ) {
            props.addToWishlist( product );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function refreshSelectableGroup () {
        if (!variationGroup) return;
        let tempArray = [ ...variationGroup ];
        if ( selectedVariant.color ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selectedVariant.color !== cur.color ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        setSizeArray( tempArray.reduce( ( acc, cur ) => {
            if ( acc.findIndex( item => item.size == cur.size ) !== -1 )
                return acc;
            return [ ...acc, cur ];
        }, [] ) );

        tempArray = [ ...variationGroup ];
        if ( selectedVariant.size ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selectedVariant.size !== cur.size ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        setColorArray(variant && variant.length>0 && variant.reduce( ( acc, cur ) => {
            if (
                tempArray.findIndex( item => item.color == cur.color ) == -1
            ) {
                return [
                    ...acc,
                    {
                        color: cur.color,
                        colorName: cur.color_name,
                        price: cur.price,
                        disabled: true
                    }
                ];
            }
            return [
                ...acc,
                {
                    color: cur.color,
                    colorName: cur.color_name,
                    price: cur.price,
                    disabled: false
                }
            ];
        }, [] ) );
    }

    function getUniqueSize(variant){
        const sizeSet = new Set();
        variant && variant.length>0 && variant.forEach(vari => {
            vari.size.forEach(size => {
                sizeSet.add(size.name);
            })
        })
    }
    
    // console.log(sizes)

    function selectColor ( item ) {
        // console.log(item)
        if ( item.color == selectedVariant.color ) {
            setSelectedVariant( {
                ...selectedVariant,
                color: null,
                colorName: null,
                price: null
            } );
        } else {
            setSelectedVariant( {
                ...selectedVariant,
                color: item.color,
                colorName: item.colorName,
                price: null
            } );
        }
    }

    function getAvailableSizes(selectedColor){
        const variantsWithSelectedColor = variant.filter(item => item.color === selectedColor);
        const availableSizes = variantsWithSelectedColor.flatMap(item => item.size.map(size => size.name));
        return Array.from(new Set(availableSizes));
    }

    function selectSize ( item,newSize ) {
        // console.log(item);
        // console.log(newSize);
        if(newSize === selectedVariant.size && item.color === selectedVariant.color){
            setSelectedVariant({
                ...selectedVariant,
                color:null,
                colorName:null,
                size:null,
                price:null
            })
        }else if(newSize === selectedVariant.size){
            setSelectedVariant({
                ...selectedVariant,
                size:null,
                price:null
            })
        }else{
            setSelectedVariant({
                ...selectedVariant,
                color:item.color,
                colorName:item.colorName,
                size:newSize,
                price:null
            });
        }
    }

    function onChangeQty ( current ) {
        setQty( current );
    }

    function onChangeQty2 ( current ) {
        setQty2( current );
    }

    function clearSelection ( e ) {
        e.preventDefault();
        setSelectedVariant( ( {
            ...selectedVariant,
            color: null,
            colorName: null,
            size: ""
        } ) );
        refreshSelectableGroup();
    }

    function onCartClick (  e, index = 0 ) {
        // e.preventDefault();
        if ( e.currentTarget.classList.contains( 'btn-disabled' ) ) {
            // console.log("onCartClick1")
            setCartDisabled(true);
            setTimeout(() => {
                setCartDisabled(false);
            },3000);
            // console.log("onCartClick2")
            return
        };

        let newProduct = { ...product };

        let variantColorSlug = "",sizeAbbreviation ="";
        // console.log(selectedVariant.colorName)
        if(selectedVariant.color && selectedVariant.colorName && selectedVariant.size !== ""){
            variantColorSlug=`${product.productSlug}-${selectedVariant.color}-${selectedVariant.colorName}`.toLowerCase().replace(/[^a-z0-9_]/g, '')
            // console.log(selectedVariant.size)
            if (selectedVariant.size === 'Small') {
                sizeAbbreviation = 'sm';
            } else if (selectedVariant.size === 'Medium') {
                sizeAbbreviation = 'md';
            } else if (selectedVariant.size === 'Large') {
                sizeAbbreviation = 'lg';
            } else if (selectedVariant.size === 'Extralarge') {
                sizeAbbreviation = 'xl';
            }else if (selectedVariant.size === 'Extrasmall') {
                sizeAbbreviation = 'xs';
            } else {
                sizeAbbreviation = 'other'; // You can set a default abbreviation if needed
            }
        }

        let name =product.productName
        if (selectedVariant.colorName && selectedVariant.size !== "") {
            name += ` - ${selectedVariant.colorName}, ${selectedVariant.size}`;
        }
        if ( variant && variant.length > 0 ) {
            newProduct = {
                ...product,
                name:name,
                variantSlug:variantColorSlug,
                size:sizeAbbreviation,
                price: selectedVariant.price
            };
        }
        props.addToCart(
            newProduct,
            index == 0 ? qty : qty2
        );
    }

    

    if ( !product ) {
        return <div></div>;
    }

    // useEffect(() => {
    //     console.log('selectedVariant state:', selectedVariant);
    // }, [selectedVariant]);

    // console.log(product.productCategory)

    return (
        <>
        <div className="product-details"
         ref={ ref }
        >
            <h1 className="product-title">{ product && product.productName }</h1>

            <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={ { width: `${product && product.productReview}` * 20 + '%' } }></div>
                    <span className="tooltip-text">{ product && product.productReview && product.productReview.toFixed( 2 ) }</span>
                </div>
                <span className="ratings-text" style={{fontFamily:"'Gotham Light',sans-serif", fontSize:"1.5rem"}}>( { product.productReview } Reviews )</span>
            </div>
            {
                product && (product.productStock == 0 || product.productStock == null) ?
                    <div className="product-price">
                        <span className="out-price">
                            {
                                minPrice == maxPrice ?
                                    <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}}>₹ { product && product.productPrice.toFixed( 2 ) }</span>
                                    :
                                    <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}}>₹ { minPrice.toFixed( 2 ) }&ndash;₹ { maxPrice.toFixed( 2 ) }</span>
                            }
                        </span>
                    </div>
                    :
                    minPrice == maxPrice ?
                        <div style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}} className="product-price">₹ {minPrice && minPrice.toFixed( 2 ) }</div>
                        :
                        variant && variant.length>0 ?
                            <div className="product-price">
                                <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}} className="new-price">₹ { minPrice && minPrice.toFixed( 2 )}</span>
                                <span style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}} className="old-price">₹ { maxPrice.toFixed( 2 ) }</span>
                            </div>
                            :
                            <div style={{fontFamily:"'Gotham Medium',sans-serif", fontSize:"2rem"}} className="product-price">₹ { minPrice && minPrice.toFixed( 2 )  }&ndash;₹ { maxPrice && maxPrice.toFixed( 2 ) }</div>
            }

            <div className="product-content">
                <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.3rem"}}>{product &&  product.productshortDesc }</p>
                {/* hello world */}
                {/* <br /> */}
                <p className='mt-1' style={{fontFamily:"'Gotham Black',sans-serif", fontSize:"1.35rem",color:"#1a1a1a"}}>Model is Wearing size 'S'.</p>
            </div>

            {
                
                    <>
                        {/* <label style={{color:"#14151a"}}>Choose Color:</label> */}
                        <div className="details-filter-row details-row-size">
                            
                            <label style={{color:"#14151a"}}>Color:</label>   
                            <div className="product-nav product-nav-dots">
                                {
                                    uniqueColors?.map( ( colorObj, index ) => (
                                        <a
                                            // style={{width}}
                                            className={ `${( colorObj.color == selectedVariant.color ? 'active ' : '' ) }` }
                                            style={ { backgroundColor: `#${colorObj.color}`,width:'30px', height:'30px', borderRadius:'10px' } }
                                            key={ index }
                                        ></a>
                                    ) )
                                }
                            </div>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label style={{color:"#14151a"}} htmlFor="size">Size:</label>
                            <div className="select">
                                {getAvailableSizes(uniqueColors[0].color).map((size,index)=>(
                                    <span
                                        key={index}
                                        style={{
                                            width:"40px",
                                            height:"40px",
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            padding:"5px",
                                            border:"2px solid black",
                                            marginRight:"10px",
                                            fontFamily: "'Gotham Thin',sans-serif",
                                            cursor: "pointer",
                                            backgroundColor:selectedVariant.size === size ? "#14151a" : "inherit",
                                            color: selectedVariant.size === size ? "white" : "inherit",
                                        }}
                                        onClick={() => {selectSize( uniqueColors[0], size )}}
                                    >
                                        <span style={{fontFamily:"'Gotham Black',sans-serif",letterSpacing:"2px"}}>{size==="Extrasmall"?"XS":size==="Small"?"SM":size==="Medium"?"MD":size==="Large"?"L":size==="Extralarge"?"XL":size}</span>
                                    </span>
                                ))}
                            </div>
                            

                            <ALink href="#" className="size-guide mr-4">
                                <i className="icon-th-list"></i><span onClick={() => handlesizechart()} style={{fontFamily:"'Gotham Thin',sans-serif"}}>size guide</span>
                            </ALink>
                            {
                                showClear ?
                                    <span style={{cursor:"pointer"}} onClick={ clearSelection }>clear</span>
                                    : ""
                            }
                        </div >
                        
                        <SlideToggle collapsed={ true }>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div>
                                    <button className={ `d-none variation-toggle ${toggleState.toLowerCase()}` } onClick={ onToggle }></button>
                                    <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                        <div className="product-price">
                                            ₹ { selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </SlideToggle>
                    </>
                    
            }
            <div className="details-filter-row details-row-size">
                <span style={{cursor:"pointer"}} onClick={()=> onOpen()}><i className="icon-th-list"></i> Customize Your Own Size</span>
            </div>
            {isOpen && 
                <CustomModal 
                    onOpen={onOpen} 
                    productStock={product.productStock} 
                    product={product} 
                    selectedColor={product.variants[0]?.color}
                    selectedPrice={product.variants[0]?.price}
                    selectedColorName={product.variants[0]?.color_name}
                    cartList={props.cartlist}
                    addToCart={props.addToCart}
                />
            }
            <div className="details-filter-row details-row-size">
                <label style={{color:"#14151A"}} htmlFor="qty">Qty:</label>
                <Qty 
                    changeQty={ onChangeQty }
                    max={product && product.productStock }
                    value={ qty }
                ></Qty>
            </div >
            
            <div className="product-details-action" style={{cursor:"pointer"}}>
                <a
                    // href=""
                    onClick={ e => onCartClick( e,0 )}
                    className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( variant.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                    style={{cursor:"pointer"}}
                >
                    <span>add to cart</span>
                </a>
                <div className="details-action-wrapper">
                    {
                        isInWishlist( props.wishlist, product ) ?
                            <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                            :
                            <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.56rem"}}>Add to Wishlist</span></a>
                    }
                </div>
              {  cartDisabled ? <div style={{fontSize:"12px"}}>
                * <i> Before adding to cart please select Size</i>
            </div>:""}
            </div >
           

            <div className="product-details-footer">
                <div className="product-cat w-100 text-truncate">
                    <span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Category:</span>
                    {
                        product && product?.productCategory && product?.productCategory?.sort((a,b) => {
                            const catA = a.name
                            const catB = b.name
                            return catA.localeCompare(catB);
                        }).map( ( cat, index ) => (
                            <span key={ index }>
                                <ALink
                                    style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}
                                    href=""
                                >{ cat.name === "SetsCoordStyledSets"?"Sets":cat.name==="CoordSets"?"Co-ord Sets":cat.name === "seasonSpringSummer"?"Spring Summer":cat.name==="DateNight Outfits"?"Date-Night Outfits":cat.name }</ALink>
                                { index < product?.productCategory.length - 1 ? ',' : '' }
                            </span>
                        ) )
                    }
                </div >
            </div >
            <div className="markersCont">
                <div className='markersInline'>
                    <span className='image'>
                        <img className='img1' src="https://cdn.shopify.com/s/files/1/0043/2098/5199/files/Tailored_1.png?v=1661418193" alt="" />
                    </span>
                    <span className="imageHeader">
                        <p style={{fontFamily:"'Gotham Medium',sans-serif"}}>Tailored Fit</p>
                    </span>
                </div>
                <div className='markersInline'>
                    <span className='image'>
                        <img className='img2' src="https://cdn.shopify.com/s/files/1/0043/2098/5199/files/AM-PM.png?v=1614304153" alt="" />
                    </span>
                    <span className="imageHeader">
                        <p style={{fontFamily:"'Gotham Medium',sans-serif"}}>Desk To Dinner</p>
                    </span>
                </div>
                <div className='markersInline'>
                    <span className='image'>
                        <img className='img2' src="https://cdn.shopify.com/s/files/1/0043/2098/5199/files/Layering_friendly.png?v=1614304153" alt="" />
                    </span>
                    <span className="imageHeader">
                        <p style={{fontFamily:"'Gotham Medium',sans-serif"}}>Perfect For Layering</p>
                    </span>
                </div>
                <div className='markersInline'>
                    <span className='image'>
                        <GestureIcon/>
                    </span>
                    <span className="imageHeader">
                        <p style={{fontFamily:"'Gotham Medium',sans-serif"}}>Hand Embroidered </p>
                    </span>
                </div>
                {isBottom && <div className='markersInline'>
                    <span className='image'>
                        <img className='img2' src="https://cdn.shopify.com/s/files/1/0043/2098/5199/files/Pockets.png?v=1614304153" alt="" />
                    </span>
                    <span className="imageHeader">
                        <p style={{fontFamily:"'Gotham Medium',sans-serif"}}>Pockets</p>
                    </span>
                </div>}
            </div>
            <div className="product-details-footer">
                <div className="social-icons social-icons-sm">
                    <span style={{fontFamily:"'Gotham Black',sans-serif", color:"#14151A"}} className="social-label">Share:</span>
                    <ALink href="#" className="social-icon" title="Facebook">
                        <i className="icon-facebook-f"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Twitter">
                        <i className="icon-twitter"></i>
                    </ALink>
                    <ALink href="https://www.instagram.com/ireti.official?igsh=YnQ0MDl2bjJ0Z3Zk" className="social-icon" title="Instagram">
                        <i className="icon-instagram"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Pinterest">
                        <i className="icon-pinterest"></i>
                    </ALink>
                </div>
            </div>
            {/* hello world */}
            <div className="sticky-bar d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <figure className="product-media">
                                <ALink href={ `/product/sticky/${product && product.productSlug}` }>
                                    <img src={ product && product.smPics && product.smPics.length > 0 ? product.smPics[0].photoUrl[0] :""} alt="product" width={ "300" } height={ "408" } />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={ `/product/sticky/${product && product.productSlug}` }>{product && product.productName }</ALink>
                            </h3>
                        </div>
                        <div className="col-6 justify-content-end">
                            {
                                ( selectedVariant.color && selectedVariant.size != "" ) ?
                                    <div className="product-price">
                                        ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                    </div>
                                    :
                                    product && product.productStock == 0 ?
                                        <div className="product-price">
                                            <span className="out-price">${ product && product.productPrice.toFixed( 2 ) }</span>
                                        </div>
                                        :
                                        minPrice == maxPrice ?
                                            <div className="product-price">${ minPrice && minPrice.toFixed( 2 ) }</div>
                                            :
                                            variant && variant.length>0 ?
                                                <div className="product-price">
                                                    <span className="new-price">${ minPrice && minPrice.toFixed( 2 ) }</span>
                                                    <span className="old-price">${ maxPrice && maxPrice.toFixed( 2 ) }</span>
                                                </div>
                                                :
                                                <div className="product-price">${ minPrice && minPrice.toFixed( 2 ) }&ndash;${ maxPrice && maxPrice.toFixed( 2 ) }</div>
                            }
                            <Qty changeQty={ onChangeQty2 } max={ product && product.productStock } value={ qty2 }></Qty>
                            <div className="product-details-action" style={{cursor:"pointer"}}>
                                <a
                                    href="#"
                                    className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( variant &&  variant.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                                    onClick={ e => onCartClick( e, 1 ) }
                                    style={{cursor:"pointer"}}
                                >
                                    <span>add to cart</span>
                                </a>
                                {
                                    isInWishlist( props.wishlist, product ) ?
                                        <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>

                                }
                            </div >
                            
                        </div >
                    </div >
                </div >
            </div >
        </div >
        
        </>
    )
}

const mapStateToProps = ( state ) => {
    return {
        cartlist: state.cartlist.data,
        wishlist: state.wishlist.data,
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction } )( DetailOne );
