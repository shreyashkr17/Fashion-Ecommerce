import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

export const actionTypes = {
    addToCompare: 'ADD_TO_COMPARE',
    removeFromCompare: 'REMOVE_FROM_COMPARE',
    clearAllFromCompare: 'CLEAR_ALL_FROM_COMPARE',
    refreshStore: 'REFRESH_STORE'
};

const initialState = {
    data: []
}

const compareReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.addToCompare:
            var findIndex = state.data.findIndex( item => item.id == action.payload.product.id );
            if ( findIndex == -1 ) {
                return {
                    data: [
                        ...state.data,
                        action.payload.product
                    ]
                };
            }

        case actionTypes.removeFromCompare:
            return {
                data: state.data.filter( item => item.id != action.payload.product.id )
            };

        case actionTypes.clearAllFromCompare:
            return initialState;

        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
}


export const actions = {
    addToCompare: product => ( {
        type: actionTypes.addToCompare,
        payload: {
            product
        }
    } ),

    removeFromCompare: product => ( {
        type: actionTypes.removeFromCompare,
        payload: {
            product
        }
    } ),

    clearAllFromCompare: () => ( {
        type: actionTypes.clearAllFromCompare,
        payload: {}
    } ),

    refreshStore: () => ( {
        type: actionTypes.refreshStore,
        payload: {}
    } )
}

export function* compareSaga () {
    yield takeEvery( actionTypes.addToCompare, function* saga ( e ) {
        toast.success( "Product added to Compare" );
    } );
}

const persistConfig = {
    keyPrefix: 'molla-',
    key: 'compare',
    storage
}

export default persistReducer( persistConfig, compareReducer );