import Navbar from "@features/navbar";
import React from "react";
import { Trash } from "lucide-react";
import "./myCart.css";
import { useAppSelector } from "@store/redux-Hooks";
import CartItem from "@features/cart-item";

function MyCart() {
  const { cartList } = useAppSelector((state) => state.carts);
  const handleDelete = () => {
    console.log("EH");
  };
  return (
    <>
      <Navbar />
      <h2>My Cart</h2>
      <div className="container">
        <div className="my-cart-section">
          {/* Action card */}
          <div className="action-card">
            <div>
              <input type="checkbox" /> Select All
            </div>
            <Trash size={16} className="trash-icon" onClick={handleDelete} />
          </div>

          {/* Carts */}
          <CartItem cartData={cartList?.carts} />
        </div>

        <div className="checkout-section">
          {/* Right card (1/3 of width) */}
          Rectangular Card Rectangular Card Rectangular Card Rectangular Card
        </div>
      </div>
    </>
  );
}

export default MyCart;
