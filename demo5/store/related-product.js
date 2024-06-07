import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    SET_RELATED_PRODUCTS: 'SET_RELATED_PRODUCTS',
};

const initialState = {
    relatedProducts: [],
};
const relatedProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RELATED_PRODUCTS:
            return {
                ...state,
                relatedProducts: action.payload.relatedProducts,
            };
        default:
            return state;
    }
};

export const actions = {
    setRelatedProducts: (relatedProducts) => ({
        type: actionTypes.SET_RELATED_PRODUCTS,
        payload: {
            relatedProducts,
        },
    }),
};

const persistConfig = {
    keyPrefix: "relatedProduct-",
    key: "relatedProduct",
    storage,
};

export default persistReducer(persistConfig, relatedProductReducer);