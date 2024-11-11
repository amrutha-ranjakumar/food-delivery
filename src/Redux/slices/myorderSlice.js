// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const myorderSliceSlice = createSlice({
  name: "myorder",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.findIndex(item => item.dishname === action.payload.dishname);
      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.dishname !== action.payload.dishname);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.dishname === action.payload.dishname);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.dishname === action.payload.dishname);
      if (item && item.quantity > 1) item.quantity -= 1;
    }
  }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = myorderSliceSlice .actions;
export default myorderSliceSlice .reducer;

