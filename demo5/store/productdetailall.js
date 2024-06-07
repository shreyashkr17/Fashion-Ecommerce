import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define action types
export const actionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
};

// Define initial state
const initialState = {
    products: [],
};

// Define the reducer function
const productsAllReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
            };
        default:
            return state;
    }
};

// Define action creators
export const actions = {
    setProducts: (products) => ({
        type: actionTypes.SET_PRODUCTS,
        payload: {
            products,
        },
    }),
};

// Define Redux persist configuration
const persistConfig = {
    keyPrefix: "productsall-",
    key: "productsall",
    storage,
};

// Export the enhanced reducer with persistence applied
export default persistReducer(persistConfig, productsAllReducer);
