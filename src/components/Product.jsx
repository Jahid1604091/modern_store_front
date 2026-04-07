import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL, company_data } from "../utils/constants";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import "./css/Product.css";  // ← add this import

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [qty] = useState(1);
  const { currency } = company_data;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const outOfStock = product.stock_quantity === 0;

  return (
    <Card className="product-card h-100">
      {/* ── Image area ── */}
      <Link
        to={`/products/${product.id}`}
        className="product-img-wrapper"
      >
        {/* "New" badge on first load – you can swap this with a real flag */}
        <span className="product-badge-new">New</span>

        <img
          className="product-img-primary"
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
        {/* If your product has a second image, swap the placeholder below */}
        <img
          className="product-img-secondary"
          src={
            product.image2
              ? `${BASE_URL}/${product.image2}`
              : `${BASE_URL}/${product.image}`
          }
          alt={`${product.name} alternate view`}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
      </Link>

      {/* ── Card body ── */}
      <Card.Body className="d-flex flex-column">
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none"
        >
          <span className="product-name">{product.name}</span>
        </Link>

        <Rating rating={product.rating} reviews={product.numReviews} />

        <div className="product-price-row">
          <span className="product-price">
            {product.currency || currency} {product.price}
          </span>
        </div>

        <Button
          className="btn-add-cart mt-auto"
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;