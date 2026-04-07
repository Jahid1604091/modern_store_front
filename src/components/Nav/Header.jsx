import React, { useState, useEffect } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { BiShoppingBag } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <Navbar expand="lg" className="modern-navbar">
        <Container>
          {/* ── Brand ── */}
          <LinkContainer to="/">
            <Navbar.Brand className="modern-brand">
              <div className="brand-content">
                <div className="brand-icon">
                  <BiShoppingBag />
                </div>
                <div className="brand-text">
                  <span className="brand-name">Modern Store</span>
                  <span className="brand-tagline">Shop Smart</span>
                </div>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          {/* ── Mobile toggle ── */}
          <Navbar.Toggle aria-controls="modern-navbar-nav">
            <span className="navbar-toggler-icon-custom">
              <i className="bi bi-list" />
            </span>
          </Navbar.Toggle>

          {/* ── Nav items ── */}
          <Navbar.Collapse id="modern-navbar-nav">
            <Nav className="ms-auto align-items-lg-center">

              {/* Home */}
              <LinkContainer to="/">
                <Nav.Link className="nav-link-modern">
                  <i className="bi bi-house-door" />
                  <span>Home</span>
                </Nav.Link>
              </LinkContainer>

              {/* Cart */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link-modern cart-link">
                  <div className="cart-icon-wrapper">
                    <i className="bi bi-bag" />
                    {cartItemCount > 0 && (
                      <Badge className="cart-badge">{cartItemCount}</Badge>
                    )}
                  </div>
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>

              {/* Auth */}
              {userInfo?.token ? (
                <NavDropdown
                  title={
                    <span className="user-dropdown-title">
                      <i className="bi bi-person-circle" style={{ fontSize: "1rem" }} />
                      <span className="user-name">
                        {userInfo.name || "Account"}
                      </span>
                    </span>
                  }
                  id="user-dropdown"
                  className="user-dropdown"
                  align="end"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="bi bi-person" />
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="logout-item"
                  >
                    <i className="bi bi-box-arrow-right" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-modern login-link">
                    <i className="bi bi-box-arrow-in-right" />
                    <span>Login</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;