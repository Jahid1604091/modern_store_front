import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Container className="footer-content">
        <Row className="gy-4">
          {/* About Section */}
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Modern Store</h5>
              <p className="footer-text">
                Your one-stop destination for quality products. We deliver
                excellence with every purchase and ensure customer satisfaction.
              </p>
              <div className="footer-badge">
                <i className="bi bi-shield-check"></i>
                <span>Trusted by 10,000+ customers</span>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Customer Service */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Customer Service</h5>
              <ul className="footer-links">
                <li>
                  <a href="/shipping">Shipping Info</a>
                </li>
                <li>
                  <a href="/returns">Returns & Refunds</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Contact & Social */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Connect With Us</h5>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>support@modernstore.com</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>123 Store Street, City, Country</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#facebook" className="social-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#twitter" className="social-icon">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#instagram" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#linkedin" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="footer-bottom">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Modern Store. All rights
              reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="payment-methods">
              <i className="bi bi-credit-card"></i>
              <i className="bi bi-paypal"></i>
              <i className="bi bi-wallet2"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;