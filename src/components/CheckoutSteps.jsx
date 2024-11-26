import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav>
            <Nav.Item>
                {
                    step1 ? (<Nav.Link href='/login'>
                        Sign In
                    </Nav.Link>) : (<Nav.Link disabled>Sign In</Nav.Link>)
                } 
            </Nav.Item>
            <Nav.Item>
                {
                    step2 ? (<Nav.Link to='/shipping'>
                        Shipping
                    </Nav.Link>) : (<Nav.Link disabled='true'>Shipping</Nav.Link>)
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step3 ? (<Nav.Link to='/payment'>
                        Payment
                    </Nav.Link>) : (<Nav.Link disabled>Payment</Nav.Link>)
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step4 ? (<Nav.Link to='/placeorder'>
                       Place Order
                    </Nav.Link>) : (<Nav.Link disabled>Place Order</Nav.Link>)
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
