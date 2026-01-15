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
import NotFound from "./NotFound";
import PaymentModal from "../components/Payemrnt/PaymentModal";
import { useCreatePaymentMutation } from "../slices/paymentSlice";
import toast from "react-hot-toast";

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
  const [createPayment, { isSuccess: paymentSuccess, isError: isPaymentError, error: paymentError }] = useCreatePaymentMutation();
  const [isValidated, setIsValidated] = useState(false);
  // const [isPaid, setIsPaid] = useState(false);
  const [show, setShow] = useState(false);
  const [paymentData, setPaymentData] = useState({
    order_id: id,
    payment_medium: 'bkash', //nagad, rocket, bank, cod
    advance_paid: 0, // partial, service-charge
    payable_amount: 0,
    trx_id: '', // only for mfs
    bank_details: {         // JSON field
      bank_name: '',
      branch: '',
      routing_no: '',
    },
    acc_no: '', //bank/mfs
  })
  const changeOrderToPaid = async () => {
    const res = await payOrder(id).unwrap();
    // if (res.success) {
    //   setIsPaid(true);
    // }
  };
  useEffect(() => {
    if (search.split("=")[1] === "VALID") {
      setIsValidated(true);
      changeOrderToPaid();
    }
  }, [isValidated, search, id]);

  const handlePaymentModal = () => {
    setShow(true)
  }
  const handlePayment = async (formData) => {
    try {
      const res = await createPayment(formData);
      if (res.success) {
        toast.dismiss()
        toast.success(res.data.msg)

      }
      if (res.error) {
        toast.dismiss()
        toast.error(res.error.data.msg)

      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSSLPayment = async () => {
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
      } = await axios.post(`${BASE_URL}/api/payments/ssl-request`, payment_data, config);
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
        headers: {
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

  if (isSuccess && order) {
    const { address, city, country, postalCode } = order.shipping_address
    return (
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 pb-0">
                <h5 className="fw-bold text-uppercase">
                  Your Order # {order.order_number}
                </h5>
                <p>
                  <span>Shipping Address: </span>
                  <span className="fw-lighter">
                    {`${address}, ${city}, ${country} - ${postalCode}`}
                    {/* {order.shipping_address} */}
                  </span>
                </p>

                <p>Your Order Status -<strong className="fw-bold text-uppercase"> {order.status}</strong></p>
                <p>Your Payment Status -<strong className="fw-bold text-uppercase"> {order.payment_status}</strong></p>
                {/* {order.payment_status === 'paid' || isPaid? (
                  <p className="bg-info text-light px-2 fw-bold d-flex align-items-center">
                    <TiTick size={23} />
                    &nbsp;Paid at {order.paidAt}
                  </p>
                ) : (
                  <p className="bg-secondary text-light px-2 fw-bold d-flex align-items-center">
                    <FaTimesCircle size={15} />
                    &nbsp;Not Paid
                  </p>
                )} */}
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
                  {order.payment_method || (order.payment_details.length > 0 && order.payment_details[0].payment_medium)}
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                <h5>Order Items:</h5>
                {order.items.length === 0 ? (
                  <Alert variant="info">No items in this order</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index} className="border-0">
                        <Row>
                          <Col md={1}>
                            <Image
                              src={`${BASE_URL}/${item.product.image}`}
                              alt={item.product.name}
                              fluid
                            />
                          </Col>
                          <Col>
                            <span className="fw-lighter fst-italic">
                              {item.product.name}
                            </span>
                          </Col>
                          <Col md={4}>
                            {item.order_quantity} x {item.product.price} ={" "}
                            {(item.order_quantity * item.product.price).toFixed(2)} Tk
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
                    <Col>Sub Total</Col>
                    <Col>
                      <span className="px-2 py-1 rounded">
                        {order.subtotal}
                      </span>{" "}
                      Tk
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>
                      <span className="px-2 py-1 rounded">
                        {order.discount}
                      </span>{" "}
                      Tk
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Cost</Col>
                    <Col>
                      <span className="px-2 py-1 rounded">
                        {order.shipping_cost}
                      </span>{" "}
                      Tk
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Net Total</Col>
                    <Col>
                      <span className="text-xl fw-bold px-2 py-1 rounded">
                        {order.total}
                      </span>{" "}
                      Tk
                    </Col>
                  </Row>
                </ListGroup.Item>

                {
                  order.payment_details.length > 0 && order.payment_details[0].advance_paid > 0 && <>
                    <ListGroup.Item>
                      <Row>
                        <Col>*Advanced</Col>
                        <Col>
                          <span className="px-2 py-1 rounded">
                            {order.payment_details.reduce(
                              (sum, p) => sum + Number(p.advance_paid || 0),
                              0
                            )}
                          </span>{" "}
                          Tk
                        </Col>

                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Remaining</Col>
                        <Col>
                          <span className="text-xl fw-bold px-2 py-1 rounded">
                            {order.payment_details[0].payable_amount}
                          </span>{" "}
                          Tk
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                }
              </ListGroup>
              <div className="text-center mt-2">
                {(order.payment_details.length > 0 && order.payment_details[0].payable_amount > 0) || (order.payment_details.length === 0) ? (
                  <Button
                    onClick={handlePaymentModal}
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
        <PaymentModal
          show={show}
          setShow={setShow}
          handleSubmit={handlePayment}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          order={order}
        // payable_total={order.total}
        // advance_paid={order.payment_details.advance_paid}
        />
      </Container>
    );

  }
  else {
    return <NotFound />
  }
}
