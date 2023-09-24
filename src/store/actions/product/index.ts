import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@shared/axios";

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const res = await axiosInstance.get("/products");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    // Return an error object as part of the payload
    return { error: "Failed to fetch products. " };
  }
});
