import { useEffect } from 'react';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';

import { cartPriceTotal } from '~/utils/index';

function Checkout ( props ) {
    const { cartlist } = props;
    const user = useSelector( ( state ) => state.auth.user );
    const token = useSelector( ( state ) => state.auth.token);
    // console.log(user)
    const router = useRouter();
    const [ cartList, setCartList ] = useState( [] );
    const [ shippingCost, setShippingCost ] = useState( 0 );
    // const [couponCode]
    const [allAVailableCoupons, setAllAvailableCoupons] = useState();
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [recievedCoupon, setRecievedCoupon] = useState(null);
    const [btnStatus, setBtnStatus] = useState(false);

    useEffect(() => {
        if(recievedCoupon){
            if(recievedCoupon.couponType === 'percentval') {
                const discountedAmount = cartPriceTotal(props.cartItems) * (recievedCoupon.couponPercentage / 100);
                setShippingCost(discountedAmount);
            } else if(recievedCoupon.couponType === 'flatVal') {
                setShippingCost(recievedCoupon.couponFlatValue);
            }
        }
    },[recievedCoupon]);

    useEffect( () => {
        setCartList( props.cartItems );
    }, [ props.cartItems ] );

    const handleCouponChange = (e) => {
        setSelectedCoupon(e.target.value);
    }

    const handleCouponCheck = async () => {
        const data = {couponCode:selectedCoupon}
        try {
            const response = await axios.post('https://njs.iretiensemble.com/orders/check-coupon', data, {
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                // console.log(response.data);
                setRecievedCoupon(response.data.coupon);
                setBtnStatus(true);
            }else{
                console.log("Coupon Is Already Used or Invalid Coupon Code")
            }
        } catch (error) {
            console.log("Coupon Is Already Used or Invalid Coupon Code")
        }
    }

    function onChangeShipping ( value ) {
        setShippingCost( value );
    }

    useEffect( () => {
        document.querySelector( 'body' ).addEventListener( "click", clearOpacity )

        return () => {
            document.querySelector( 'body' ).removeEventListener( "click", clearOpacity );
        }
    }, [] )

    function clearOpacity () {
        if ( document.querySelector( '#checkout-discount-input' ).value == '' )
            document.querySelector( '#checkout-discount-form label' ).removeAttribute( 'style' );
    }

    function addOpacity ( e ) {
        e.currentTarget.parentNode.querySelector( "label" ).setAttribute( "style", "opacity: 0" );
    }

    return (
        <div className="main">
            <PageHeader title="Checkout" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form">
                                <input type="text" className="form-control" required id="checkout-discount-input" onClick={ addOpacity } />
                                <label style={{fontFamily:"'Gotham Thin',sans-serif"}} htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Click here to enter your code</span></label>
                            </form>
                        </div>

                        <form action="#">
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Billing Details</h2>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>First Name *</label>
                                            <input type="text" className="form-control" required style={{fontFamily:"'Gotham Medium',sans-serif"}}/>
                                        </div>

                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Last Name *</label>
                                            <input type="text" className="form-control" required style={{fontFamily:"'Gotham Medium',sans-serif"}} />
                                        </div>
                                    </div>

                                    <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Company Name (Optional)</label>
                                    <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" />

                                    <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Country *</label>
                                    <input  style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" required />

                                    <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Street address *</label>
                                    <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" placeholder="House number and Street name" required />
                                    <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." required />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Town / City *</label>
                                            <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>State / County *</label>
                                            <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Postcode / ZIP *</label>
                                            <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="text" className="form-control" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Phone *</label>
                                            <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="tel" className="form-control" required />
                                        </div>
                                    </div>

                                    <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Email address *</label>
                                    <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="email" className="form-control" required />

                                    {/* <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                                        <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                    </div> */}

                                    {/* <SlideToggle duration={ 300 } collapsed >
                                        { ( { onToggle, setCollapsibleElement } ) => (
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mt-0 address-box">
                                                    <input type="checkbox" className="custom-control-input"
                                                        id="different-shipping" onChange={ onToggle } />
                                                    <label className="custom-control-label" htmlFor="different-shipping">Ship to a different address?
                                                    </label>
                                                </div>
                                                <div className="shipping-info" ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>First name <abbr className="required"
                                                                    title="required">*</abbr></label>
                                                                <input type="text" className="form-control" required />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Last name <abbr className="required"
                                                                    title="required">*</abbr></label>
                                                                <input type="text" className="form-control" required />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Company name (optional)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>Country / Region <span className="required">*</span></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">Vanuatu</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-1 pb-2">
                                                        <label>Street address <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control"
                                                            placeholder="House number and street name" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="text" className="form-control"
                                                            placeholder="Apartment, suite, unit, etc. (optional)" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Town / City <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control" required />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>State / County <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">NY</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Postcode / ZIP <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                        ) }
                                    </SlideToggle > */}

                                    <label style={{fontFamily:"'Gotham Medium',sans-serif"}}>Order notes (optional)</label>
                                    <textarea style={{fontFamily:"'Gotham Medium',sans-serif"}} className="form-control" cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                </div>

                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <h3 className="summary-title">Your Order</h3>

                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th style={{fontFamily:"'Gotham Medium',sans-serif"}}>Product</th>
                                                    <th style={{fontFamily:"'Gotham Medium',sans-serif"}}>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                { cartlist?.map( ( item, index ) =>
                                                    <tr key={ index }>
                                                        <td><ALink style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}} href={ `/product/sticky/${item.slug}` }>{ item.name }</ALink></td>
                                                        <td style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>₹ { item.sum.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                    </tr>
                                                ) }
                                                <tr className="summary-subtotal">
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>Subtotal:</td>
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>₹ { cartPriceTotal( cartlist ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                </tr>
                                                {/* <tr>
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>Shipping:</td>
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>Free Shipping</td>
                                                </tr> */}
                                                <tr className="summary-total">
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>Total:</td>
                                                    <td style={{fontFamily:"'Gotham Medium',sans-serif"}}>${ cartPriceTotal( cartlist ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {/* <Accordion type="checkout">
                                            <Card title="Direct bank transfer" expanded={ true }>
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif"}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </Card>

                                            <Card title="Check payments">
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif"}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </Card>

                                            <Card title="Cash on delivery">
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif"}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </Card>

                                            <Card title='PayPal'>
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif"}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </Card>

                                            <Card title='Credit Card (Stripe)'>
                                                <img src="images/payments-summary.png" alt="payments cards" className="mb-1" />
                                                <p style={{fontFamily:"'Gotham Thin',sans-serif"}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </Card>
                                        </Accordion> */}

                                        <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
                                            <span className="btn-text">Place Order</span>
                                            <span className="btn-hover-text">Proceed to Checkout</span>
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const mapStateToProps = ( state ) => ( {
    cartlist: state.cartlist.data,
} )

export default connect( mapStateToProps )( Checkout );