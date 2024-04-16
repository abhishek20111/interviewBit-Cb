import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groceryData: [],
  electronicData: [],
  utilityData: [],
  clothingData: [],
  transactionData: [],
  productData: [],
  userData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGroceryData: (state, action) => {
      state.groceryData = action.payload;
    },
    setElectronicData: (state, action) => {
      state.electronicData = action.payload;
    },
    setUtilityData: (state, action) => {
      state.utilityData = action.payload;
    },
    setClothingData: (state, action) => {
      state.clothingData = action.payload;
    },
    setTransactionData: (state, action) => {
      state.transactionData = action.payload;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setGroceryData,
  setElectronicData,
  setUtilityData,
  setClothingData,
  setTransactionData,
  setProductData,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
