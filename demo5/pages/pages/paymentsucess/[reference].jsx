import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { actions as cartActions } from '~/store/cart';
import Alink from '~/components/features/alink2';

function Reference() {
    const router = useRouter();
    const {reference} = router.query;
    // console.log(reference)
    const dispatch = useDispatch();
    useEffect(() => {
        // Clear cartList when the component mounts
        dispatch(cartActions.updateCart([]));
    }, [dispatch]);
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div>
            <img src="paymentsucess.gif" alt="Sample Image" style={{ width: '400px', height: 'auto' }} />
            {/* Reference */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Order Succesfully Placed</h3>
                <p>Order Id: {reference}</p>
            </div>
        </div>
        <a href='/'>
            <button className="btn btn-outline-dark-2 mt-2">
                <p>Go Back To Home</p>
            </button>
        </a>
    </div>
  )
}

export default Reference
