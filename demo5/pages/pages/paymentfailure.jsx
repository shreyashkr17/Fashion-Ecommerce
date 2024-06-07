import React from 'react'

function paymentfailure() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src="paymentfailure.gif" alt="Sample Image" style={{ width: '100px', height: 'auto' }} />
            {/* Reference */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Payment Failed</h3>
                <p>Unfortunately, your order was not successful. If the money was deducted from your account, it will be returned to your bank within 5-6 business days.</p>
            </div>
        </div>
    </div>
  )
}

export default paymentfailure
