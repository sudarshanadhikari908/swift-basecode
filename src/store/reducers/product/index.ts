import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@shared/interface/products";
import { getAllProducts } from "@store/actions/product";

interface State {
  productList:
    | {
        products: IProduct[];
        total: number;
        skip: number;
        limit: number;
      }
    | undefined;
  productsListLoading: boolean;
}

const initialState: State = {
  productList: undefined,
  productsListLoading: false,
};

const productsSlice = createSlice({
  name: "product slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.productsListLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.productsListLoading = false;
      state.productList = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.productsListLoading = false;
      state.productList = undefined;
    });
  },
});

export default productsSlice.reducer;
