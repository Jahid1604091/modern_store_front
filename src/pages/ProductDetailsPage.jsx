import React, { useCallback, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  useAddReviewMutation,
  useGetProductQuery,
  useIncrementProductViewMutation,
} from "../slices/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { throttle } from "lodash";
import AlertDismissible from "../components/Alert";
import Loader from "../components/Loader";
import { BASE_URL } from "../utils/constants";
import Rating from "../components/Rating";
import StarRatingInput from "../components/StartRatingInput";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();
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

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const res = await addReview({
        id,
        rating: +rating,
        comment,
      }).unwrap();
      toast.success(res?.msg);
    } catch (error) {
      toast.error(error.data?.msg);
      console.log(error?.data?.msg || error.error);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 fw-bold">Product Details</h2>

      {isLoading && <Loader />}

      {isError && (
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching the products. Please try again later."
        />
      )}

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
                alt={product.name}
                fluid
                className="rounded shadow-lg"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>

            {/* Product Details */}
            <Col md={5}>
              <ListGroup variant="flush" className="shadow-sm rounded-3">
                <ListGroup.Item className="py-3">
                  <h3 className="fw-bold">{product.name}</h3>
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
                  <strong>Category:</strong> {product.category.name}
                </ListGroup.Item>
              </ListGroup>

              {/* Review Section */}
              <div className="my-4">
                <Form>
                  <Form.Group className="mb-3" controlId="reviewComment">
                    <h5 className="fw-bold">Add Review</h5>
                    <Form.Control
                      as="textarea"
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="Write your review..."
                      className="shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="reviewRating">
                    <StarRatingInput setRating={setRating} />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleReview}
                    type="submit"
                    className="w-100"
                  >
                    Submit Review
                  </Button>
                </Form>

                {product?.reviews.length === 0 ? (
                  <div className="text-muted mt-3">No reviews yet</div>
                ) : (
                  <>
                    <h5 className="fw-bold mt-4">Customer Reviews</h5>
                    <ListGroup className="mt-3">
                      {product?.reviews.map((r) => (
                        <ListGroup.Item
                          key={r._id}
                          className="d-flex justify-content-between align-items-start shadow-sm mb-2 rounded-3"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{r.name}</div>
                            <p className="mb-0">{r.comment}</p>
                          </div>
                          <Rating rating={r?.rating} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}
              </div>
            </Col>

            {/* Add to Cart Section */}
            <Col md={3}>
              {successMessage && (
                <Alert variant="success" className="text-center">
                  {successMessage}
                </Alert>
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
                        {product.countInStock > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
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
                              disabled={qty >= product.countInStock}
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
                          disabled={product.countInStock === 0}
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