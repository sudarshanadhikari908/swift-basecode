import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@shared/axios";

export const getUserCart = createAsyncThunk(
  "carts/getAllUserCart",
  async () => {
    try {
      const res = await axiosInstance.get(
        `/carts/user/${localStorage.getItem("userId")}`,
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Return an error object as part of the payload
      return { error: "Failed to fetch products. " };
    }
  },
);
