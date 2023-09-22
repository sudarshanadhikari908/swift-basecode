import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@shared/axios";

export const getEmailLogs = createAsyncThunk<any, any>(
  "getEmailLogs",
  async () => {
    try {
      const res = await axiosInstance.get("/products");
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      return null;
    }
  },
);
