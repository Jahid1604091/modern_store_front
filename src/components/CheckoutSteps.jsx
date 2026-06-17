import React from 'react'
import { Nav } from 'react-bootstrap'

const activeStyle = { color: 'var(--clr-primary-5)', fontWeight: 700 };

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="mb-3" style={{ fontFamily: 'var(--ff-heading)', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            <Nav.Item>
                {
                    step1 ? (<Nav.Link href='/login' style={activeStyle}>
                        Sign In
                    </Nav.Link>) : (<Nav.Link disabled>Sign In</Nav.Link>)
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step2 ? (<Nav.Link href='/shipping' style={activeStyle}>
                        Shipping
                    </Nav.Link>) : (<Nav.Link disabled='true'>Shipping</Nav.Link>)
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step3 ? (<Nav.Link href='/payment' style={activeStyle}>
                        Payment
                    </Nav.Link>) : (<Nav.Link disabled>Payment</Nav.Link>)
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step4 ? (<Nav.Link href='/placeorder' style={activeStyle}>
                       Place Order
                    </Nav.Link>) : (<Nav.Link disabled>Place Order</Nav.Link>)
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
