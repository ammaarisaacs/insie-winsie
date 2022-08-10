import Hero from "./Hero/Hero";
import CarouselFM from "./Carousel/CarouselFM";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.main exit={{ opacity: 0, transition: { duration: 0.8 } }}>
      <Hero />
      <CarouselFM />
    </motion.main>
  );
};

export default HomePage;
