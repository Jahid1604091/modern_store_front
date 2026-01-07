import React, { useState, useEffect } from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { BiListUl, BiShoppingBag } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <Navbar expand="lg" className="modern-navbar">
        <Container>
          {/* Logo/Brand */}
          <LinkContainer to="/">
            <Navbar.Brand className="modern-brand">
              <div className="brand-content">
                <div className="brand-icon">
                  <BiShoppingBag/>
                  {/* <i className="bi bi-shop"></i> */}
                </div>
                <div className="brand-text">
                  <span className="brand-name">Modern Store</span>
                  <span className="brand-tagline">Shop Smart</span>
                </div>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="modern-navbar-nav">
            <span className="navbar-toggler-icon-custom">
              <i className="bi bi-list"></i>
              <BiListUl/>
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="modern-navbar-nav">

            {/* Navigation Links */}
            <Nav className="ms-auto align-items-lg-center">
              {/* Home Link */}
              <LinkContainer to="/">
                <Nav.Link className="nav-link-modern">
                  <i className="bi bi-house-door"></i>
                  <span>Home</span>
                </Nav.Link>
              </LinkContainer>

              {/* Cart Link */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link-modern cart-link">
                  <div className="cart-icon-wrapper">
                    <i className="bi bi-cart3"></i>
                    {cartItemCount > 0 && (
                      <Badge className="cart-badge" bg="danger">
                        {cartItemCount}
                      </Badge>
                    )}
                  </div>
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>

              {/* User Menu */}
              {userInfo?.token ? (
                <NavDropdown
                  title={
                    <span className="user-dropdown-title">
                      <div className="user-avatar">
                        <i className="bi bi-person-circle"></i>
                      </div>
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
                      <i className="bi bi-person"></i>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to="/orders">
                    <NavDropdown.Item>
                      <i className="bi bi-bag-check"></i>
                      My Orders
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  {/* <LinkContainer to="/settings">
                    <NavDropdown.Item>
                      <i className="bi bi-gear"></i>
                      Settings
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="logout-item">
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-modern login-link">
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Login</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;