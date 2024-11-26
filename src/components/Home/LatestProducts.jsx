import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Product from "../../components/Product";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import Pagination from "../../components/Pagination";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/LatestProducts.css"; // Importing custom CSS

const LatestProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { data: productsData, isLoading, isError, isSuccess } = useGetProductsQuery({
    search: searchTerm,
    page: pageNumber,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1); // Reset to the first page on search
  };

  return (
    <div className="latest-products-container">

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-4 search-form">
        <Form.Control
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button type="submit" variant="primary" className="search-button">
          Search
        </Button>
      </Form>

      {isLoading && <Loader />}

      {isError && (
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching the products. Please try again later."
        />
      )}

      {isSuccess && productsData.data && (
        <>
          <Row className="gy-4 product-grid">
            {productsData.data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagination
            pages={productsData.pages}
            page={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
          />
        </>
      )}
    </div>
  );
};

export default LatestProducts;
