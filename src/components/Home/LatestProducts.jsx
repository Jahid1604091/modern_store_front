import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/LatestProducts.css";

const LatestProducts = ({ productsData, isLoading, isError, isSuccess, onPageChange }) => {
  return (
    <Container fluid className="latest-products-container">
      {isLoading && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="alert-wrapper">
          <AlertDismissible
            variant="danger"
            message="An error occurred while fetching the products. Please try again later."
          />
        </div>
      )}

      {isSuccess && productsData.data && (
        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">
              Discover our curated collection of premium products
            </p>
          </div>

          <Row className="gy-4 gx-4 product-grid">
            {productsData.data.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {productsData.pages > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                pages={productsData.pages}
                page={productsData.page || 1}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default LatestProducts;