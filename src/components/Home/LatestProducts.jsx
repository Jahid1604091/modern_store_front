import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/LatestProducts.css";

const LatestProducts = ({ productsData, isLoading, isError, isSuccess }) => {
  return (
    <>
      {isLoading && <Loader />}

      {isError && (
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching the products. Please try again later."
        />
      )}

      {isSuccess && productsData.data && (
        <>
          <h2 className="mb-4">Our Products</h2>
          <Row className="gy-4 product-grid">
            {productsData.data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* <Pagination
            pages={productsData.pages}
            page={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
          /> */}
        </>
      )}
    </>
  );
};

export default LatestProducts;
