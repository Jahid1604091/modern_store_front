import React from "react";
import "./category.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useGetCategoriesQuery } from "../../slices/productApiSlice";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import { Link } from "react-router-dom";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCategoriesQuery();

  if (isError && error) {
    return (
      <AlertDismissible variant="warning" message={error?.data?.msg} />
    );
  }

  if (isLoading) {
    return (
      <nav className="categories-navbar">
        <Container className="d-flex justify-content-center py-3">
          <Loader />
        </Container>
      </nav>
    );
  }

  if (!isSuccess) return null;

  return (
    <Navbar expand="lg" className="categories-navbar">
      <Container>
        {/* Mobile label */}
        <Navbar.Brand className="d-lg-none">Categories</Navbar.Brand>

        <Navbar.Toggle aria-controls="categories-navbar-nav" />

        <Navbar.Collapse id="categories-navbar-nav">
          <Nav className="mx-auto">
            {categories?.data?.length > 0 ? (
              categories.data.map((category, index) =>
                category.subcategories?.length > 0 ? (
                  /* ── Top-level with dropdown ── */
                  <NavDropdown
                    key={category.id || index}
                    title={
                      <span className="category-title">
                        {category.name}
                        <i className="bi bi-chevron-down" />
                      </span>
                    }
                    id={`nav-dropdown-${category.id || index}`}
                    className="category-dropdown"
                  >
                    {category.subcategories.map((sub, subIndex) =>
                      sub.subcategories?.length > 0 ? (
                        /* ── Nested fly-out ── */
                        <NavDropdown
                          key={sub.id || subIndex}
                          title={
                            <span className="subcategory-title">
                              {sub.name}
                            </span>
                          }
                          id={`nav-sub-${category.id || index}-${subIndex}`}
                          drop="end"
                          className="nested-dropdown"
                        >
                          {sub.subcategories.map((nested, nestedIndex) => (
                            <NavDropdown.Item
                              as={Link}
                              to={`/products?category=${nested.id || nested.name}`}
                              key={nested.id || nestedIndex}
                              className="nested-item"
                            >
                              <i className="bi bi-dot" />
                              {nested.name || nested}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                      ) : (
                        /* ── Simple subcategory ── */
                        <NavDropdown.Item
                          as={Link}
                          to={`/products?category=${sub.id || sub.name}`}
                          key={sub.id || subIndex}
                          className="subcategory-item"
                        >
                          <i className="bi bi-arrow-right-short" />
                          {sub.name}
                        </NavDropdown.Item>
                      )
                    )}
                  </NavDropdown>
                ) : (
                  /* ── Top-level no dropdown ── */
                  <Nav.Link
                    as={Link}
                    to={`/products?category=${category.id || category.name}`}
                    key={category.id || index}
                    className="category-link"
                  >
                    {category.name}
                  </Nav.Link>
                )
              )
            ) : (
              <span className="text-muted py-3 small">
                No categories available
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Categories;