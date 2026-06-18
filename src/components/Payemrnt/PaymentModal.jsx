import React, { useEffect } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

const PaymentModal = ({
    show,
    setShow,
    paymentData,
    setPaymentData,
    handleSubmit,
    order
}) => {

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'advance_paid') {
            const advance = Number(value) || 0;
            const total = Number(order.total) || 0;

            if (advance > total) return; // stop update
        }
        if (name === 'payment_medium' && value === 'cod') {
            // COD has no online advance - clear any amount left over from
            // switching away from bKash/bank rather than carrying it over.
            // The payable_amount effect below recomputes from advance_paid.
            setPaymentData(prev => ({
                ...prev,
                payment_medium: value,
                advance_paid: 0,
            }));
            return;
        }
        setPaymentData(prev => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleBankChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            bank_details: {
                ...prev.bank_details,
                [name]: value,
            },
        }));
    };

    useEffect(() => {
        const advance = Number(paymentData.advance_paid) || 0;
        const total = Number(order.total) || 0;

        setPaymentData(prev => ({
            ...prev,
            payable_amount: Math.max(total - advance, 0),
        }));
    }, [paymentData.advance_paid, order.total, setPaymentData]);

    const isMFS = ['bkash', 'nagad', 'rocket'].includes(paymentData.payment_medium);
    const isBank = paymentData.payment_medium === 'bank';

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* Payment Medium */}
                <FloatingLabel label="Payment Method" className="mb-3">
                    <Form.Select
                        name="payment_medium"
                        value={paymentData.payment_medium}
                        onChange={handleChange}
                    >
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                        <option value="bank">Bank</option>
                        <option value="cod">Cash on Delivery</option>
                    </Form.Select>
                </FloatingLabel>


                {(isBank || isMFS) && <>
                    <FloatingLabel label="Advance Paid Amount" className="mb-3">
                        <Form.Control
                            type="number"
                            name="advance_paid"
                            value={order.payment_details.length > 0 && order.payment_details[0].advance_paid > 0 ? order.payment_details[0].advance_paid : paymentData.advance_paid}
                            onChange={handleChange}
                            placeholder="Advance Paid"
                            readOnly={order.payment_details && order.payment_details.advance_paid > 0}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Total Amount" className="mb-3">
                        <Form.Control
                            type="number"
                            name="total"
                            value={order.total}
                            // onChange={handleChange}
                            placeholder="Total "
                            readOnly
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Remaining Amount" className="mb-3">
                        <Form.Control
                            type="number"
                            name="payable_amount"
                            value={order.payment_details.length > 0 ? order.payment_details[0].payable_amount : paymentData.payable_amount}
                            onChange={handleChange}
                            placeholder="Total Remaining to Pay"
                            readOnly
                        />
                    </FloatingLabel>

                </>
                }

                {/* Account No (Bank / MFS) */}
                {(isMFS || isBank) && (
                    <FloatingLabel label="Account / Wallet Number" className="mb-3">
                        <Form.Control
                            type="number"
                            name="acc_no"
                            value={paymentData.acc_no}
                            onChange={handleChange}
                            placeholder="Account Number"
                            required
                        />
                    </FloatingLabel>
                )}

                {/* Transaction ID (Only MFS) */}
                {isMFS && (
                    <FloatingLabel label="Transaction ID (Trx ID)" className="mb-3">
                        <Form.Control
                            type="text"
                            name="trx_id"
                            value={paymentData.trx_id}
                            onChange={handleChange}
                            placeholder="Transaction ID"
                        />
                    </FloatingLabel>
                )}

                {/* Bank Name */}
                {isBank && (
                    <>
                        <FloatingLabel label="Bank Name" className="mb-3">
                            <Form.Control
                                type="text"
                                name="bank_name"
                                value={paymentData.bank_details.bank_name}
                                onChange={handleBankChange}
                                placeholder="Bank Name"
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Branch Name" className="mb-3">
                            <Form.Control
                                type="text"
                                name="branch"
                                value={paymentData.bank_details.branch}
                                onChange={handleBankChange}
                                placeholder="Branch Name"
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Routing Number" className="mb-3">
                            <Form.Control
                                type="text"
                                name="routing_no"
                                value={paymentData.bank_details.routing_no}
                                onChange={handleBankChange}
                                placeholder="Routing Number"
                            />
                        </FloatingLabel>
                    </>
                )}


            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                {order.payment_details && order.payment_details.payable_amount > 0 ? <Button
                    variant="primary"
                    onClick={() => {
                        handleSubmit(paymentData);
                        handleClose();
                    }}
                >
                    Confirm Payment
                </Button> : <Button
                    variant="primary"
                    onClick={() => {
                        handleSubmit(paymentData);
                        handleClose();
                    }}
                >
                    Confirm Payment
                </Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
