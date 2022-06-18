import { useState, useEffect } from "react";
import { CarouselFM, Hero } from "../components";
import * as api from "../api";

const HomePage = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);

  const fetchCarouselProducts = async () => {
    try {
      const { data } = await api.fetchCarouselProducts();
      setCarouselProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarouselProducts();
  }, []);

  return (
    <main>
      <Hero />
      <CarouselFM carouselProducts={carouselProducts} />
    </main>
  );
};

export default HomePage;
