/**
 * get total Price of products in cart.
 * @param { Array } cartItems 
 * @return { Float } totalPrice
 */
export const cartPriceTotal = cartItems => {
    return cartItems.reduce( ( acc, cur ) => {
        return acc + cur.sum
    }, 0 );
}

/**
 * get number of products in cart
 * @param { Array } cartItems 
 * @return { Integer } numbers of cart items in cartlist
 */
export const cartQtyTotal = cartItems => {
    return cartItems.reduce( ( acc, cur ) => {
        return acc + parseInt( cur.qty, 10 );
    }, 0 );
}

/**
 * Decide where product is in cart.
 * @param { Array } cartItems 
 * @param { Object } product 
 */
export const isInCart = ( cartItems, product ) => {
    return cartItems.find( item => item.id == product.id ) ? true : false;
}

/**
 * Confirm if product could be added to cart.
 * @param { Array } cartItems 
 * @param { Object } product 
 * @param { Number } qty 
 */
export const canAddToCart = ( cartItems, product, qty ) => {
    let find = cartItems.find( item => item.id == product.id );
    if ( find ) {
        if ( product && product.productStock == null || ( product && product.stock < ( find.qty + qty ) ) ) return false;
        else return true;
    } else {
        if ( product && product.productStock == null || ( product && product.stock < qty ) ) return false;
        else return true;
    }
}

/**
 * 
 * @param {Array} wishlist 
 * @param {Object} product 
 */
export const isInWishlist = ( wishlist, product ) => {
    return product && wishlist.findIndex( item => item.slug == product.slug ) > -1;
}

/**
 * 
 * @param {Array} compare 
 * @param {Object} product 
 */
export const isInCompare = ( compare, product ) => {
    return product && compare.findIndex( item => item.slug == product.slug ) > -1;
}


/**
 * utils to detect safari browser
 * @return {bool}
 */
export const isSafariBrowser = function () {
    let sUsrAg = navigator.userAgent;
    if ( sUsrAg.indexOf( 'Safari' ) !== -1 && sUsrAg.indexOf( 'Chrome' ) === -1 )
        return true;
    return false;
}

export const isInstgramView = function() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    if (ua.indexOf('Instagram') > -1) {
        return true;
    }
    return false;
}


/**
 * utils to detect Edge browser
 * @return {bool}
 */
export const isEdgeBrowser = function () {
    let sUsrAg = navigator.userAgent;
    if ( sUsrAg.indexOf( "Edge" ) > -1 )
        return true;
    return false;
}

/**
 * get index of the element
 * @param {Element} element 
 */
export const getIndex = function ( element ) {
    let children = element.parentElement.children;
    for ( let i = 0; i < children.length; i++ ) {
        if ( element == children[ i ] ) return i;
    }

    return 0;
}

/**
 * filter products by category.
 * @param {Array} products 
 * @param {Array} category 
 * @param {Boolean} flag 
 */
export const catFilter = function ( products = [], category, flag = false ) {
    if ( category[ 0 ] === 'All' ) return products;

    return products.filter( item => {
        for ( let i = 0; i < category.length; i++ ) {
            if ( item.productCategory.find( cat => cat.slug == category[ i ] ) ) {
                if ( !flag ) return true;
            } else {
                if ( flag ) return false;
            }
        }

        if ( flag )
            return true;
        else
            return false;
    } )
}

/**
 * filter products by attribute
 * @param {Array} products 
 * @param {String} attr 
 */
export const attrFilter = function ( products = [], attr ) {
    // if(products)
    return products.filter( item => {
        if ( attr === 'all' ) {
            return true;
        }

        if ( attr === 'sale' && item.sale_price ) {
            return true;
        }

        if ( attr === 'rated' && item.ratings > 3 ) {
            return true;
        }

        if ( attr === 'until' && item.until ) {
            return true;
        }

        return item[ attr ] === true;
    } );
}

/**
 * Scrolling to Page content section
 */
export const scrollToPageContent = function () {
    let to = document.querySelector( '.page-content' )
        .offsetTop - 74;
    if ( isSafariBrowser() || isEdgeBrowser() ) {
        let pos = window.pageYOffset;
        let timerId = setInterval( () => {
            if ( pos <= to ) clearInterval( timerId );
            else {
                window.scrollBy( 0, -120 );
                pos -= 120;
            }
        }, 1 );
    } else {
        window.scrollTo( {
            top: to,
            behavior: 'smooth'
        } );
    }
}

/**
 * utils to make background parallax
 */
export const parallax = () => {
    let parallax = document.querySelectorAll( '.bg-parallax' );

    for ( let i = 0; i < parallax.length; i++ ) {
        let y = 0;
        if ( parallax[ i ].classList.contains( 'header-parallax' ) ) {
            y = ( 10 - window.pageYOffset ) * 47 / 900 + 50;
        } else {
            y = ( parallax[ i ].offsetTop - window.pageYOffset ) * 47 / parallax[ i ].offsetTop + 50;
        }

        parallax[ i ].style.backgroundPositionY = y + '%';
    }
}

/**
 * utils to set count to in about-2
 */
export const countTo = function () {
    let items = document.querySelectorAll( '.count' );

    if ( items ) {
        for ( let i = 0; i < items.length; i++ ) {

            let item = items[ i ];
            let amount = parseInt( item.getAttribute( 'data-to' ), 10 ) - parseInt( item.getAttribute( 'data-from' ), 10 );
            let time = parseInt( item.getAttribute( 'data-speed' ), 10 );
            let interval = parseInt( item.getAttribute( 'data-refresh-interval' ), 10 );
            let pt = 0;
            let height = item.parentElement.parentElement.parentElement.offsetTop;
            let flag = 0;

            document.addEventListener( "scroll", countToScrollHandler, true );

            function countToScrollHandler () {
                if ( pt <= time && height >= window.pageYOffset ) {
                    if ( 0 === flag ) {
                        let timerId = setInterval( () => {
                            if ( pt >= time ) {
                                clearInterval( timerId );
                            }

                            item.innerHTML = parseInt( ( pt * amount ) / time );
                            pt = pt + interval;
                        }, interval );
                    }

                    flag = 1;
                }
            }
        }
    }
}


/**
 * Prevent Xss Attack
 * @param {Node} html 
 */
export function safeContent ( html ) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while ( SCRIPT_REGEX.test( html ) ) {
        html = html.replace( SCRIPT_REGEX, "" );
    }

    // Removing all events from tags...
    html = html.replace( / on\w+="[^"]*"/g, "" );

    return {
        __html: html
    }
}