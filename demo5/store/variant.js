import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    SET_PRODUCT_VARIANTS: 'SET_PRODUCT_VARIANTS',
    REMOVE_PRODUCT_VARIANTS: 'REMOVE_PRODUCT_VARIANTS',
};

const initialState = {
    productVariants: [],
};

const productVariantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT_VARIANTS:
            return {
                ...state,
                productVariants: action.payload.productVariants,
            };
        default:
            return state;
    }
}

export const actions = {
    setProductVariants: (productVariants) => ({
        type: actionTypes.SET_PRODUCT_VARIANTS,
        payload: {
            productVariants,
        },
    })
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "productVariants",
    storage,
};

export default persistReducer(persistConfig, productVariantReducer);