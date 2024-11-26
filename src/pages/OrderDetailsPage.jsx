import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Image,
  Card,
  Row,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import {
  useGetMyOrderQuery,
  useLazyDownloadInvoiceQuery,
  usePayOrderMutation,
} from "../slices/orderApliSlice";
import Loader from "../components/Loader";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function OrderDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { search } = useLocation();
  const {
    data: order,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetMyOrderQuery(id);
  const [triggerDownloadInvoice] = useLazyDownloadInvoiceQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder] = usePayOrderMutation();
  const [isValidated, setIsValidated] = useState(false);

  const changeOrderToPaid = async () => {
    const res = await payOrder(id).unwrap();
  };
  useEffect(() => {
    if (search.split("=")[1] === "VALID") {
      setIsValidated(true);
      changeOrderToPaid();
    }
  }, [isValidated, search, id]);
  const paymentHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
      const payment_data = {
        total_amount: order.totalPrice,
        tran_id: id,
      };
      const {
        data: { data },
      } = await axios.post("/api/payments/ssl-request", payment_data, config);
      window.location.replace(data?.GatewayPageURL);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const deliverHandler = () => {
    // dispatch(deliverOrder(id))
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/orders/myorders/${id}/invoice`, {
        responseType: "blob",
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert variant="danger">
        {error?.message || "Failed to fetch order details."}
      </Alert>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 pb-0">
              <h5 className="fw-bold text-uppercase">
                Your Order Id: {order._id}
              </h5>
              <p>
                <span>Shipping Address: </span>
                <span className="fw-lighter">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </p>
              <p>
                Name: <span className="fw-lighter">{order.user.name}</span>
              </p>
              <p>
                Email: <span className="fw-lighter ">{order.user.email}</span>
              </p>
              <h5 className="fw-bold text-uppercase">Your Order Status</h5>
              {order.isPaid ? (
                <p className="bg-info text-light px-2 fw-bold d-flex align-items-center">
                  <TiTick size={23} />
                  &nbsp;Paid at {order.paidAt}
                </p>
              ) : (
                <p className="bg-secondary text-light px-2 fw-bold d-flex align-items-center">
                  <FaTimesCircle size={15} />
                  &nbsp;Not Paid
                </p>
              )}
              {order.isDelivered ? (
                <p className="bg-info text-light px-2 fw-bold d-flex align-items-center">
                  <TiTick size={23} />
                  &nbsp;Delivered on {order.deliveredAt}
                </p>
              ) : (
                <p className="bg-secondary text-light px-2 fw-bold d-flex align-items-center">
                  <FaTimesCircle />
                  &nbsp;Not Delivered
                </p>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="border-0 pb-0">
              Payment Method:{" "}
              <span className="fw-lighter fst-italic">
                {" "}
                {order.paymentMethod}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <h5>Order Items:</h5>
              {order.orderItems.length === 0 ? (
                <Alert variant="info">No items in this order</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="border-0">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            roundedCircle
                            fluid
                          />
                        </Col>
                        <Col>
                          <span className="fw-lighter fst-italic">
                            {item.name}
                          </span>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} ={" "}
                          {(item.qty * item.price).toFixed(2)} Tk
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card className="border-0 shadow py-3">
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 text-center text-uppercase fw-bold">
                Order Summary
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    <span className="bg-info text-light px-2 py-1 rounded">
                      {order.totalPrice?.toFixed(2)}
                    </span>{" "}
                    Tk
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <div className="text-center mt-2">
              {!order.isPaid ? (
                <Button
                  onClick={paymentHandler}
                  className="px-4 text-light text-uppercase rounded-0 shadow"
                  variant="primary"
                >
                  Make Payment
                </Button>
              ) : (
                <Button
                  onClick={() => handleDownload()}
                  className="px-4 text-light text-uppercase rounded-0 shadow"
                  variant="primary"
                >
                  Download Invoice
                </Button>
              )}
              {userInfo?.data?.role === "admin" && !order.isDelivered && (
                <Button
                  onClick={deliverHandler}
                  className="px-4 text-light text-uppercase rounded-0 shadow"
                  variant="primary"
                >
                  Mark As Delivered
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
