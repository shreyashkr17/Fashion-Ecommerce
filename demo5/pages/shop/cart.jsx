import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';
import PageHeader from '~/components/features/page-header';

import { actions as cartAction } from '~/store/cart';
import { cartPriceTotal } from '~/utils/index';
import { useSelector } from 'react-redux';

import Razorpay from 'razorpay'
import { Button } from '@mui/material';
import axios from 'axios';
import { or } from 'firebase/firestore';
import Crypto from 'crypto';
import { useRouter } from 'next/router';
import Card from '~/components/features/accordion/card';
import Accordion from '~/components/features/accordion/accordion';
import Bhim from '@/public/Bhim.png';
import { v4 as uuidv4 } from 'uuid';
import ErrorIcon from '@mui/icons-material/Error';

function Cart ( props ) {
    const user = useSelector( ( state ) => state.auth.user );
    const token = useSelector( ( state ) => state.auth.token);
    const bRed = useSelector((state)=> state.auth.billingAddress);
    const sRed = useSelector((state)=> state.auth.shippingAddress);
    // console.log(user)
    const router = useRouter();
    const [ cartList, setCartList ] = useState( [] );
    const [ shippingCost, setShippingCost ] = useState( 0 );
    // const [couponCode]
    const [allAVailableCoupons, setAllAvailableCoupons] = useState();
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [recievedCoupon, setRecievedCoupon] = useState(null);
    const [btnStatus, setBtnStatus] = useState(false);
    const [stateCoupon, setStateCoupon] = useState(false);

    const [error, setError] = useState();
    // console.log(cartList)

    // useEffect(() => {
    //     const fetchAllAvailableCouponse = async() => {
    //         try {
    //             const response = await axios.get('https://njs.iretiensemble.com/orders/get-available-coupons', {
    //                 headers:{
    //                     'Content-Type':'application/json',
    //                     'authorization':`Bearer ${token}`
    //                 }
    //             });

    //             if(response.status === 200 || response.status === 201){
    //                 console.log(response.data)
    //                 setAllAvailableCoupons(response.data.availableCoupon)
    //             }else{
    //                 console.log("Error in fetchAllAvailableCouponse")
    //             }
    //         } catch (error) {
    //             console.log("Error in fetchAllAvailableCouponse:", error)
    //         }
    //     }

    //     fetchAllAvailableCouponse();
    // },[token])
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

    // const handleCouponChange = (coupon) => {
    //     console.log(coupon);
    //     if (coupon.couponType === 'percentval') {
    //         // Calculate shipping cost based on percentage discount
    //         const discountedAmount = cartPriceTotal(props.cartItems) * (coupon.couponPercentage / 100);
    //         setShippingCost(discountedAmount);
    //     } else if(coupon.couponType === 'flatVal') {
    //         // Use flat value for shipping cost
    //         setShippingCost(coupon.couponFlatValue);
    //     }
    //     // Update selected coupon
    //     setSelectedCoupon(coupon.couponCode);
    // }
    const handleCouponChange = (e) => {
        setSelectedCoupon(e.target.value);
    }

    const handleCouponCheck = async () => {
        const data = {couponCode:selectedCoupon,amount:cartPriceTotal(props.cartItems)}
        try {
            const response = await axios.post('https://njs.iretiensemble.com/orders/check-coupon', data, {
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            });
            console.log(response)

            

            if(response.status === 200 || response.status === 201){
                console.log(response.data);
                setRecievedCoupon(response.data.coupon);
                setBtnStatus(true);
            }
        } catch (error) {
            // const {err} = error.response.data.error;
            setError(error.response.data.error);
            setStateCoupon(true);
            console.log(error.response.data.error)
            setTimeout(() => {
                setStateCoupon(false);
            },3000);
        }
    }

    function onChangeShipping ( value ) {
        setShippingCost( value );
    }

    function changeQty ( value, index ) {
        setCartList(
            cartList?.map( ( item, ind ) => {
                if ( ind == index )
                    return {
                        ...item,
                        qty: value,
                        sum:
                            ( item.sale_price
                                ? item.sale_price
                                : item.price ) * value
                    };
                return item;
            } )
        )
    }

    function updateCart ( e ) {
        let button = e.currentTarget;
        button.querySelector( '.icon-refresh' ).classList.add( 'load-more-rotating' );

        setTimeout( () => {
            props.updateCart( cartList );
            button.querySelector( '.icon-refresh' ).classList.remove( 'load-more-rotating' );
        }, 400 );
    }
    // console.log(cartPriceTotal(props.cartItems))

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js",

            script.onload = () => {
                resolve(true);
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script);
        })
    }
    // console.log(cartList);

    const orderDetails = cartList?.map((item) => ({
        productSlug:item.productSlug,
        variantSlug:item.variantSlug,
        quantity:item.qty,
        amount:item.sum,
        size:item.size,
        bust:item.bust,
        hip:item.hip,
        waist:item.waist
    }));
    // console.log(orderDetails)

    const handlePayment = async () => {
        const data = {amount:(cartPriceTotal(props.cartItems) - shippingCost)};
        // const orderId = uuidv4();
        try {
            const res = await initializeRazorpay()
            const {data:{key}} = await axios.get('https://njs.iretiensemble.com/get-razor-pay-key')
            console.log(key)
            const {data:{orders}} = await axios.post('https://njs.iretiensemble.com/orders/checkout', data, {
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            });
            console.log("orders from checkout endpoint",orders)
            const data2 = { orderDetails, orderId:orders.id ,shippingCost,couponCode:selectedCoupon, shippingAddress:sRed, billingAddress:bRed}
            console.log(data2)

            const options = {
                key,
                amount:orders.amount,
                currency: "INR",
                name: "IRETI Ensemble",
                description: "Order Product",
                order_id: orders.id,
                image:'https://ik.imagekit.io/s1vtpplq4/android-chrome-512x512.jpg?updatedAt=1714099977005',
                handler: async function(response){
                    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = response;
                    try {
                        
                        const body = razorpay_order_id + "|" + razorpay_payment_id;
                        const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET 
                        // console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
                        const expectedSignature = Crypto.createHmac('sha256', key).update(body.toString()).digest("hex");
                        
                        const isAuthentic = expectedSignature === razorpay_signature;
                        console.log(isAuthentic);
                        if(isAuthentic){
                            // router.push(`/pages/paymentsucess/${razorpay_payment_id}`)
                            // console.log("Inside isAuthentic if contidion")
                            const response = await axios.post('https://njs.iretiensemble.com/orders/add-orders', data2, {
                                headers:{
                                    'Content-Type':'application/json',
                                    'authorization':`Bearer ${token}`
                                }
                            });
                            if(response.status === 200 || response.status == 201){
                                const {order, shippingAddress, billingAddress} = response.data;
                                
                                router.push(`/pages/paymentsucess/${orders.id}`)
                            }
                        }else{
                            console.log("Razorpay AUthentic Signature is not verified:", isAuthentic);
                            router.push('/pages/paymentfailure')
                        }
                    } catch (error) {
                        console.log("Error Payment During Payment", error);
                        router.push('/pages/paymentfailure')
                    }
                },
                prefill: {
                    name: `${user.firstName} ${user.lastName}`,
                    email: `${user.userEmail}`,
                    contact: `${user.phoneNo}`
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options)
            razor.open()
        } catch (error) {
            console.log("Error in handlePayment:", error);
        }
    }

    return (
        <div className="main" style={{background:"#f8f7f3"}}>
            <PageHeader title="Shopping Cart" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}} >   Shopping Cart
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5">
                <div className="cart">
                    <div className="container">
                        {
                            cartList.length > 0 ?
                                <div className="row">
                                    <div className="mb-3" style={{width:"100%"}}>
                                        <table className="table table-cart table-mobile">
                                            <thead>
                                                <tr>
                                                    <th style={{fontFamily:"'Gotham Black',sans-serif",color:"#14151A"}}>Product</th>
                                                    <th style={{fontFamily:"'Gotham Black',sans-serif",color:"#14151A"}}>Variant Price</th>
                                                    <th style={{fontFamily:"'Gotham Black',sans-serif",color:"#14151A"}}>Quantity</th>
                                                    <th style={{fontFamily:"'Gotham Black',sans-serif",color:"#14151A"}}>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                { cartList.length > 0 ?
                                                    cartList?.map( ( item, index ) =>
                                                        <tr key={ index }>
                                                            <td className="product-col" >
                                                                <div className="product" style={{background:"#f8f7f3"}}>
                                                                    <figure className="product-media">
                                                                        <ALink href={ `/product/sticky/${item.productSlug}` } className="product-image">
                                                                            <img src={ item.smPics[0].photoUrl[0] } alt="product" />
                                                                        </ALink>
                                                                    </figure>

                                                                    <h4 className="product-title" style={{background:"#f8f7f3"}}>
                                                                        <ALink href={ `/product/sticky/${item.productSlug}` }>{ item.name }</ALink>
                                                                    </h4>
                                                                </div>
                                                            </td>

                                                            <td className="price-col" style={{fontFamily:"'Gotham Thin',sans-serif",color:"#14151A"}}>
                                                                ₹ {
                                                                    // item.productsalePrice ?
                                                                    //     item.productsalePrice.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )
                                                                    //     :
                                                                    //     item.productPrice.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )
                                                                    item.price

                                                                }
                                                            </td>

                                                            <td className="quantity-col">
                                                                <Qty value={ item.qty } changeQty={ current => changeQty( current, index ) } adClass="cart-product-quantity"></Qty>
                                                            </td>

                                                            <td className="total-col" style={{fontFamily:"'Gotham Thin',sans-serif",color:"#14151A"}}>
                                                                {/* ${ item.sum.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) } */}
                                                            </td>

                                                            <td className="remove-col">
                                                                <button className="btn-remove" onClick={ () => props.removeFromCart( item ) }><i className="icon-close"></i></button>
                                                            </td>
                                                        </tr>
                                                    ) :
                                                    <tr>
                                                        <td>
                                                            <p className="pl-2 pt-1 pb-1"> No Products in Cart </p>
                                                        </td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>

                                        <div className="cart-bottom">
                                            <div className="cart-discount">
                                                <div className="input-group">
                                                    <input style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}} type="text" value={selectedCoupon} onChange={handleCouponChange} className="form-control" required placeholder="coupon code" disabled={btnStatus? true:false} />
                                                    <div className="input-group-append" style={{marginLeft:"-11px", position:"relative"}} aria-disabled={btnStatus?true:false}>
                                                        <button onClick={() => handleCouponCheck()} className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right"></i></button>
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <button className="btn btn-outline-dark-2" onClick={ updateCart }><span>UPDATE CART</span><i className="icon-refresh"></i></button>
                                        </div>
                                        {stateCoupon? <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.4rem"}}><ErrorIcon fontSize="small" style={{color:"red"}}/> {error}</p>:null}
                                    </div>
                                    {/*<div className="bankDetailsCont">
                                        <Accordion adClass="accordion-plus product-details-accordion pb-2 mb-0">
                                            <Card title="UPI Details" adClass="card-box card-sm" expanded="true">
                                                <div className="innerBankDetail">
                                                    <div className="leftBankDetail">
                                                        <img src="Bhim.png" alt="Bhim" />
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>Account No :<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> 7522029653@kotak811</span></p>
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>PhonePe ID :<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> shreyadavv@ybl</span></p>
                                                    </div>
                                                    <div className="leftBankDetail">
                                                        <img src="Scanner.png" alt="PhonePe" />
                                                    </div>
                                                </div>
                                            </Card>
                                            <Card title="NEFT Details" adClass="card-box card-sm" >
                                                <div className="innerBankDetail">
                                                    <div className="leftBankDetail">
                                                        {/* <img src="Bhim.png" alt="Bhim" /> }
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>Account No:<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> 6249577600</span></p>
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>IFSC Code :<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> KKBK0008067</span></p>
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>Home Branch :<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> BANGALORE - Vijaynagar</span></p>
                                                        <p style={{fontFamily:"'Gotham Medium', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}>Account Holder Name :<span style={{fontFamily:"'Gotham Thin', sans-serif",color:"#1a1a1a",fontSize:"1.7rem"}}> Shreya Yadav</span></p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Accordion>
                                            </div>*/}
                                    <aside className="">
                                        <div className="summary summary-cart" style={{width:"77.5vw"}}>
                                            <h3 className="summary-title" style={{color:"#14151A"}}>Cart Total</h3>

                                            <table className="table table-summary">
                                                <tbody>
                                                    <tr className="summary-subtotal">
                                                        <td style={{fontFamily:"'Gotham Medium',sans-serif",color:"#14151A"}}>Subtotal:</td>
                                                        <td style={{fontFamily:"'Gotham Medium',sans-serif",color:"#14151A"}}>₹ { cartPriceTotal( props.cartItems ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                    </tr>
                                                    {allAVailableCoupons?.length>0 && <tr className="summary-shipping">
                                                        <td>Coupons Available:</td>
                                                        <td>&nbsp;</td>
                                                    </tr>}
                                                    {/* {allAVailableCoupons ? allAVailableCoupons.map((coupon, index) => (
                                                        <tr className="summary-shipping-row" key={index}>
                                                            <td style={{width:'100%'}}>
                                                                <div className='mainCouponContainer'>
                                                                    <input type="checkbox" name="coupon" id={`coupon-${index}`} value={coupon.couponCode}  checked={selectedCoupon === coupon.couponCode} onChange={() => handleCouponChange(coupon)}/>
                                                                    <div className="leftContainer">
                                                                        {coupon.couponCode}
                                                                    </div>
                                                                    <div className="rightContainer">
                                                                        <p style={{fontFamily:"'Gotham Thin', sans-serif"}}>{coupon.couponDescription}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )):<p>No Coupons Available</p>} */}
                                                    <tr className="summary-total">
                                                        <td>Total:</td>
                                                        <td>
                                                            ₹ { ( cartPriceTotal( props.cartItems ) - shippingCost ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {user ? (
                                                (
                                                    <Button
                                                        className="btn btn-outline-primary-2 btn-order btn-block"
                                                        style={{background:"black"}}
                                                        onClick={() => handlePayment()}
                                                    >
                                                        <span style={{fontFamily:"'Gotham Black',sans-serif",color:"#f8f7f3",fontSize:"1.6rem", padding:"5px"}}>Pay & Place Order</span>
                                                    </Button>
                                                ) 
                                            ) : (
                                                <ALink
                                                    className="btn btn-outline-primary-2 btn-order btn-block"
                                                    href="/pages/login"
                                                >
                                                    Login/Sign
                                                </ALink>
                                            )}
                                        </div>

                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh"></i></ALink>
                                    </aside>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cart-empty-page text-center">
                                            <i className="cart-empty icon-shopping-cart" style={ { lineHeight: 1, fontSize: '15rem' } }></i>
                                            <p className="px-3 py-2 cart-empty mb-3" style={{fontFamily:"'Gotham Thin',sans-serif",color:"#14151A",fontSize:"3rem"}}>No products added to the cart</p>
                                            <p className="return-to-shop mb-0">
                                                <ALink
                                                    href="/shop/sidebar/3cols"
                                                    className="btn btn-primary"
                                                >RETURN TO SHOP</ALink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => (
    {
        cartItems: state.cartlist.data
    }
)

export default connect( mapStateToProps, { ...cartAction } )( Cart );