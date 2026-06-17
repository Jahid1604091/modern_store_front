import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import useCompany from "../../hooks/useCompany";
import { BASE_URL } from "../../utils/constants";
import "./Header.css";

const Header = () => {
  const { data: company } = useCompany();
  const company_name = company?.company_name || '';
  const tagline = company?.tag_line || '';
  const logo = company?.logo;
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo }  = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      {/* ── React Bootstrap Navbar — expand at lg breakpoint ── */}
      <Navbar expand="lg" className="site-navbar">
        <Container>

          {/* Brand */}
          <LinkContainer to="/">
            <Navbar.Brand className="site-brand">
              {logo ? (
                <img src={`${BASE_URL}/${logo}`} alt={company_name} className="brand-logo" />
              ) : (
                <span className="brand-box">{company_name?.charAt(0) || 'S'}</span>
              )}
              <span className="brand-name">{company_name}</span>
              {tagline && <span className="brand-tag">{tagline}</span>}
            </Navbar.Brand>
          </LinkContainer>

          {/* ── Hamburger — let React Bootstrap render it natively ── */}
          <Navbar.Toggle aria-controls="site-nav" className="site-toggler" />

          {/* Nav items */}
          <Navbar.Collapse id="site-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-1">

              <LinkContainer to="/">
                <Nav.Link className="site-link">Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link className="site-link cart-link">
                  Cart
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/pricing">
                <Nav.Link className="site-link">Pricing</Nav.Link>
              </LinkContainer>

              {userInfo?.token ? (
                <NavDropdown
                  title={userInfo.data?.name || userInfo.name || "Account"}
                  id="user-menu"
                  align="end"
                  className="site-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="site-link login-btn">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/start">
                    <Nav.Link className="site-link start-trial-btn" style={{ color: "#fff", padding: "6px 14px", fontSize: "13px", fontWeight: 700 }}>
                      Start Free Trial
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;