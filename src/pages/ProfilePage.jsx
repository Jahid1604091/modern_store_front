import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AlertDismissible from "../components/Alert";
import Loader from "../components/Loader";
import { useGetProfileQuery } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApliSlice";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, error, loading } = useGetProfileQuery();
  // const { error: updateError, success } = useSelector(state => state.userProfileUpdate);

  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.data.name);
    setEmail(userInfo.data.email);
  }, [userInfo]);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/login";

  // useEffect(() => {
  //     if (userInfo.length === 0) {
  //         navigate('/login')
  //     }
  //     else {
  //         if (!user.success) {
  //             dispatch({type:USER_PROFILE_UPDATE_RESET})
  //             dispatch(getProfile())
  //         }
  //         else {
  //             setName(user?.data.name)
  //             setEmail(user?.data.email)

  //         }
  //     }

  // }, [userInfo, user, navigate, dispatch])

  // useEffect(() => {
  //     if (userInfo && userInfo?.data?.role !== 'admin') {
  //         dispatch(getMyOrders());
  //     }
  // }, [dispatch, navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(updateProfile({ name, email, password }))
  };

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ minHeight: "81vh" }}>
        <Col xs={12} md={5} className="mx-auto my-2">
          {loading && <Loader />}
          <h4>My Profile</h4>

          <Form onSubmit={submitHandler}>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
              type="text"
            >
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-0"
                
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
              type="email"
            >
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-0"
                
              />
            </FloatingLabel>

            {/* <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3"
              type="password"
            >
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="name@example.com"
                className="rounded-0"
              />
            </FloatingLabel>

            <div className="text-center">
              <Button
                type="submit"
                className="px-4 text-light text-uppercase rounded-0 shadow"
                variant="primary"
              >
                Save Changes
              </Button>
            </div> */}
          </Form>
        </Col>

        {/* orders */}
        <Col xs={12} md={6} className="mx-auto my-2">
          {error && <AlertDismissible message={error} variant="danger" />}
          {loading && <Loader />}
          <h4>My Orders</h4>
          <Table striped bordered size="sm" hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice} Tk</td>
                  <td>
                    {order.isPaid ? <TiTick size={23} /> : <FaTimesCircle />}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <TiTick size={23} />
                    ) : (
                      <FaTimesCircle />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-dark rounded-0 px-2 py-1"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
