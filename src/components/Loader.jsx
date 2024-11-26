import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

export default function Loader() {
    return (
        <Container>
            <Row>
                <Col className='mt-5 my-5 text-center'>
                    <h2>  <Spinner animation="border" role="status">
                        {/* <span className="visually-hidden">Loading...</span> */}
                    </Spinner> Loading...</h2>
                </Col>
            </Row>
        </Container>
    )
}
