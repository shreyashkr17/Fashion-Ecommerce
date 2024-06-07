import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    SET_BLOG_DETAILS: 'SET_BLOG_DETAILS',
    REMOVE_BLOG_DETAILS: 'REMOVE_BLOG_DETAILS',
};

const initialState = {
    blogDetails: [],
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_BLOG_DETAILS:
            return {
                ...state,
                blogDetails: action.payload.blogDetails,
            };
        case actionTypes.REMOVE_BLOG_DETAILS:
            return {
                ...state,
                blogDetails: [],
            };
        default:
            return state;
    }
};

export const actions = {
    setBlogDetails: (blogDetails) => ({
        type: actionTypes.SET_BLOG_DETAILS,
        payload: {
            blogDetails,
        },
    }),
    removeBlogDetails: () => ({
        type: actionTypes.REMOVE_BLOG_DETAILS,
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "blog",
    storage,
};


export default persistReducer(persistConfig, blogReducer);