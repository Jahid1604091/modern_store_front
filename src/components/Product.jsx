import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="h-100">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          src={`${BASE_URL}/${product.image}`}
          variant="top"
          className="p-3"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/products/${product._id}`} className="text-decoration-none">
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
      </Card.Body>
    </Card>
  );
};

export default Product;
