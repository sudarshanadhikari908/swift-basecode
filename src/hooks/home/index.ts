import { getAllProducts } from "@store/actions/product";
import { useAppDispatch, useAppSelector } from "@store/redux-Hooks";
import { useEffect } from "react";

const useHomeHook = () => {
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return {
    productList,
  };
};

export default useHomeHook;
