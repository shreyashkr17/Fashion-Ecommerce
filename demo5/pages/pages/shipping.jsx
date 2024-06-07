import React from 'react'
import ALink from '~/components/features/alink'

function shipping() {
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
                <h2 className="title mb-3">RETURNS & EXCHANGES</h2>
            </div>
            <div className="page-content">
                <div className="container">
                    <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.5rem"}}>Thank you for being a part of our community. If you’re not satisfied with the product or feel like a different size or product would work better, don’t worry, we are here for you!
                    <br />
                    <br />
                    Products can also be exchanged in the case if the product received is damaged, or if there is an issue in standard sizes. 
                    <br />
                    There are no return policies for made to measure ensemble. 
                    <br />
                    Exchanges can only be made within a window of 3 days from receiving the product. 
                    <br />
                    <br />
                    Reverse Pick Up is subject to availability of the service in your area pin-code and is subjected to change depending on the ground condition.
                    <br />
                    All disputes regarding non-delivery of order or incorrect product received need to be raised within 48 hours of receiving the product.
                    <br />
                    <br />How to initiate Exchange process?
                    <br />Reach out to us on (email)  with your order number within 2 days of receiving your package.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default shipping
