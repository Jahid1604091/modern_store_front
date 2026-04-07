import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
  useAddReviewMutation,
  useGetProductQuery,
} from "../slices/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import AlertDismissible from "../components/Alert";
import Loader from "../components/Loader";
import { BASE_URL, company_data } from "../utils/constants";
import Rating from "../components/Rating";
import StarRatingInput from "../components/StartRatingInput";
import toast from "react-hot-toast";
import "./css/ProductDetailsPage.css"; // ← place the CSS here

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();
  const [qty, setQty] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const { currency } = company_data;

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductQuery(id);

  const incrementQty = () => {
    if (qty < product.stock_quantity) setQty((q) => q + 1);
  };

  const decrementQty = () => {
    if (qty > 1) setQty((q) => q - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    setSuccessMessage("Added to cart!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const res = await addReview({ id, rating: +rating, comment }).unwrap();
      toast.success(res?.msg);
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error.data?.msg);
    }
  };

  /* ── loading / error states ── */
  if (isLoading) {
    return (
      <Container className="pdp-container">
        <Loader />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="pdp-container">
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching this product. Please try again later."
        />
      </Container>
    );
  }

  if (!isSuccess || !product) return null;

  const inStock = product.stock_quantity > 0;

  return (
    <div className="pdp-container">
      {/* ── Back button ── */}
      <button className="pdp-back-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left" />
        Back
      </button>

      <Row className="gy-4">
        {/* ── 1. Product image ── */}
        <Col md={5} className="pdp-image-col">
          <div className="pdp-image-wrapper">
            <img
              className="pdp-image"
              src={`${BASE_URL}/${product.image}`}
              alt={product.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x800?text=No+Image";
              }}
            />
          </div>
        </Col>

        {/* ── 2. Product info ── */}
        <Col md={4}>
          <div className="pdp-info">
            {/* Category */}
            {product.category?.name && (
              <span className="pdp-category-tag">{product.category.name}</span>
            )}

            {/* Name */}
            <h1 className="pdp-product-name">{product.name}</h1>

            {/* Rating */}
            <div className="pdp-rating-row">
              <Rating
                rating={product.rating}
                reviews={product.numReviews}
              />
              <span className="pdp-review-count">
                {product.numReviews || 0} review{product.numReviews !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Price */}
            <div className="pdp-price">
              {product.currency || currency} {product.price}
            </div>

            {/* Description */}
            {product.description && (
              <p className="pdp-description">{product.description}</p>
            )}

            {/* Meta */}
            <div className="pdp-meta">
              {product.brand && (
                <div className="pdp-meta-row">
                  <strong>Brand</strong>
                  <span>{product.brand}</span>
                </div>
              )}
              {product.category?.name && (
                <div className="pdp-meta-row">
                  <strong>Category</strong>
                  <span>{product.category.name}</span>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* ── 3. Cart panel ── */}
        <Col md={3}>
          <div className="pdp-cart-panel">
            {/* Price row */}
            <div className="pdp-panel-price-row">
              <span className="pdp-panel-label">Price</span>
              <span className="pdp-panel-price">
                {product.currency || currency} {product.price}
              </span>
            </div>

            {/* Stock */}
            <div className="pdp-panel-price-row">
              <span className="pdp-panel-label">Status</span>
              <span
                className={`pdp-stock-badge ${
                  inStock ? "in-stock" : "out-of-stock"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Qty */}
            {inStock && (
              <div className="pdp-qty-row">
                <span className="pdp-qty-label">Qty</span>
                <div className="pdp-qty-controls">
                  <button
                    className="pdp-qty-btn"
                    onClick={decrementQty}
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <span className="pdp-qty-value">{qty}</span>
                  <button
                    className="pdp-qty-btn"
                    onClick={incrementQty}
                    disabled={qty >= product.stock_quantity}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="pdp-success-alert">
                <i className="bi bi-check-circle me-1" />
                {successMessage}
              </div>
            )}

            {/* Add to cart */}
            <button
              className="pdp-add-btn"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? (
                <>
                  <i className="bi bi-bag-plus me-2" />
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </button>

            {/* Proceed to checkout */}
            {cartItems.length > 0 && (
              <Link to="/shipping" className="pdp-checkout-btn">
                Proceed to Checkout
                <i className="bi bi-arrow-right ms-2" />
              </Link>
            )}
          </div>
        </Col>
      </Row>

      {/* ── Reviews ── */}
      <div className="pdp-reviews-section">
        <Row>
          {/* Write a review */}
          <Col md={5}>
            <h3 className="pdp-section-heading">Write a Review</h3>
            <div className="pdp-review-form">
              <Form onSubmit={handleReview}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Share your experience with this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <StarRatingInput setRating={setRating} />
                </Form.Group>
                <Button
                  type="submit"
                  className="pdp-submit-review-btn"
                >
                  Submit Review
                </Button>
              </Form>
            </div>
          </Col>

          {/* Review list */}
          <Col md={7}>
            <h3 className="pdp-section-heading">
              Customer Reviews
              {product.reviews?.length > 0 && (
                <span style={{ fontSize: "0.9rem", fontWeight: 400, marginLeft: "0.5rem", color: "#888" }}>
                  ({product.reviews.length})
                </span>
              )}
            </h3>

            {!product.reviews?.length ? (
              <p className="pdp-no-reviews">
                No reviews yet — be the first to review this product.
              </p>
            ) : (
              <div className="pdp-review-list">
                {product.reviews.map((r) => (
                  <div key={r.id} className="pdp-review-item">
                    <div>
                      <p className="pdp-reviewer-name">{r.name}</p>
                      <p className="pdp-review-comment">{r.comment}</p>
                    </div>
                    <Rating rating={r?.rating} />
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailsPage;