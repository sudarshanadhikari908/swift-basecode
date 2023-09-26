import { createSlice } from "@reduxjs/toolkit";

interface State {
  cartList: any;
  cartListLoading: boolean;
  buyingCartList: any;
}

const initialState: State = {
  cartList: undefined,
  cartListLoading: false,
  buyingCartList: [],
};

const cartSlice = createSlice({
  name: "product slice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      if (!state.cartList) {
        state.cartList = [];
      }

      const matchingItem = state.cartList.find(
        (item: any) => item.id === payload.productDetails.id,
      );

      if (matchingItem) {
        matchingItem.quantity += payload.quantities;
      } else {
        const newItem = {
          ...payload.productDetails,
          quantity: payload.quantities,
        };
        state.cartList.push(newItem);
      }
    },
    clearCart: (state) => {
      state.cartList = undefined;
    },
    deleteCart: (state, action) => {
      const { payload } = action;
      state.cartList = state.cartList.filter(
        (item: any) => item.id !== payload.id,
      );
    },
    changeQuantity: (state, action) => {
      const { payload } = action;
      state.cartList = state.cartList.map((item: any) => {
        if (item.id === payload.cart.id) {
          return {
            ...item,
            quantity: payload.quantity,
          };
        }
        return item;
      });
    },
    handleChecked: (state, action) => {
      const cartItem = action.payload;
      return { ...state, buyingCartList: [...state.buyingCartList, cartItem] };
    },
    handleCheckedRemove: (state, action) => {
      const cartItemId = action.payload;
      const updatedCartItems = state.buyingCartList.filter(
        (item: any) => item.id !== cartItemId,
      );
      return { ...state, buyingCartList: updatedCartItems };
    },
    resetBuyingCart: (state) => {
      state.buyingCartList = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  deleteCart,
  changeQuantity,
  handleChecked,
  handleCheckedRemove,
  resetBuyingCart,
} = cartSlice.actions;

export default cartSlice.reducer;
