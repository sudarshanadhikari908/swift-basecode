import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css"; // Import your CSS file for styling
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@store/redux-Hooks";
import { getUserCart } from "@store/actions/cart";

function NavBar() {
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state) => state.carts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  return (
    <div className="navbar">
      <div className="left">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
      </div>
      <div className="right" onClick={() => navigate("/my-cart")}>
        <div className="cart-icon">
          <ShoppingCart />
          <span className="cart-count">
            {cartList?.carts[0]?.totalProducts}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
