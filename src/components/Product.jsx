import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import useCompany from "../hooks/useCompany";
import "./css/Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [qty] = useState(1);
  const { data: company } = useCompany();
  const currency = company?.currency || 'BDT';

  const hasSizes = product.metadata?.sizes?.length > 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const outOfStock = product.stock_quantity === 0;

  return (
    <Card className="h-100">
      <Link to={`/products/${product.id}`}>
        <Card.Img
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
        {/* Shows the second gallery image on hover, if one was uploaded */}
        <img
          className="product-img-secondary"
          src={
            product.gallery?.[1]
              ? `${BASE_URL}/${product.gallery[1]}`
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
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <Card.Title as="h5" className="text-dark">
            {product.name}
          </Card.Title>
        </Link>

        <Rating rating={product.rating} reviews={product.numReviews} />

        <div className="product-price-row">
          <span className="product-price">
            {product.currency || currency} {product.price}
          </span>
        </div>

        {hasSizes ? (
          <Button
            as={Link}
            to={`/products/${product.id}`}
            className="btn-add-cart mt-auto"
            disabled={outOfStock}
          >
            {outOfStock ? "Out of Stock" : "Select Size"}
          </Button>
        ) : (
          <Button
            className="btn-add-cart mt-auto"
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;