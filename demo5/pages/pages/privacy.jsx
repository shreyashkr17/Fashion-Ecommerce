import React from 'react'
import ALink from '~/components/features/alink'

function privacy() {
  return (
    <div className="main" style={{background:"#f8f7f3"}}>
        <nav className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/"  style={{fontFamily:"'Gotham Light',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item active"  style={{fontFamily:"'Gotham Light',sans-serif",fontWeight:"800"}}>Privacy Policy</li>
                </ol>
            </div>
        </nav>
        <div className="main">
            <div className="col-12" style={{textAlign:"center"}}>
                <h2 className="title mb-3">Privacy Policy</h2>
            </div>
            <div className="page-content">
                <div className="container">
                    <p  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}}>This Privacy Policy explains how IRETI ("Company") collects, uses, and protects the personal information you provide while using the fashion e-commerce website ("Website"). You consent to the practices outlined in this Policy by accessing or using the Website. If you do not agree with this Policy, please do not use the Website.
                    <br />
                    <br />
                    <h4>Information Collection and Use:</h4>
                    {/* <br /> */}
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>Personal Information: </span> The Company may collect personal information from you, such as your name, email address, contact number, shipping address, and payment details when you register for an account, place an order, or engage in other activities on the Website.
                    <br />
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>Non-Personal Information:</span> The Company may collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information is used to analyze trends, administer the Website, and improve user experience.
                    <br />
                    <span style={{fontFamily:"'Gotham Black',sans-serif"}}>Use of Information:</span> The Company may use your personal information to:Process and fulfill your orders, including shipping and delivery. Communicate with you regarding your orders, account, or inquiries. Provide customer support and respond to your requests.
                    <br />
                    <br />
                    Send you promotional offers, newsletters, or marketing communications with your consent. Improve and personalize your experience on the Website. The Company may use non-personal information for analytical purposes, to monitor and improve the Website's performance, and to ensure its security.
                    <br />
                    <br />
                    The Company may share your personal information with third-party service providers, such as payment processors, shipping carriers, or marketing platforms, to facilitate order processing, delivery, or marketing activities.
                    <br />
                    <br />
                    The Company may disclose personal information when required by law, court order, or government regulation, or if it believes such disclosure is necessary to protect its rights, property, or safety, or that of others.
                    <br />
                    <br />
                    The Company does not sell, rent, or lease your personal information to third parties for their marketing purposes without your explicit consent.

                    <br />
                    <br />
                    <h4>Cookies and Tracking Technologies:</h4>
                    The Website may use cookies, web beacons, and similar technologies to enhance your browsing experience, analyze trends, and gather information about user preferences. You have the option to disable cookies through your browser settings, but it may affect certain features and functionality of the Website.
                    <br />
                    <br />
                    <h4>Data Security:</h4>
                    The Company implements reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the Internet or electronic storage method is 100% secure. The Company cannot guarantee the absolute security of your information.
                    <br />
                    <br />
                    <h4>Third-Party Links:</h4>
                    The Website may contain links to third-party websites or services. This Privacy Policy applies only to the Company's Website, and the Company is not responsible for the privacy practices or content of third-party sites. We encourage you to review the privacy policies of those websites.
                    <br />
                    <br />
                    <h4>Children's Privacy:</h4>
                    The Website is not intended for individuals under the age of 18. The Company does not knowingly collect personal information from children. If you believe a child has provided personal information on the Website, please contact the Company to have it removed.
                    <br />
                    <br />
                    <h4>Indemnity:</h4>
                    You agree to indemnify and hold the Company harmless from any claims, losses, liabilities, damages, costs, or expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Website, violation of this Policy, or infringement of any third-party rights.
                    <h4>Changes to the Privacy Policy:</h4>
                    The Company reserves the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated Policy on the Website. Your continued use of the Website after any modifications constitutes your acceptance of the revised Policy.
                    <br />
                    <br />
                    <h4>Contact Us:</h4>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or the Company's handling of your personal information, please contact us at <strong>iretiensemble@gmail.com</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default privacy
