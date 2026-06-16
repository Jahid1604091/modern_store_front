import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Footer.css";
import { company_data } from "../../utils/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const {
    company_name,
    details,
    no_customers,
    contact: { support_email, support_mobile },
    address,
    social_links,
    payment_methods,
  } = company_data;

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <Row className="gy-4">

          {/* ── About ── */}
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">{company_name}</h5>
              <p className="footer-text">{details}</p>
              <div className="footer-badge">
                <i className="bi bi-shield-check" />
                <span>Trusted by {no_customers}+ customers</span>
              </div>
            </div>
          </Col>

          {/* ── Quick links ── */}
          <Col lg={2} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </Col>

          {/* ── Customer service ── */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Customer Service</h5>
              <ul className="footer-links">
                <li><Link to="/shipping-info">Shipping Info</Link></li>
                <li><Link to="/return-refund">Returns &amp; Refunds</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </Col>

          {/* ── Contact & social ── */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Connect With Us</h5>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-envelope" />
                  <span>{support_email}</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone" />
                  <span>{support_mobile}</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-geo-alt" />
                  <span>{address}</span>
                </div>
              </div>

              <div className="social-links">
                {social_links.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name || `Social link ${i + 1}`}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        {/* ── Bottom bar ── */}
        <Row className="footer-bottom">
          <Col md={6} className="text-center text-md-start">
            <p>
              &copy; {new Date().getFullYear()} {company_name}. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <ul className="payment-methods">
              {payment_methods.map((pm, i) => (
                <li key={i}>{pm.name}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;