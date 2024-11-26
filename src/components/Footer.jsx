import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Modern Store &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
