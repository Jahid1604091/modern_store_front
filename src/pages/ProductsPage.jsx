import React, { useState } from 'react'
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Col, Container, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import AlertDismissible from '../components/Alert';
import Product from '../components/Product';
import Pagination from '../components/Pagination';
import Searchbox from '../components/Home/Searchbox';

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data: productsData,
        isLoading,
        isError,
        isSuccess,
    } = useGetProductsQuery({
        search: searchTerm,
        page: pageNumber,
    });
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
                        <Searchbox
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setPageNumber={setPageNumber}
                        />
                    </div>

                    <Row className="gy-4 gx-4 product-grid">
                        {productsData.data.map((product) => (
                            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    {productsData.pages > 1 && (
                        <div className="pagination-wrapper">
                            <Pagination
                                pages={productsData.pages}
                                page={productsData.page || 1}
                                onPageChange={(page) => console.log('Page changed:', page)}
                            />
                        </div>
                    )}
                </div>
            )}
        </Container>
    )
}

export default ProductsPage