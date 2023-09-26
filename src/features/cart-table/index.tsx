import React from "react";
import "./cartTable.css";
import { Minus, Plus, StoreIcon, Trash2Icon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@store/redux-Hooks";
import {
  changeQuantity,
  clearCart,
  deleteCart,
  handleChecked,
  handleCheckedRemove,
} from "@store/reducers/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Carttable({ cartList, cartPage }: any) {
  const navigate = useNavigate();
  const { buyingCartList } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCartDelete = (cart: any) => {
    dispatch(deleteCart(cart));
  };

  const handleQuantityChange = (quantity: number, cart: any) => {
    dispatch(changeQuantity({ quantity, cart }));
  };

  const isCartItemChecked = (cartItem: any) => {
    return buyingCartList?.some((item: any) => item?.id === cartItem?.id);
  };

  const handleCheckboxChange = (cartItem: any) => {
    if (!isCartItemChecked(cartItem)) {
      dispatch(handleChecked(cartItem));
    } else {
      dispatch(handleCheckedRemove(cartItem?.id));
    }
  };

  const getTotalPrice = (carts: any) => {
    const markedPrice = Number(carts?.price) * Number(carts?.quantity);
    return (
      Number(markedPrice) -
      Number(markedPrice) * (Number(carts?.discountPercentage) / 100)
    );
  };

  const totalAmount = () => {
    const total = cartList.reduce((accumulator: any, item: any) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return total;
  };

  return (
    <div className="table-layout">
      <div className="table-container d-flex justify-center mx-auto">
        <div className="table-header d-flex">
          <div className="table-cell p-10">S.N.</div>
          <div className="table-cell p-10">Product</div>
          <div className="table-cell p-10">Unit Price</div>
          <div className="table-cell p-10">Quantity</div>
          <div className="table-cell p-10">Discount</div>
          <div className="table-cell p-10">Total Price</div>
          {cartPage && <div className="table-cell p-10">Actions</div>}
        </div>
        <div className="table-body d-flex">
          {cartList?.map((carts: any, index: number) => (
            <div className="table-row d-flex" key={carts?.id}>
              <div className="table-cell p-10">{index + 1}</div>
              <div className="table-cell p-10">{carts?.title}</div>
              <div className="table-cell p-10">${carts?.price}</div>
              <div className="table-cell p-10">
                <div className="button-wrapper">
                  {cartPage ? (
                    <>
                      <Minus
                        className="quantity-button"
                        onClick={() => {
                          if (carts?.quantity > 1) {
                            handleQuantityChange(
                              Number(carts?.quantity) - 1,
                              carts,
                            );
                          } else {
                            handleCartDelete(carts);
                          }
                        }}
                      />
                      <input
                        type="number"
                        value={carts?.quantity}
                        disabled
                        min="1"
                        className="quantity-input"
                      />
                      <Plus
                        className="quantity-button"
                        onClick={() => {
                          handleQuantityChange(
                            Number(carts?.quantity) + 1,
                            carts,
                          );
                        }}
                      />
                    </>
                  ) : (
                    <div className=" p-10">${carts?.quantity}%</div>
                  )}
                </div>
              </div>
              <div className="table-cell p-10">
                ${carts?.discountPercentage}%
              </div>
              <div className="table-cell p-10">${getTotalPrice(carts)}</div>
              {cartPage && (
                <div className="table-cell p-10">
                  <p
                    className="delete-cart font-size-18 cursor-pointer"
                    onClick={() => handleCartDelete(carts)}
                  >
                    Delete
                  </p>
                </div>
              )}

              {cartPage && (
                <input
                  type="checkbox"
                  className="d-flex justify-center align-center p-10 my-auto"
                  id={`checkbox-${carts?.id}`}
                  onChange={() => handleCheckboxChange(carts)}
                />
              )}
            </div>
          ))}
        </div>
        {cartPage ? (
          <>
            <div className="table-footer d-flex align-center justify-space-between">
              <button
                type="button"
                className="d-flex justify-center align-center color-primary p-10 cart-clear-button cursor-pointer"
                onClick={handleClearCart}
              >
                <Trash2Icon /> CLEAR CART
              </button>
              <div>
                <span className="font-size-18 ">
                  Total ({cartList?.length}) items:{" "}
                  <span className="font-size-18 color-primary total-amount">
                    ${totalAmount()}
                  </span>
                </span>
                <button
                  type="button"
                  className="d-flex justify-center align-center p-10 cursor-pointer color-white cart-buy-button mx-auto"
                  onClick={() => {
                    if (buyingCartList.length) navigate("/purchase-cart");
                    else toast.info("No any product selected");
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex gap-60 align-center justify-end mr-35">
              <span className="font-size-18 ">
                Total ({cartList?.length}) items:{" "}
                <span className="font-size-18 color-primary total-amount">
                  ${totalAmount()}
                </span>
              </span>
              <button
                type="button"
                className="d-flex cursor-pointer color-primary p-10 mr-35 buy-now-button cursor-pointer"
                onClick={handleClearCart}
              >
                <StoreIcon /> <span className="p-10">BUY NOW</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Carttable;
