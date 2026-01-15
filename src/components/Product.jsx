import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [qty, setQty] = useState(1);
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));

  };
  return (
    <Card className="h-100">
      <Link to={`/products/${product.id}`}>
        <Card.Img
          src={`${BASE_URL}/${product.image}`}
          variant="top"
          className="p-3"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <Card.Title as="h5" className="text-dark">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div" className="mt-auto d-flex justify-content-between align-items-center">
          <strong>
            {product.currency || "BDT"} {product.price}
          </strong>
          <Rating
            rating={product.rating}
            reviews={product.numReviews}
          // showReviewNumber
          />
        </Card.Text>
        <Button
          className="mt-2"
          onClick={handleAddToCart}
          variant="primary"
          disabled={product.stock_quantity === 0}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
