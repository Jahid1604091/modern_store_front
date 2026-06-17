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
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";

/* ─── Design tokens ─────────────────────────────────────────── */
const T = {
  bg: "#f7f7f7",
  white: "#ffffff",
  black: "#111111",
  mid: "#555555",
  muted: "#999999",
  border: "#e8e8e8",
  sale: "#e63946",
  accent: "var(--clr-primary-5)",
  accentDark: "var(--clr-primary-3)",
  shadow: "rgba(0,0,0,0.08)",
  shadowHover: "rgba(0,0,0,0.14)",
};

/* ─── Styled components ─────────────────────────────────────── */

const TrendingContainer = styled.section`
  background: ${T.bg};
  padding: 3.5rem 0 4rem;
  border-top: 1px solid ${T.border};
  border-bottom: 1px solid ${T.border};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${T.border};
`;

const SectionTitle = styled.h2`
  font-family: var(--ff-heading);
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${T.black};
  margin-bottom: 0.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.5rem;
    color: ${T.sale};
  }
`;

const SectionSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${T.muted};
  letter-spacing: 0.4px;
  margin: 0;
`;

/* ── Product Card ── */
const ProductCard = styled(Card)`
  border: 1px solid ${T.border} !important;
  border-radius: 0 !important;
  background: ${T.white};
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  height: 100%;
  overflow: visible;
  position: relative;

  &:hover {
    border-color: ${T.accent} !important;
    box-shadow: 0 4px 18px ${T.shadowHover};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  background: #f0f0f0;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled(Card.Img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.45s ease, opacity 0.35s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const TrendingBadge = styled(Badge)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${T.accent} !important;
  color: ${T.white};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 0;
  z-index: 2;
`;

const DiscountBadge = styled(Badge)`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${T.sale} !important;
  color: ${T.white};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 0;
  z-index: 2;
`;

const WishlistButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  background: ${T.white};
  border: 1px solid ${T.border};
  color: ${T.black};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.25s ease, transform 0.25s ease, background 0.2s ease;
  z-index: 3;

  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: ${T.accent};
    color: ${T.white};
    border-color: ${T.accent};
  }

  i {
    font-size: 0.85rem;
  }
`;

const CardBodyStyled = styled(Card.Body)`
  padding: 0.85rem 0.9rem 1rem !important;
  border-top: 1px solid ${T.border};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductTitle = styled(Card.Title)`
  font-size: 0.88rem;
  font-weight: 600;
  color: ${T.black};
  margin: 0;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductPrice = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${T.accentDark};
`;

const OldPrice = styled.span`
  font-size: 0.82rem;
  color: ${T.muted};
  text-decoration: line-through;
`;

const ViewDetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 1rem;
  background: ${T.black};
  color: ${T.white};
  border: none;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease;
  margin-top: auto;

  &:hover {
    background: ${T.accent};
    color: ${T.white};
  }

  i {
    font-size: 0.8rem;
    transition: transform 0.2s ease;
  }

  &:hover i {
    transform: translateX(3px);
  }
`;

/* ── States ── */

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 360px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${T.muted};

  i {
    font-size: 3.5rem;
    opacity: 0.35;
    display: block;
    margin-bottom: 0.75rem;
  }

  h4 {
    color: ${T.mid};
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.85rem;
  }
`;

/* ─── Component ─────────────────────────────────────────────── */

export default function TrendingProducts({
  products,
  isLoading,
  isError,
  isSuccess,
}) {
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
            <i className="bi bi-bag-x" />
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
        <div className="container">
          <SectionHeader>
            <SectionTitle>
              <i className="bi bi-fire" />
              Trending Now
            </SectionTitle>
            <SectionSubtitle>
              Discover our most popular products loved by customers
            </SectionSubtitle>
          </SectionHeader>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.3 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
            loop={products.length > 5}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            className="trending-swiper pb-4"
            style={{
              "--swiper-navigation-color": "var(--clr-primary-5)",
              "--swiper-navigation-size": "20px",
              "--swiper-pagination-color": "var(--clr-primary-5)",
              "--swiper-pagination-bullet-inactive-color": "#ccc",
              "--swiper-pagination-bullet-inactive-opacity": "1",
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id || index}>
                <ProductCard>
                  <ImageWrapper>
                    <TrendingBadge>Hot</TrendingBadge>
                    {index % 4 === 0 && (
                      <DiscountBadge>
                        {Math.floor(Math.random() * 25 + 10)}% Off
                      </DiscountBadge>
                    )}
                    <ProductImage
                      variant="top"
                      src={`${BASE_URL}/${product.image}`}
                      alt={product.name || `Product ${index + 1}`}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                    <WishlistButton
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Wishlist:", product.id);
                      }}
                      title="Add to wishlist"
                    >
                      <i className="bi bi-heart" />
                    </WishlistButton>
                  </ImageWrapper>

                  <CardBodyStyled>
                    <ProductTitle>{product.name}</ProductTitle>

                    <Rating rating={product.rating || 4} reviews={product.numReviews} />

                    <PriceWrapper>
                      <ProductPrice>
                        {product.currency || "BDT"} {product.price}
                      </ProductPrice>
                      {index % 4 === 0 && (
                        <OldPrice>
                          {(parseFloat(product.price) * 1.25).toFixed(0)}
                        </OldPrice>
                      )}
                    </PriceWrapper>

                    <ViewDetailsButton to={`/products/${product.id}`}>
                      View Details
                      <i className="bi bi-arrow-right" />
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