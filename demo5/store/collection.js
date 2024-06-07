import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    SET_COLLECTION_DETAILS: 'SET_COLLECTION_DETAILS',
};

const initialState = {
    collections: [],
};

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COLLECTION_DETAILS:
            return {
                ...state,
                collections: action.payload.collections,
            };
        default:
            return state;
    }
};

export const actions = {
    setCollectionDetails: (collections) => ({
        type: actionTypes.SET_COLLECTION_DETAILS,
        payload: { collections },
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "collections",
    storage,
};

export default persistReducer(persistConfig, collectionReducer);
