import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../Slice/productsSlice.js'
export const store =configureStore({
    reducer:{
        products:productReducer,
    },
})