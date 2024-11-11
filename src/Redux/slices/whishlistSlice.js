// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState: [],
  reducers: {
    addTowhishlist: (state, action) => {
      const existingItemIndex = state.findIndex(item => item.dishname === action.payload.dishname);
      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromwhishlist: (state, action) => {
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

export const { addTowhishlist, removeFromwhishlist, incrementQuantity, decrementQuantity } =whishlistSlice.actions;
export default whishlistSlice.reducer;
