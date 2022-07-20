import { useState, useEffect } from "react";
import { CarouselFM, Hero } from "../components";
import * as api from "../services/api";
import { motion } from "framer-motion";

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
    <motion.main exit={{ opacity: 0, transition: { duration: 0.8 } }}>
      <Hero />
      <CarouselFM carouselProducts={carouselProducts} />
    </motion.main>
  );
};

export default HomePage;
