import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    SET_JOB_DETAILS: 'SET_JOB_DETAILS',
};

const initialState = {
    jobDetails: [],
};

const jobDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_JOB_DETAILS:
            return {
                ...state,
                jobDetails: action.payload.jobDetails,
            };
        default:
            return state;
    }
};

export const actions = {
    setJobDetails: (jobDetails) => ({
        type: actionTypes.SET_JOB_DETAILS,
        payload: {
            jobDetails,
        },
    }),
};

const persistConfig = {
    keyPrefix: "ireti-",
    key: "job",
    storage,
};

export default persistReducer(persistConfig, jobDetailsReducer);