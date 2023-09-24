import axiosInstance from "@shared/axios";

type ICart = {
  id: number;
  quantity: number;
};
export const addToCart = async ({ id, quantity }: ICart) => {
  try {
    const response = await axiosInstance.post(`/carts/add`, {
      userId: localStorage.getItem("userId"),
      products: [
        {
          id,
          quantity,
        },
      ],
    });
    return [response, null];
  } catch (e: any) {
    return [null, e];
  }
};
