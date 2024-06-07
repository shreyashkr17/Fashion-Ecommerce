import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define action types
export const actionTypes = {
    SET_INSTAGRAM_DETAILS: 'SET_INSTAGRAM_DETAILS',
};

// Define initial state
const initialState = {
    instagramDetails: [],
};

// Define the reducer function
const instagramReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INSTAGRAM_DETAILS:
            return {
                ...state,
                instagramDetails: action.payload.instagramDetails,
            };
        default:
            return state;
    }
};

// Define action creators
export const actions = {
    setInstagramDetails: (instagramDetails) => ({
        type: actionTypes.SET_INSTAGRAM_DETAILS,
        payload: {
            instagramDetails,
        },
    }),
};

// Define Redux persist configuration
const persistConfig = {
    keyPrefix: "ireti-",
    key: "instagram",
    storage,
};

// Export the enhanced reducer with persistence applied
export default persistReducer(persistConfig, instagramReducer);
