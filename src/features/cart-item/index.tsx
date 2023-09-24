// Cart.js

import React from "react";
import "./cartItem.css";

function CartItem({ cartData }: any) {
  console.log(cartData, "form cart data");
  return (
    <div className="carts">
      {cartData[0]?.products?.map((product: any) => (
        <div className="cart" key={product?.id}>
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox-input" />
          </div>
          <div className="cart-content">
            <h3>{product?.title}</h3>
            <div className="quantity-input">
              <input type="number" value={product?.quantity} readOnly />
            </div>
            <div className="price-info">
              <p>Price: ${product?.price}</p>
              <p>Total Price: ${product?.total}</p>
              <p>Discounted Price: ${product?.discountedPrice}</p>
              <p className="discount-percentage">
                Discount Percentage: {product?.discountPercentage}%
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="cart total">
        <h3>Total</h3>
        <div className="price">
          <div className="total-info">
            <p>Total Products: {cartData[0]?.totalProducts}</p>
          </div>
          <div className="total-info">
            <p>Total Quantity: {cartData[0]?.totalQuantity}</p>
          </div>
          <div className="total-info">
            <p>Total Price: ${cartData[0]?.total}</p>
          </div>
          <div className="total-info">
            <p>Discounted Total Price: ${cartData[0]?.discountedTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
