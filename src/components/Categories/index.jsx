import React from "react";
import "./category.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useGetCategoriesQuery } from "../../slices/productApiSlice";
import Loader from "../Loader";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetCategoriesQuery();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#">Categories</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isLoading && <Loader/>}
            {isError && <p>Error loading categories.</p>}
            {isSuccess &&
              categories.data.map((category, index) => (
                <React.Fragment key={index}>
                  {category.subcategories?.length > 0 ? (
                    <NavDropdown
                      title={category.name}
                      id={`nav-dropdown-${index}`}
                    >
                      {category.subcategories.map((subcategory, subIndex) => (
                        subcategory.subcategories?.length > 0 ? (
                          <NavDropdown
                            title={subcategory.name}
                            id={`nav-subdropdown-${index}-${subIndex}`}
                            key={subIndex}
                            drop="end"
                          >
                            {subcategory.subcategories.map(
                              (nestedSubcategory, nestedIndex) => (
                                <NavDropdown.Item
                                  href="#"
                                  key={nestedIndex}
                                >
                                  {nestedSubcategory}
                                </NavDropdown.Item>
                              )
                            )}
                          </NavDropdown>
                        ) : (
                          <NavDropdown.Item href="#" key={subIndex}>
                            {subcategory.name}
                          </NavDropdown.Item>
                        )
                      ))}
                    </NavDropdown>
                  ) : (
                    <Nav.Link href="#" key={index}>
                      {category.name}
                    </Nav.Link>
                  )}
                </React.Fragment>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Categories;
