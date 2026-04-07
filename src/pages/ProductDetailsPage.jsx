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
    if (qty < product.stock_quantity) {
      setQty((prevQty) => prevQty + 1);
    }
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

      {isSuccess && (
        <>
          <Button
            variant="outline-secondary"
            className="my-3"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Row className="gy-4">
            {/* Product Image */}
            <Col md={4}>
              <Image
                src={`${BASE_URL}/${product.image}`}
                alt={product.name || "Product Image"}
                fluid
                className="rounded shadow-lg"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <span className="pdp-review-count">
                {product.numReviews || 0} review{product.numReviews !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Product Details */}
            <Col md={5}>
              <ListGroup variant="flush" className="shadow-sm rounded-3">
                <ListGroup.Item className="py-3">
                  <h3 className="fw-bold">{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <Rating
                    rating={product.rating}
                    reviews={product.numReviews}
                    showReviewNumber
                  />
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <p className="text-muted">{product.description}</p>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Category:</strong> { product?.category?.name}
                </ListGroup.Item>
              </ListGroup>

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

                {product?.reviews?.length === 0 ? (
                  <div className="text-muted mt-3">No reviews yet</div>
                ) : (
                  <>
                    <h5 className="fw-bold mt-4">Customer Reviews</h5>
                    <ListGroup className="mt-3">
                      {product?.reviews?.map((r) => (
                        <ListGroup.Item
                          key={r.id}
                          className="d-flex justify-content-between align-items-start shadow-sm mb-2 rounded-3"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{r?.name}</div>
                            <p className="mb-0">{r?.comment}</p>
                          </div>
                          <Rating rating={r?.rating} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}
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
              <Card className="shadow-lg rounded-3">
                <ListGroup variant="flush">
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong className="text-success">
                          {product.currency} {product.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stock_quantity > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock_quantity > 0 && (
                    <>
                      <ListGroup.Item className="py-3">
                        <Row>
                          <Col>Quantity:</Col>
                          <Col className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={decrementQty}
                              disabled={qty <= 1}
                              className="shadow-sm"
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              value={qty}
                              readOnly
                              className="text-center mx-2 shadow-sm"
                              style={{ width: "50px" }}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={incrementQty}
                              disabled={qty >= product.stock_quantity}
                              className="shadow-sm"
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item className="py-3">
                        <Button
                          onClick={handleAddToCart}
                          className="w-100 mb-2"
                          variant="primary"
                          disabled={product.stock_quantity === 0}
                        >
                          Add to Cart
                        </Button>
                        {cartItems.length > 0 && (
                          <Link
                            to="/shipping"
                            className="btn btn-success w-100"
                          >
                            Proceed to Checkout
                          </Link>
                        )}
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductDetailsPage;