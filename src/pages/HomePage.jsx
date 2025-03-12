import { Container } from "react-bootstrap";
import LatestProducts from "../components/Home/LatestProducts";
import Slider from "../components/Home/Slider";
import TrendingProducts from "../components/Home/TrendingProducts";
import { useState } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Searchbox from "../components/Home/Searchbox";

const HomePage = () => {
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
    <Container className="py-4">
      <Slider />
      <Searchbox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPageNumber={setPageNumber}
      />
      <TrendingProducts
        products={productsData?.data}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
      <LatestProducts
        productsData={productsData}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
    </Container>
  );
};

export default HomePage;
