import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import { BASE_URL } from "../../utils/constants";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TrendingContainer = styled.div`
  background-color: #f8f9fa;
  padding: 2rem 0;
`;

const ProductCard = styled(Card)`
  border: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled(Card.Img)`
  height: 180px;
  object-fit: contain;
  padding: 1rem;
`;

const ProductTitle = styled(Card.Title)`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const ProductPrice = styled(Card.Text)`
  font-size: 1.1rem;
  color: #007bff;
  text-align: center;
`;

export default function TrendingProducts({
  products,
  isLoading,
  isError,
  isSuccess,
}) {
  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return (
      <AlertDismissible
        variant="danger"
        message="An error occurred while fetching the products. Please try again later."
      />
    );
  } else if (isSuccess) {
    return (
      <TrendingContainer className="py-4">
        <div className="container">
          <h2 className="mb-4">Trending Now</h2>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 }, 
              640: { slidesPerView: 2 }, 
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            className="w-full"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard className="text-center">
                  <ProductImage
                    variant="top"
                    src={`${BASE_URL}/${product.image}`}
                    alt={`Slide ${index + 1}`}
                  />
                  <Card.Body>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductPrice>
                      {product.currency} {product.price}
                    </ProductPrice>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-outline-info text-capitalize"
                    >
                      view details
                    </Link>
                  </Card.Body>
                </ProductCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </TrendingContainer>
    );
  } else return null;
}
