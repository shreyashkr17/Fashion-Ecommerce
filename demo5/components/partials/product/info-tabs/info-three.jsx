import React, {useState} from 'react';
import Card from '~/components/features/accordion/card';
import Accordion from '~/components/features/accordion/accordion';
import {toast} from "react-toastify"
import ALink from '~/components/features/alink';
import axios from 'axios';
import { useSelector } from 'react-redux';

function InfoThree ( props ) {
    const { product } = props;
    const token = useSelector((state) => state.auth.token);
    // console.log(product)
    const [rating, setRatings] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingClick = (e) => {
        // e.preventDefault();
        if (e.currentTarget && e.currentTarget?.parentNode && e.currentTarget?.parentNode.querySelector('.active')) {
            e.currentTarget?.parentNode.querySelector('.active').classList.remove('active');
        }
        if (e.currentTarget) {
            e.currentTarget.classList.add('active');
            setRating(parseInt(e.currentTarget.className.split('-')[1]));
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const productSlug = product?.productSlug
    const data = {comment, productSlug}

    const handleSubmit = async () => {
        // e.preventDefault();
        // Do something with the rating and comment values
        // console.log('Rating:', rating);
        // console.log('Comment:', comment);

        try {
            const response = await axios.post('https://njs.iretiensemble.com/products/upload-comment-by-product', data, {
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            });

            if(response.status === 200 || response.status === 201){
                toast.success("Comment Posted Succesfully");
            }
        } catch (error) {
            console.log(error)
        }
        // Reset the form or perform any other desired actions
    };

    const setRating = ( e ) => {
        // e.preventDefault();

        if ( e.currentTarget.parentNode.querySelector( '.active' ) ) {
            e.currentTarget.parentNode.querySelector( '.active' ).classList.remove( 'active' );
        }

        e.currentTarget.classList.add( 'active' );
    }

    if ( !product ) {
        return <div></div>
    }

    return (
        <Accordion adClass="accordion-plus product-details-accordion pb-2 mb-0">
            <Card title="Description" adClass="card-box card-sm">
                <div className="product-desc-content">
                    <p className="pb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>{product.productshortDesc}</p>
                </div>
            </Card>
            {product.productAddInfo && product.productAddInfo.length>0 ? <Card title="Additional Description" adClass="card-box card-sm">
                <div className="product-desc-content">
                    <ul className="pb-1" style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>
                        {product?.productAddInfo.map((info) => {
                            return (
                                <li key={info}>{info}</li>
                            )
                        })}
                    </ul>
                </div>
            </Card>:null}
            <Card title="Shipping & Returns" adClass="card-box card-sm">
                <div className="product-desc-content">
                    <ul>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Delivery to Most Pincodes:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>We deliver at most of the pincode</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Pickup Available:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>Arrange pickup for DELHI-NCR orders via email or WhatsApp.</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>What are the shipping charges:</span>  <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>No shipping charges!</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Standard Delivery:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>5-7 working days (may vary for some products).</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Made-To-Measure:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>7-10 working days.</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Express Shipping:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>4-5 working days (charges apply).</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>Single Address Shipping:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>Can't ship to multiple addresses; place separate orders.</span></li>
                        <li><span style={{fontFamily:"'Gotham Medium',sans-serif"}}>International Shipping:</span> <span style={{fontFamily:"'Gotham Thin',sans-serif"}}>Currently only within India. Reach out for queries.</span></li>
                    </ul>
                </div>
            </Card>
            <Card title="Care Instructions" adClass="card-box card-sm">
                {/* <div className="product-desc-content">
                    <p style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>{product.productShippingInfo}</p>
                </div> */}
                <div className="product-desc-content">
                    <ul>
                        <li style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Dry clean only.</li>
                        <li style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Wash dark colors seperately</li>
                        <li style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Do not bleach</li>
                        <li style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Dry in shade</li>
                        <li style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>Do not wring by hand</li>
                    </ul>
                </div>
            </Card>
            <Card title={ `Reviews (${product.productReview})` } adClass="card-box card-sm">
                <div className="reviews">
                    
                </div>

                <div className="reply">
                    <div className="title-wrapper text-left">
                        <h3 className="title title-simple text-left text-normal" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Add a Review</h3>
                    </div>
                    <div className="rating-form">
                        <label htmlFor="rating" className="text-dark" style={{fontFamily:"'Gotham Black',sans-serif"}}>Your Reviews * </label>
                        {/* <span className="rating-stars selected">
                        {[1, 2, 3, 4, 5].map((num, index) => (
                            <a
                            className={`star-${num}`}
                            onClick={handleRatingClick}
                            key={'star-' + index}
                            >
                            {num}
                            </a>
                        ))}
                        </span> */}

                        {/* <select name="rating" id="rating" required=""
                            style={ { display: 'none' } }>
                            <option value="">Rate…</option>
                            <option value="5">Perfect</option>
                            <option value="4">Good</option>
                            <option value="3">Average</option>
                            <option value="2">Not that bad</option>
                            <option value="1">Very poor</option>
                        </select> */}
                    </div>
                    {/* <form action="#"> */}
                        <textarea
                            style={{ fontFamily: "'Gotham Thin',sans-serif" }}
                            id="reply-message"
                            cols="30"
                            rows="6"
                            className="form-control mb-2"
                            placeholder="Comment *"
                            required
                            value={comment}
                            onChange={handleCommentChange}
                        >
                        </textarea>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                    {/* </form> */}
                </div>
            </Card>
        </Accordion>
    );
}

export default React.memo( InfoThree );