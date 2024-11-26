import { Container } from "react-bootstrap";
import LatestProducts from "../components/Home/LatestProducts";
import Slider from "../components/Home/Slider";

const HomePage = () => {
  return (
    <Container className="py-4">
      <Slider/>
      <LatestProducts />
    </Container>
  );
};

export default HomePage;
