import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'

export default function PaymentPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { shippingAddress } = useSelector(state => state.cart)

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('bKash')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <Container>
            <Row className='justify-content-md-center' style={{ minHeight: '81vh' }}>
                <Col xs={12} md={6} className='m-auto'>
                    <Form onSubmit={submitHandler}>
                        <CheckoutSteps step1 step2 step3 />
                        <h1>Payment Methods</h1>
                        <Form.Group controlId='paymentMethod'>
                            <Form.Label as='legend'>Select Method</Form.Label>

                            <Col>
                                <Form.Check
                                    type='radio'
                                    label='bKash'
                                    id='bKash'
                                    name='paymentMethod'
                                    value='bKash'
                                    className='rounded-0 mb-2'
                                    checked={paymentMethod === 'bKash'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                >

                                </Form.Check>
                                <Form.Check
                                    type='radio'
                                    label='Stripe (Card)'
                                    id='stripe'
                                    name='paymentMethod'
                                    value='stripe'
                                    className='rounded-0 mb-2'
                                    checked={paymentMethod === 'stripe'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                >

                                </Form.Check>
                                <Form.Check
                                    type='radio'
                                    label='Cash on Delivery'
                                    id='cod'
                                    name='paymentMethod'
                                    value='cod'
                                    className='rounded-0 mb-2'
                                    checked={paymentMethod === 'cod'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                >

                                </Form.Check>
                            </Col>
                        </Form.Group>
                        <Button
                            type='submit'
                            className='px-4 py-2 text-light text-uppercase rounded-0 fw-bold'
                            style={{ background: 'var(--clr-primary-5)', borderColor: 'var(--clr-primary-5)', letterSpacing: '1px', fontSize: '0.8rem' }}
                        >
                            Continue
                        </Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}


