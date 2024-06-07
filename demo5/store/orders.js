import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',
};

const initialState = {
    orders: [],
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
                error: null,
            };
        case actionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export const actions = {
    fetchOrdersSuccess: (orders) => ({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: { orders },
    }),
    fetchOrdersFailure: (error) => ({
        type: actionTypes.FETCH_ORDERS_FAILURE,
        payload: { error },
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "orders",
    storage,
};

// Export the persisted reducer
export default persistReducer(persistConfig, orderReducer);