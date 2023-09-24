import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "@shared/interface/cart";
import { getUserCart } from "@store/actions/cart";

interface State {
  cartList:
    | {
        carts: [
          {
            id: number;
            products: ICart[];
            total: number;
            discountedTotal: number;
            userId: number;
            totalProducts: number;
            totalQuantity: number;
          },
        ];
      }
    | undefined;
  cartListLoading: boolean;
}

const initialState: State = {
  cartList: undefined,
  cartListLoading: false,
};

const cartSlice = createSlice({
  name: "product slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCart.pending, (state) => {
      state.cartListLoading = true;
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.cartListLoading = false;
      state.cartList = action.payload;
    });
    builder.addCase(getUserCart.rejected, (state) => {
      state.cartListLoading = false;
      state.cartList = undefined;
    });
  },
});

export default cartSlice.reducer;
