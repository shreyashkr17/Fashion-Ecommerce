import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { takeEvery, put, call } from "redux-saga/effects";

export const actionTypes = {
    FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',
};

const initialState = {
    products: [],
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                error: null,
            };
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export const actions = {
    fetchProductsSuccess: (products) => ({
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: { products },
    }),
    fetchProductsFailure: (error) => ({
        type: actionTypes.FETCH_PRODUCTS_FAILURE,
        payload: { error },
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "products",
    storage,
};

export default persistReducer(persistConfig, productReducer);