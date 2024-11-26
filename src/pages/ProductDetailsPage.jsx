import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import {
  useGetProductQuery,
  useIncrementProductViewMutation,
} from "../slices/productApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { throttle } from "lodash";
import AlertDismissible from "../components/Alert";
import Loader from "../components/Loader";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetProductQuery(id);
  const [incrementProductView] = useIncrementProductViewMutation();
  const [qty, setQty] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const incrementQty = () => {
    if (qty < product.countInStock) {
      setQty((prevQty) => prevQty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    setSuccessMessage("Product added to cart!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // const s = useLocation();
  const viewedProductIds =
    JSON.parse(sessionStorage.getItem("viewedProductIds")) || [];

  const incrementViewCount = useCallback(
    throttle(async () => {
      incrementProductView(id);
      await viewedProductIds.push(id);
      sessionStorage.setItem(
        "viewedProductIds",
        JSON.stringify(viewedProductIds)
      );
    }, 5000),
    [id]
  );

  useEffect(() => {
    if (!viewedProductIds.includes(id)) {
      incrementViewCount();
      return () => {
        incrementViewCount.cancel();
      };
    }
  }, [id]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Product Details</h2>

      {isLoading && <Loader />}

      {isError && (
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching the products. Please try again later."
        />
      )}

      {/* Data Display */}
      {isSuccess && (
        <>
          <Button
            variant="secondary"
            className="my-3"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Row className="gy-4">
            {/* Product Image */}
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="rounded shadow-sm"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>

            {/* Product Details */}
            <Col md={3}>
              <ListGroup variant="flush" className="shadow-sm rounded-3">
                <ListGroup.Item className="py-3">
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* Add to Cart Section */}
            <Col md={3}>
              {successMessage && (
                <Alert variant="success" className="text-center">
                  {successMessage}
                </Alert>
              )}
              <Card className="shadow-sm rounded-3">
                <ListGroup variant="flush">
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item className="py-3 d-grid">
                        <Row>
                          <Col>qty:</Col>
                          <Col className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={decrementQty}
                              disabled={qty <= 1}
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              value={qty}
                              readOnly
                              className="text-center mx-2"
                              style={{ width: "50px" }}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={incrementQty}
                              disabled={qty >= product.countInStock}
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item className="py-3 d-grid">
                        <Button
                          onClick={handleAddToCart}
                          className="btn-block"
                          type="submit"
                          disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
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
