import React from 'react';
import { connect } from 'react-redux';

import ALink from '~/components/features/alink';

function WishlistMenu ( props ) {
    const { wishlist } = props;

    return (
        <li>
            <ALink href="/shop/wishlist" title="Wishlist">
                <i className="icon-heart-o"></i>My Wishlist
                <span>( { wishlist.length } )</span>
            </ALink>
        </li>
    );
}

function mapStateToProps ( state ) {
    return {
        wishlist: state.wishlist.data
    }
}

export default connect( mapStateToProps, {} )( WishlistMenu );