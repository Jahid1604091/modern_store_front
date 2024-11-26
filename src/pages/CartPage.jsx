import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../slices/cartSlice"; // Adjust the import according to your cart slice file
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"; // Import icons
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [alert, setAlert] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncrement = (item) => {
    if (item.qty < item.countInStock) {
      dispatch(incrementQuantity(item._id));
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {alert && (
        <Alert variant="info" className="text-center">
          Cannot increase quantity beyond stock limit.
        </Alert>
      )}
      {cartItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="p-1 mx-2"
                      onClick={() => handleDecrement(item._id)}
                    >
                      <AiOutlineMinus />
                    </Button>
                    {item.qty}
                    <Button
                      variant="secondary"
                      className="p-1 mx-2"
                      onClick={() => handleIncrement(item)}
                    >
                      <AiOutlinePlus />
                    </Button>
                  </td>
                  <td>${(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <Button
                      onClick={() => handleRemoveFromCart(item._id)}
                      variant="danger"
                      className="btn btn-light text-danger"
                    >
                      <AiOutlineDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row>
            <Col className="text-end">
              <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
              <Button onClick={()=>navigate('/shipping')} variant="success" className="mt-3">
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;
