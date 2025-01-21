import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi } from "../api";

// request functions
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetchProductsApi();
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);
// request functions

const initialState = {
  productsList: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default productsSlice.reducer;
