import Carttable from "@features/cart-table";
import Navbar from "@features/navbar";
import { resetBuyingCart } from "@store/reducers/cart";
import { useAppDispatch, useAppSelector } from "@store/redux-Hooks";
import React, { useEffect } from "react";

function PurchaseCart() {
  const dispatch = useAppDispatch();
  const { buyingCartList } = useAppSelector((state) => state.carts);
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetBuyingCart());
  //   };
  // }, []);

  return (
    <>
      <Navbar />
      <div className="mt-60 hello">
        <div className="container">
          <Carttable cartList={buyingCartList} />
        </div>
      </div>
    </>
  );
}

export default PurchaseCart;
