// ProductCard.js

import React, { useState } from "react";
import "./productCard.css"; // Import your CSS for styling
import { IProduct } from "@shared/interface/products";
import { Plus, Minus } from "lucide-react";
import { addToCart } from "@services/addCard";
import { toast } from "react-toastify";
import { useAppDispatch } from "@store/redux-Hooks";
import { getUserCart } from "@store/actions/cart";

type IProps = {
  product: IProduct;
};

function ProductCard({ product }: IProps) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    id,
    stock,
    branch,
    category,
    thumbnail,
  } = product;
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCartClick = () => {
    setIsAddingToCart(true);
  };

  const handleConfirmAddToCartClick = async () => {
    setIsAddingToCart(false);
    const [response] = await addToCart({ id, quantity });
    if (response.status === 200) {
      toast.success(response?.data?.message);
      dispatch(getUserCart());
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={thumbnail} alt={title} className="product-thumbnail" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price">
          <span className="original-price">${price}</span>
          {discountPercentage > 0 && (
            <span className="discounted-price">
              ${(price - price * (discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        <div className="product-rating">
          {/* You can display star ratings or other rating components here */}
          Rating: {rating}
        </div>
        <div className="product-stock">Stock: {stock}</div>
        <div className="product-branch">Branch: {branch}</div>
        <div className="product-category">Category: {category}</div>
      </div>
      <div className="add-to-cart-container">
        {isAddingToCart ? (
          <div className="add-to-cart-container">
            <div className="quantity-controls">
              <button
                type="button"
                className="quantity-button"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus />
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                max={stock}
                disabled
                className="quantity-input"
              />
              <button
                type="button"
                className="quantity-button"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus />
              </button>
            </div>
            <button
              type="button"
              className="confirm-button"
              onClick={handleConfirmAddToCartClick}
            >
              Confirm
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="add-to-cart-button"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
