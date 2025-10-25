import Carousel from "react-bootstrap/Carousel";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/Slider.css";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";

function Slider() {
  const [index, setIndex] = useState(0);

  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery({});

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Conditional rendering for loader and error messages
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

  if (isError) {
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

  // Handle empty products
  if (isSuccess && (!productsData?.data || productsData.data.length === 0)) {
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
        {isSuccess &&
          productsData.data.slice(0, 5).map((product, idx) => (
            <Carousel.Item key={product.id || idx}>
              <div className="carousel-image-wrapper">
                <img
                  className="d-block w-100 carousel-image"
                  src={`${BASE_URL}/${product.image}`}
                  alt={product.name || "Product image"}
                  loading={idx === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/1200x400?text=Image+Not+Available";
                  }}
                />
                <div className="carousel-overlay"></div>
              </div>
              <Carousel.Caption className="custom-caption">
                <div className="caption-content">
                  <span className="product-badge">Featured</span>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description d-none d-md-block">
                    {product.description || "Discover this amazing product"}
                  </p>
                  {product.price && (
                    <div className="product-price">
                      <span className="price-label">Starting at</span>
                      <span className="price-value">${product.price}</span>
                    </div>
                  )}
                  <button className="btn-shop-now">
                    Shop Now
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
      
      {/* Progress indicators */}
      <div className="carousel-progress">
        {productsData?.data.slice(0, 5).map((_, idx) => (
          <div
            key={idx}
            className={`progress-bar ${idx === index ? "active" : ""}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;