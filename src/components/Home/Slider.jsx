import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import { useGetBannersQuery } from "../../slices/bannerApiSlice";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/Slider.css";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";

function Slider() {
  const [index, setIndex] = useState(0);

  // Admin-configured banners take priority; fall back to featured products
  // if the store hasn't set any up yet.
  const { data: bannersData, isLoading: bannersLoading } = useGetBannersQuery();
  const banners = bannersData?.data || [];
  const hasBanners = banners.length > 0;

  const {
    data: productsData,
    isLoading: productsLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery({}, { skip: bannersLoading || hasBanners });

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const isLoading = bannersLoading || (!hasBanners && productsLoading);

  if (isLoading) {
    return (
      <div className="slider-container">
        <div className="loader-container">
          <Loader />
          <p className="loading-text mt-3">Loading featured products...</p>
        </div>
      </div>
    );
  }

  if (!hasBanners && isError) {
    return (
      <div className="slider-container">
        <div className="alert-container">
          <AlertDismissible
            variant="danger"
            message="Unable to load featured products. Please try again later."
          />
        </div>
      </div>
    );
  }

  const slides = hasBanners
    ? banners.map((b) => ({
        key: b.id,
        image: b.image,
        alt: b.title || "Banner",
        link: b.link_url || null,
        title: b.title,
        subtitle: b.subtitle,
        buttonText: b.button_text,
      }))
    : (isSuccess ? productsData?.data || [] : []).slice(0, 5).map((p) => ({
        key: p.id,
        image: p.image,
        alt: p.name || "Product image",
        link: `/products/${p.id}`,
      }));

  if (slides.length === 0) {
    return (
      <div className="slider-container">
        <div className="empty-slider">
          <i className="bi bi-images"></i>
          <p>No featured products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-wrapper">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        fade
        indicators
        interval={4000}
        pause="hover"
        className="custom-carousel"
      >
        {slides.map((slide, idx) => {
          const image = (
            <div className="carousel-image-wrapper">
              <img
                className="d-block w-100 carousel-image"
                src={`${BASE_URL}/${slide.image}`}
                alt={slide.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x400?text=Image+Not+Available";
                }}
              />
              <div className="carousel-overlay"></div>
              {(slide.title || slide.subtitle || slide.buttonText) && (
                <div className="carousel-caption-custom">
                  {slide.title && <h3>{slide.title}</h3>}
                  {slide.subtitle && <p>{slide.subtitle}</p>}
                  {slide.buttonText && <span className="btn-shop-now">{slide.buttonText}</span>}
                </div>
              )}
            </div>
          );

          return (
            <Carousel.Item key={slide.key || idx}>
              {slide.link ? (
                slide.link.startsWith("http") ? (
                  <a href={slide.link} target="_blank" rel="noopener noreferrer">{image}</a>
                ) : (
                  <Link to={slide.link}>{image}</Link>
                )
              ) : (
                image
              )}
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="carousel-progress">
        {slides.map((slide, idx) => (
          <div
            key={slide.key || idx}
            className={`progress-bar ${idx === index ? "active" : ""}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
