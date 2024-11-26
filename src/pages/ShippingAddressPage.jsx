import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
export default function ShippingAddressPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    navigate("/payment");
  };
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ minHeight: "81vh" }}>
        <Col xs={12} md={6} className="m-auto">
          <Form onSubmit={submitHandler}>
            <CheckoutSteps step1 step2 />
            <h3>Shipping</h3>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded-0 mb-2"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-0 mb-2"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="rounded-0 mb-2"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="rounded-0 mb-2"
                required
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button
                type="submit"
                className="px-4 text-light text-uppercase rounded-0 shadow"
                variant="primary"
              >
                Continue
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
