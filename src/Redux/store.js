// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Redux/slices/cardSlice';
import orderReducer from '../Redux/slices/myorderSlice';
import whishlistreducer  from '../Redux/slices/whishlistSlice'


const store = configureStore({
  reducer: {
    cart: cartReducer,
    myorder: orderReducer,
    whishlist:whishlistreducer,
   
  },
});

export default store;
