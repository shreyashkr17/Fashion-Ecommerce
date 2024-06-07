
import { createSlice } from '@reduxjs/toolkit';

export const collectionDetailsSlice = createSlice({
  name: 'collectionDetails',
  initialState: {
    // Define initial state here
    details: null,
  },
  reducers: {
    setCollectionDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setCollectionDetails } = collectionDetailsSlice.actions;

export default collectionDetailsSlice.reducer;
