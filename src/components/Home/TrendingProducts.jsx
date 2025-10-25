import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import { BASE_URL } from "../../utils/constants";
import styled from "styled-components";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const TrendingContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 4rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
  margin-top: 1.5rem;
`;

const ProductCard = styled(Card)`
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  background: #f8f9fa;
  overflow: hidden;
  padding: 1.5rem;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled(Card.Img)`
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const TrendingBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
  z-index: 2;
`;

const DiscountBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff4757;
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(255, 71, 87, 0.3);
  z-index: 2;
`;

const CardBodyStyled = styled(Card.Body)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProductTitle = styled(Card.Title)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const OldPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin: 0.25rem 0;
`;

const Star = styled.i`
  color: #ffc107;
  font-size: 0.9rem;
`;

const RatingText = styled.span`
  font-size: 0.85rem;
  color: #6c757d;
  margin-left: 0.25rem;
`;

const ViewDetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    color: white;
  }

  &:active {
    transform: translateY(0);
  }

  i {
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translateX(4px);
  }
`;

const QuickActionButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  z-index: 2;

  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;

  i {
    font-size: 4rem;
    color: #667eea;
    opacity: 0.5;
    margin-bottom: 1rem;
  }

  h4 {
    color: #495057;
    margin-bottom: 0.5rem;
  }
`;

export default function TrendingProducts({
  products,
  isLoading,
  isError,
  isSuccess,
}) {
  // Generate random rating for demo purposes
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  if (isLoading) {
    return (
      <TrendingContainer>
        <div className="container">
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        </div>
      </TrendingContainer>
    );
  }

  if (isError) {
    return (
      <TrendingContainer>
        <div className="container">
          <AlertDismissible
            variant="danger"
            message="Unable to load trending products. Please try again later."
          />
        </div>
      </TrendingContainer>
    );
  }

  if (isSuccess && (!products || products.length === 0)) {
    return (
      <TrendingContainer>
        <div className="container">
          <EmptyState>
            <i className="bi bi-bag-x"></i>
            <h4>No Trending Products</h4>
            <p>Check back soon for exciting new products!</p>
          </EmptyState>
        </div>
      </TrendingContainer>
    );
  }

  if (isSuccess) {
    return (
      <TrendingContainer>
        <div className="container position-relative">
          <SectionHeader>
            <SectionTitle>
              <i className="bi bi-fire me-2"></i>
              Trending Now
            </SectionTitle>
            <SectionSubtitle>
              Discover our most popular products loved by customers
            </SectionSubtitle>
          </SectionHeader>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            loop={products.length > 4}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="trending-swiper pb-5"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id || index}>
                <ProductCard>
                  <ImageWrapper>
                    <TrendingBadge>
                      <i className="bi bi-lightning-fill me-1"></i>
                      TRENDING
                    </TrendingBadge>
                    {index < 3 && (
                      <DiscountBadge>
                        {Math.floor(Math.random() * 30 + 10)}% OFF
                      </DiscountBadge>
                    )}
                    <ProductImage
                      variant="top"
                      src={`${BASE_URL}/${product.image}`}
                      alt={product.name || `Product ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                    <QuickActionButton
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to wishlist functionality
                        console.log("Added to wishlist:", product.id);
                      }}
                      title="Add to wishlist"
                    >
                      <i className="bi bi-heart"></i>
                    </QuickActionButton>
                  </ImageWrapper>

                  <CardBodyStyled>
                    <ProductTitle>{product.name}</ProductTitle>

                    <RatingWrapper>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`bi bi-star${i < 4 ? "-fill" : ""}`}
                        />
                      ))}
                      <RatingText>({getRandomRating()})</RatingText>
                    </RatingWrapper>

                    <PriceWrapper>
                      <ProductPrice>
                        {product.currency || "$"} {product.price}
                      </ProductPrice>
                      {index < 3 && (
                        <OldPrice>
                          {product.currency || "$"}{" "}
                          {(parseFloat(product.price) * 1.3).toFixed(2)}
                        </OldPrice>
                      )}
                    </PriceWrapper>

                    <ViewDetailsButton to={`/products/${product.id}`}>
                      View Details
                      <i className="bi bi-arrow-right"></i>
                    </ViewDetailsButton>
                  </CardBodyStyled>
                </ProductCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </TrendingContainer>
    );
  }

  return null;
}