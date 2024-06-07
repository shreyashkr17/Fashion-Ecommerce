import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_SHIPPING_ADDRESS: 'UPDATE_SHIPPING_ADDRESS',
    UPDATE_BILLING_ADDRESS: 'UPDATE_BILLING_ADDRESS',
    UPDATE_SHIPPING_ADDRESS_LIST: 'UPDATE_SHIPPING_ADDRESS_LIST',
    UPDATE_BILLING_ADDRESS_LIST: 'UPDATE_BILLING_ADDRESS_LIST',
}

const initialState = {
    user: null,
    isAuthenticated: false,
    token:null,
    shippingAddress: null,
    billingAddress: null,
    shippingAddressList: [],
    billingAddressList: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                token:action.payload.token
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token:null,
                shippingAddress: null,
                billingAddress: null,
                shippingAddressList: [],
                billingAddressList: [],
            };
        case actionTypes.REGISTER_SUCCESS: // Handle registration success
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                token:action.payload.token
            };
        case actionTypes.UPDATE_USER: // Handle updating user data
            return {
                ...state,
                user: action.payload.user // Update user data
            };
        case actionTypes.UPDATE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload.shippingAddress,
            };
        case actionTypes.UPDATE_BILLING_ADDRESS:
            return {
                ...state,
                billingAddress: action.payload.billingAddress,
            };
        case actionTypes.UPDATE_SHIPPING_ADDRESS_LIST:
            return {
              ...state,
              shippingAddressList: action.payload.shippingAddressList,
            };
        case actionTypes.UPDATE_BILLING_ADDRESS_LIST:
            return {
                ...state,
                billingAddressList: action.payload.billingAddressList,
            };
        default:
            return state;
    }
}

export const actions = {
    loginSuccess:(user,token)=>({
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            user,
            token
        }
    }),
    logout: () => ({
        type: actionTypes.LOGOUT
    }),
    registerSuccess: (user,token) => ({ 
        type: actionTypes.REGISTER_SUCCESS,
        payload: {
            user,
            token
        }
    }),
    updateUser: (user) => ({ 
        type: actionTypes.UPDATE_USER,
        payload: {
            user
        }
    }),
    updateShippingAddress: (shippingAddress) => ({
        type: actionTypes.UPDATE_SHIPPING_ADDRESS,
        payload: { shippingAddress },
    }),
    updateBillingAddress: (billingAddress) => ({
        type: actionTypes.UPDATE_BILLING_ADDRESS,
        payload: { billingAddress },
    }),
    updateShippingAddressList: (shippingAddressList) => ({
      type: actionTypes.UPDATE_SHIPPING_ADDRESS_LIST,
      payload: { shippingAddressList },
    }),
    updateBillingAddressList: (billingAddressList) => ({
      type: actionTypes.UPDATE_BILLING_ADDRESS_LIST,
      payload: { billingAddressList },
    }),
}

const persistConfig = {
    keyPrefix: "ireti-",
    key: "auth",
    storage
}

export default persistReducer(persistConfig, authReducer);