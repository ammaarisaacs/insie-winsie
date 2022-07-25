import { useEffect, useState } from "react";
import { Blob, DrawPath } from "../";
import { motion } from "framer-motion";
import styles from "./carouselfm.module.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { carouselDrawPath, carouselPaths } from "../../data/paths";
import useFetch from "../../hooks/useFetch";
import { fetchCarousel } from "../../services/ProductService";

const CarouselFM = () => {
  const [width, setWidth] = useState(0);
  const { data, isPending, error, styling } = useFetch(fetchCarousel);

  const [carouselRef, inView, entry] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) setWidth(entry.target.scrollWidth - entry.target.offsetWidth);
  }, [inView]);

  if (isPending) return <p style={styling}>Loading...</p>;

  if (error) return <p style={styling}>{error}</p>;

  return (
    <motion.div ref={carouselRef} className={styles.track}>
      <Blob
        paths={carouselPaths}
        minWidth={800}
        threshold={0.8}
        growTime={1}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
        viewBox={[0, 0, 1806, 847]}
        top="50%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
        width="100%"
        color="#F4F0FF"
      />
      <DrawPath
        path={carouselDrawPath}
        viewBox={[0, 0, 1580, 594]}
        top="40%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
        width="110%"
        minWidth={400}
        thickness={4}
        drawTime={2}
        animateWhen={inView}
        zIndex={-1}
      />
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={styles.slider}
      >
        {data?.map((product, i) => {
          const { id, name, price, description, media } = product;
          return (
            <motion.div
              key={id}
              initial={{
                opacity: 0,
                x: "200px",
              }}
              animate={
                inView && {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i * 0.2,
                    ease: "easeOut",
                    duration: 1,
                  },
                }
              }
            >
              <img src={`http://localhost:5000/static/${media[0].file_name}`} />

              <Link to={`products/${id}`} className={styles.carousel_info}>
                <h1>{name}</h1>
                <h2>{price}</h2>
                <p>{description}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CarouselFM;
