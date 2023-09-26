import { useAppSelector } from "@store/redux-Hooks";

const useHomeHook = () => {
  const { productList } = useAppSelector((state) => state.products);

  return {
    productList,
  };
};

export default useHomeHook;
