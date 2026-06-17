import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import AlertDismissible from "../components/Alert";
import { useNavigate, Link } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderApliSlice";
import { clearCart } from "../slices/cartSlice";
import { BASE_URL } from "../utils/constants";
import useCompany from "../hooks/useCompany";
import Loader from "../components/Loader";
import "./css/PlaceOrderPage.css";

export default function PlaceOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { data: company } = useCompany();
  const currency = company?.currency || 'BDT';

  const [createOrder, { isLoading, isError, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate("/shipping");
    else if (!cart.paymentMethod) navigate("/payment");
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const orderItems = cart.cartItems.map((item) => ({
      qty: item.qty,
      price: item.price,
      id: item.id,
      size: item.selectedSize || null,
    }));
    try {
      const res = await createOrder({
        orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      if (res.success) {
        dispatch(clearCart());
        navigate(`/orders/${res.data.id}`);
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="place-order-page">
      <CheckoutSteps step1 step2 step3 step4 />

      {isError && (
        <AlertDismissible
          message={error?.data?.message || "Failed to place order."}
          variant="danger"
        />
      )}

      <Row className="gy-3">
        {/* ── Left: order details ── */}
        <Col md={8}>
          {/* Shipping address */}
          <div className="po-section">
            <div className="po-section-header">
              <i className="bi bi-geo-alt" style={{ fontSize: "0.8rem", color: "#888" }} />
              <span className="po-section-label">Shipping Address</span>
            </div>
            <div className="po-section-body">
              <p className="po-section-value mb-0">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Payment method */}
          <div className="po-section">
            <div className="po-section-header">
              <i className="bi bi-credit-card" style={{ fontSize: "0.8rem", color: "#888" }} />
              <span className="po-section-label">Payment Method</span>
            </div>
            <div className="po-section-body">
              <p className="po-section-value mb-0">{cart.paymentMethod}</p>
            </div>
          </div>

          {/* Order items */}
          <div className="po-section">
            <div className="po-section-header">
              <i className="bi bi-bag" style={{ fontSize: "0.8rem", color: "#888" }} />
              <span className="po-section-label">
                Order Items ({cart.cartItems.reduce((a, i) => a + i.qty, 0)})
              </span>
            </div>
            <div className="po-section-body">
              {cart.cartItems.length === 0 ? (
                <AlertDismissible
                  variant="warning"
                  message="Your cart is empty."
                />
              ) : (
                <div className="po-items-list">
                  {cart.cartItems.map((item, index) => (
                    <div className="po-item-row" key={index}>
                      <img
                        className="po-item-img"
                        src={`${BASE_URL}/${item.image}`}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/52x52?text=?";
                        }}
                      />
                      <Link
                        to={`/products/${item.id}`}
                        className="po-item-name"
                      >
                        {item.name}
                        {item.selectedSize && ` (Size: ${item.selectedSize})`}
                      </Link>
                      <div className="po-item-price">
                        {item.qty} × {item.price} ={" "}
                        <strong>
                          {(item.qty * item.price).toFixed(2)} {currency}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* ── Right: summary panel ── */}
        <Col md={4}>
          <div className="po-summary-panel">
            <div className="po-summary-title">Order Summary</div>

            <div className="po-summary-rows">
              <div className="po-summary-row">
                <span>Products</span>
                <span>{cart.itemsPrice} {currency}</span>
              </div>
              <div className="po-summary-row">
                <span>Shipping</span>
                <span>{cart.shippingPrice} {currency}</span>
              </div>
              <div className="po-summary-row">
                <span>Tax</span>
                <span>{cart.taxPrice} {currency}</span>
              </div>
            </div>

            <div className="po-summary-total">
              <span className="po-summary-total-label">Total</span>
              <span className="po-summary-total-value">
                {cart.totalPrice} {currency}
              </span>
            </div>

            <button
              className="po-place-btn"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Placing Order…
                </>
              ) : (
                <>
                  <i className="bi bi-bag-check me-2" />
                  Place Order
                </>
              )}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}