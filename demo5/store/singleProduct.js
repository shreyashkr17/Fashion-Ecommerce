import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define action types
export const actionTypes = {
    SET_SINGLE_PRODUCT: 'SET_SINGLE_PRODUCT',
};

// Define initial state
const initialState = {
    singleProduct: null,
};

// Define the reducer function
const singleProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: action.payload.singleProduct,
            };
        default:
            return state;
    }
};

// Define action creators
export const actions = {
    setSingleProduct: (singleProduct) => ({
        type: actionTypes.SET_SINGLE_PRODUCT,
        payload: {
            singleProduct,
        },
    }),
};

// Define Redux persist configuration
const persistConfig = {
    keyPrefix: "ireti-",
    key: "singleProduct",
    storage,
};

// Export the enhanced reducer with persistence applied
export default persistReducer(persistConfig, singleProductReducer);
