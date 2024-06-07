import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    STORE_PRODUCT_IMAGES: 'STORE_PRODUCT_IMAGES',
};

const initialState = {
    productImages: [],
};

const productsmpicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_PRODUCT_IMAGES:
            return {
                ...state,
                productImages: action.payload.productImages,
            };
        default:
            return state;
    }
};

export const actions = {
    storeProductImages: (productImages) => ({
        type: actionTypes.STORE_PRODUCT_IMAGES,
        payload: { productImages },
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "productssmpics",
    storage,
};


export default persistReducer(persistConfig, productsmpicReducer);