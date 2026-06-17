import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";
import useCompany from "../../hooks/useCompany";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

// Maps social network names to icon components (case-insensitive)
const SOCIAL_ICON_MAP = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
};

const Footer = () => {
  const { data: company } = useCompany();

  if (!company) return null;

  const {
    company_name,
    details,
    no_customers,
    contact,
    address,
    social_links,
    payment_methods,
  } = company;

  const supportEmail = contact?.support_email || contact?.contact_email || '';
  const supportMobile = contact?.support_mobile || contact?.contact_mobile || '';

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <Row className="gy-4">

          {/* ── About ── */}
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">{company_name}</h5>
              <p className="footer-text">{details}</p>
              {no_customers > 0 && (
                <div className="footer-badge">
                  <i className="bi bi-shield-check" />
                  <span>Trusted by {no_customers}+ customers</span>
                </div>
              )}
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
                {supportEmail && (
                  <div className="contact-item">
                    <i className="bi bi-envelope" />
                    <span>{supportEmail}</span>
                  </div>
                )}
                {supportMobile && (
                  <div className="contact-item">
                    <i className="bi bi-telephone" />
                    <span>{supportMobile}</span>
                  </div>
                )}
                {address && (
                  <div className="contact-item">
                    <i className="bi bi-geo-alt" />
                    <span>{address}</span>
                  </div>
                )}
              </div>

              {Array.isArray(social_links) && social_links.length > 0 && (
                <div className="social-links">
                  {social_links.map((social, i) => {
                    // Support both {icon: Component, ...} (constants) and {name, url} (API)
                    const Icon = social.icon || SOCIAL_ICON_MAP[social.name?.toLowerCase()];
                    if (!Icon && !social.url) return null;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name || `Social link ${i + 1}`}
                      >
                        {Icon ? <Icon /> : social.name}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* ── Bottom bar ── */}
        <Row className="footer-bottom">
          <Col md={6} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} {company_name}. All rights reserved.</p>
          </Col>
          <Col md={6}>
            {Array.isArray(payment_methods) && (
              <ul className="payment-methods">
                {payment_methods.filter(pm => pm.is_active !== false).map((pm, i) => (
                  <li key={i}>{pm.name}</li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
