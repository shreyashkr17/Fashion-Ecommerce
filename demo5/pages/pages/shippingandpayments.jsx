import React from 'react'
import ALink from '~/components/features/alink'

function shippingandpayments() {
  return (
    <div className="main" style={{background:"#f8f7f3"}}>
        <nav className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/" style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item active" style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Returns & Exchanges</li>
                </ol>
            </div>
        </nav>
        <div className="main">
            <div className="col-12" style={{textAlign:"center"}}>
                <h2 className="title mb-3">Shipping & Payments</h2>
            </div>
            <div className="page-content">
                <div className="container" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>How can I check if you deliver to my pincode?</span>
                    <br />
                    <br />
                    We currently deliver to most pincodes in India. If you want to confirm your pincode, please confirm at the checkout stage.
                    For further queries please reach out to us on our iretiensemble@gmail.com.
                    <br />
                    <br />
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>Can I arrange a pickup for my order?</span>
                    <br />Yes. Pickups can be arranged for DELHI-NCR orders. For the address you can reach out to us on (iretiensemble@gmail.com).There are NO SHIPPING CHARGES on your garments. THE SHIPPING CHARGES ARE ON US.
                    <br />
                    <br />
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>How long does it take to deliver my order?</span>
                    <br />
                    For individual product delivery timelines*, please refer below.
                    <br />
                    The standard free delivery takes 5-7 working days to complete the delivery. Whereas, made to measure garments can take up to 7-10 working days to complete the delivery. 
                    <br />
                    Express shipping takes 4-5 working days to complete the delivery. 
                    <br />
                    Also the express shipping charges will be born by the customers.
                    <br />
                    *Some products may have longer delivery timelines.
                    <br />
                    <br />
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>Can I ship to multiple addresses at the same time?</span>
                    <br />
                    <br />
                        Unfortunately, we are unable to ship to multiple addresses at this time. We recommend placing separate orders for each address.
                    <br />
                        Do you ship products outside India?
                    <br />
                    We do not ship outside India as of now. In case of any queries please reach out to us on our email id and whatsapp.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default shippingandpayments
