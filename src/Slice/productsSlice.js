import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    status: "idle",
    searchQuery: "",  // ✅ Added for search functionality
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    },
    setProductDetails: (state, action) => {
      state.selectedProduct = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state) => {
      state.status = "failed";
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; 
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setProductDetails,
  clearProductDetails,
  setSearchQuery,  
} = productSlice.actions;

export default productSlice.reducer;
