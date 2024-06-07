import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';

export const actionTypes = {
    addToWishlist: 'ADD_TO_WISHLIST',
    removeFromWishlist: 'REMOVE_FROM_WISHLIST',
    refreshStore: 'REFRESH_STORE',
}

const initialState = {
    data: [],
}

const wishlistReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.addToWishlist:
            var findIndex = state.data.findIndex( item => item.id === action.payload.product.id );
            if ( findIndex == -1 ) {
                return {
                    data: [
                        ...state.data,
                        action.payload.product
                    ]
                };
            }


        case actionTypes.removeFromWishlist:
            return {
                data: state.data.filter( item => item.id !== action.payload.product.id )
            };

        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
}

export const actions = {
    addToWishlist: product => ( {
        type: actionTypes.addToWishlist,
        payload: {
            product
        }
    } ),

    removeFromWishlist: product => ( {
        type: actionTypes.removeFromWishlist,
        payload: {
            product
        }
    } )
}

export function* wishlistSaga () {
    yield takeEvery( actionTypes.addToWishlist, function* saga ( e ) {
        toast.success( "Product added to Wishlist" );
    } )
}

const persistConfig = {
    keyPrefix: "molla-",
    key: 'wishlist',
    storage,
}

export default persistReducer( persistConfig, wishlistReducer );