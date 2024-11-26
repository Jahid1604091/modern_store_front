import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const Product = ({ product }) => {

  return (
    <Card className="h-100">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          src={product.image}
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
        <Card.Text as="div" className="mt-auto">
          <strong>${product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
