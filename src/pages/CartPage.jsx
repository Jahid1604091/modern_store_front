import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  applyCoupon,
  removeCoupon,
} from "../slices/cartSlice";
import { useValidateCouponMutation } from "../slices/couponApiSlice";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import useCompany from "../hooks/useCompany";
import "./css/CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, totalPrice, couponCode, discountAmount } = useSelector((state) => state.cart);
  const [stockAlert, setStockAlert] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [validateCoupon, { isLoading: applyingCoupon }] = useValidateCouponMutation();
  const { data: company } = useCompany();
  const currency = company?.currency || 'BDT';

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    try {
      const res = await validateCoupon({ code: couponInput.trim(), subtotal: itemsPrice }).unwrap();
      dispatch(applyCoupon({ code: res.data.code, discountAmount: res.data.discount_amount }));
      toast.success(res.msg || "Coupon applied!");
      setCouponInput("");
    } catch (err) {
      toast.error(err?.data?.msg || "Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    toast.success("Coupon removed.");
  };

  const handleRemove = (item) =>
    dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }));

  const handleIncrement = (item) => {
    if (item.qty < item.stock_quantity) {
      dispatch(incrementQuantity({ id: item.id, selectedSize: item.selectedSize }));
    } else {
      setStockAlert(true);
      setTimeout(() => setStockAlert(false), 3000);
    }
  };

  const handleDecrement = (item) =>
    dispatch(decrementQuantity({ id: item.id, selectedSize: item.selectedSize }));

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">
        Shopping Cart
        {cartItems.length > 0 && (
          <span style={{ fontSize: "1rem", fontWeight: 400, marginLeft: "0.75rem", color: "#888", letterSpacing: "0.5px" }}>
            ({cartItems.reduce((a, i) => a + i.qty, 0)} items)
          </span>
        )}
      </h1>

      {/* Stock limit alert */}
      {stockAlert && (
        <div className="cart-stock-alert">
          <i className="bi bi-exclamation-circle" />
          Cannot increase quantity beyond available stock.
        </div>
      )}

      {/* Empty state */}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <i className="bi bi-bag-x" />
          <h4>Your cart is empty</h4>
          <p>Looks like you haven't added any products yet.</p>
          <Link to="/products" className="cart-empty-btn">
            <i className="bi bi-arrow-left" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* ── Cart table ── */}
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={`${item.id}-${item.selectedSize || ""}`}>
                    {/* Product */}
                    <td>
                      <div className="cart-product-cell">
                        <img
                          className="cart-item-img"
                          src={`${BASE_URL}/${item.image}`}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/60x60?text=?";
                          }}
                        />
                        <div>
                          <Link
                            to={`/products/${item.id}`}
                            className="cart-item-name"
                          >
                            {item.name}
                          </Link>
                          {item.selectedSize && (
                            <div className="cart-item-size">Size: {item.selectedSize}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="cart-price">
                        {currency} {item.price}
                      </span>
                    </td>

                    {/* Qty */}
                    <td>
                      <div className="cart-qty-controls">
                        <button
                          className="cart-qty-btn"
                          onClick={() => handleDecrement(item)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="cart-qty-value">{item.qty}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => handleIncrement(item)}
                          disabled={item.qty >= item.stock_quantity}
                          aria-label="Increase quantity"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </td>

                    {/* Subtotal */}
                    <td>
                      <span className="cart-subtotal">
                        {currency} {(item.price * item.qty).toFixed(2)}
                      </span>
                    </td>

                    {/* Remove */}
                    <td>
                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.name}`}
                        title="Remove item"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Coupon code ── */}
          <div className="cart-coupon-box">
            {couponCode ? (
              <div className="cart-coupon-applied">
                <span>
                  <i className="bi bi-check-circle-fill" /> Coupon <strong>{couponCode}</strong> applied — you saved {currency} {Number(discountAmount).toFixed(2)}
                </span>
                <button type="button" onClick={handleRemoveCoupon} className="cart-coupon-remove">
                  Remove
                </button>
              </div>
            ) : (
              <form className="cart-coupon-form" onSubmit={handleApplyCoupon}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="cart-coupon-input"
                />
                <button type="submit" disabled={applyingCoupon} className="cart-coupon-apply-btn">
                  {applyingCoupon ? "Applying..." : "Apply"}
                </button>
              </form>
            )}
          </div>

          {/* ── Summary ── */}
          <div className="cart-summary-row">
            <div className="cart-summary-lines">
              <div className="cart-summary-line">
                <span className="cart-total-label">Subtotal</span>
                <span>{currency} {Number(itemsPrice).toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="cart-summary-line cart-summary-discount">
                  <span className="cart-total-label">Discount</span>
                  <span>− {currency} {Number(discountAmount).toFixed(2)}</span>
                </div>
              )}
              <div className="cart-summary-line">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-value">
                  {currency} {Number(totalPrice).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/shipping")}
            >
              Proceed to Checkout
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;