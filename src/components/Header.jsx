import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Modern Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  Cart {cartItems.length > 0 && <Badge bg="light" text="dark">{cartItems.length}</Badge>}
                </Nav.Link>
              </LinkContainer>
              {userInfo?.token ? (
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    <Sidebar/>
    </>
  );
};

export default Header;
