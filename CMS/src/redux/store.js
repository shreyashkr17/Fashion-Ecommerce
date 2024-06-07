import {configureStore} from '@reduxjs/toolkit'
import collectionDetailsReducer  from './createCollectionDetail'

export const store = configureStore({
    reducer:{
        collectionDetails: collectionDetailsReducer
    },
});