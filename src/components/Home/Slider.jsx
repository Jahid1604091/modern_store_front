import Carousel from "react-bootstrap/Carousel";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import Loader from "../Loader";
import AlertDismissible from "../Alert";
import "./css/Slider.css"; // Import the custom CSS file

function Slider() {
  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery({});

  // Conditional rendering for loader and error messages
  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert-container">
        <AlertDismissible
          variant="danger"
          message="An error occurred while fetching the products. Please try again later."
        />
      </div>
    );
  }

  return (
    <Carousel fade indicators interval={3000}>
      {isSuccess &&
        productsData.data.slice(0, 4).map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.name}
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.description || "No description available"}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default Slider;
