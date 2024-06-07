import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Import Reducers
import cartReducer from "./cart";
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import demoReducer from './demo';
import authReducer from './auth';
import jobDetailsReducer from './job';
import blogReducer from './blog';
import orderReducer from './orders';
import productReducer from './product'
import instagramReducer from './instgram'
import variantReducer from './variant'
import productsmpicsReducer from './productsmpics';
import productdetailall from './productdetailall';
import singleProductReducer from './singleProduct';
import relatedProductReducer from './related-product'
import collectionReducer from './collection'

const rootReducers = combineReducers({
    cartlist: cartReducer,
    wishlist: wishlistReducer,
    comparelist: compareReducer,
    demo: demoReducer,
    auth: authReducer,
    job:jobDetailsReducer,
    blog:blogReducer,
    order:orderReducer,
    product:productReducer,
    instagram:instagramReducer,
    variant:variantReducer,
    productsmpics:productsmpicsReducer,
    productalldetail:productdetailall,
    singleProduct:singleProductReducer,
    relatedProduct:relatedProductReducer,
    collection:collectionReducer
});

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducers)
const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context) => {
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);
    return store;
};

// export default makeStore;

export const wrapper = createWrapper(makeStore, { debug: true });