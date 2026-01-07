import React from "react";
import "./category.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useGetCategoriesQuery } from "../../slices/productApiSlice";
import Loader from "../Loader";
import AlertDismissible from "../Alert";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error
  } = useGetCategoriesQuery();
  // console.log(error.data.msg)
  if (isError && error) {
    return <AlertDismissible variant='warning' message={error.data.msg} />
  }
  if (isSuccess) {
    return (
      <Navbar bg="white" expand="lg" className="categories-navbar shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="d-lg-none fw-bold text-primary">
            Categories
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="categories-navbar-nav" className="border-0">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="categories-navbar-nav">
            <Nav className="mx-auto gap-1">
              {isLoading && (
                <div className="d-flex justify-content-center w-100 py-3">
                  <Loader />
                </div>
              )}

              {isError && (
                <div className="alert alert-danger mx-3 mb-0" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Unable to load categories. Please try again.
                </div>
              )}

              {isSuccess && categories?.data?.length > 0 ? (
                categories.data.map((category, index) => (
                  <React.Fragment key={category.id || index}>
                    {category.subcategories?.length > 0 ? (
                      <NavDropdown
                        title={
                          <span className="category-title">
                            <i className="bi bi-grid me-2"></i>
                            {category.name}
                          </span>
                        }
                        id={`nav-dropdown-${category.id || index}`}
                        className="category-dropdown"
                      >
                        {category.subcategories.map((subcategory, subIndex) =>
                          subcategory.subcategories?.length > 0 ? (
                            <NavDropdown
                              title={
                                <span className="subcategory-title">
                                  <i className="bi bi-chevron-right me-2"></i>
                                  {subcategory.name}
                                </span>
                              }
                              id={`nav-subdropdown-${category.id || index}-${subIndex}`}
                              key={subcategory.id || subIndex}
                              drop="end"
                              className="nested-dropdown"
                            >
                              {subcategory.subcategories.map(
                                (nestedSubcategory, nestedIndex) => (
                                  <NavDropdown.Item
                                    href="#"
                                    key={nestedSubcategory.id || nestedIndex}
                                    className="nested-item"
                                  >
                                    <i className="bi bi-dot me-1"></i>
                                    {nestedSubcategory.name || nestedSubcategory}
                                  </NavDropdown.Item>
                                )
                              )}
                            </NavDropdown>
                          ) : (
                            <NavDropdown.Item
                              href="#"
                              key={subcategory.id || subIndex}
                              className="subcategory-item"
                            >
                              <i className="bi bi-tag me-2"></i>
                              {subcategory.name}
                            </NavDropdown.Item>
                          )
                        )}
                      </NavDropdown>
                    ) : (
                      <Nav.Link
                        href="#"
                        className="category-link"
                      >
                        <i className="bi bi-bookmark me-2"></i>
                        {category.name}
                      </Nav.Link>
                    )}
                  </React.Fragment>
                ))
              ) : (
                isSuccess && (
                  <div className="text-muted text-center w-100 py-3">
                    No categories available
                  </div>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

  }
};

export default Categories;