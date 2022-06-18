import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./carouselfm.module.css";
import { Link } from "react-router-dom";
import { Blob, DrawPath } from "../";
import { useInView } from "react-intersection-observer";

const CarouselFM = ({ carouselProducts }) => {
  const [width, setWidth] = useState(0);

  const [carouselRef, inView, entry] = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setWidth(entry.target.scrollWidth - entry.target.offsetWidth);
    }
  }, [inView]);

  return (
    <motion.div ref={carouselRef} className={styles.track}>
      <Blob
        paths={[
          "M485.427 234.616C343.335 249.86 536.874 190.462 237.992 318.018C202.877 362.172 131.178 456.858 125.298 482.37C117.948 514.259 -102.539 739.936 61.6016 742.389C225.742 744.842 113.049 742.389 309.038 781.637C505.026 820.885 382.533 823.338 696.115 781.637C1009.7 739.936 911.703 742.389 1004.8 661.44C1125.5 556.486 1112.59 600.114 1090.54 482.37C1070.55 375.63 1088.86 350.366 990.098 291.035C818.608 188.009 889.654 202.727 696.115 202.727C583.315 202.727 622.619 219.898 485.427 234.616Z",
          "M562.344 393.513C425.15 408.203 412.901 398.409 114.015 525.723C78.8997 569.794 7.19977 664.3 1.32004 689.763C-6.02961 721.592 114.015 758.317 278.157 760.765C442.299 763.214 366.353 790.146 562.344 829.319C758.334 868.493 652.989 831.767 966.575 790.145C1280.16 748.523 1138.07 750.972 1326.71 645.693C1515.35 540.413 1640.29 442.48 1728.49 393.513C1816.68 344.546 1843.45 8.73886 1728.49 1.77594C1485.95 -12.9142 1201.76 185.402 1052.32 222.128C971.82 241.911 699.537 378.822 562.344 393.513Z",
        ]}
        viewBox={[0, 0, 1806, 847]}
        top="50%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
        width="100%"
        minWidth={800}
        threshold={0.8}
        growTime={1}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
      />
      <DrawPath
        path="M1578 592C1576.98 574.895 1571.36 559.427 1566.11 543.222C1559.83 523.817 1555.15 504.489 1543.33 487.556C1526.39 463.27 1507.29 438.125 1480.78 423.778C1460.36 412.732 1437.41 407.78 1414.89 403.111C1386.15 397.151 1356.97 391.962 1327.78 388.778C1289.68 384.622 1248.35 383.209 1210.11 386.778C1173.1 390.232 1138.93 408.969 1108.22 428.778C1068.07 454.683 1028.77 479.947 981.778 491.444C926.454 504.981 869.128 505.072 812.556 502.444C721.025 498.194 633.832 454.937 565.778 394.444C544.289 375.344 530.538 351.337 513.111 328.889C500.244 312.314 482.929 306.749 464 299.111C431.117 285.843 400.246 267.795 368.667 251.778C332.258 233.311 297.528 212.767 263.333 190.444C221.802 163.332 188.715 128.575 152.222 95.3333C107.146 54.2726 57.1861 26.7386 2 2"
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
        {carouselProducts.map((product, i) => {
          return (
            <motion.div
              key={product.id}
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
              <img src={product.url} />
              <Link
                to={`products/${product.id}`}
                key={product.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h1>{product.name}</h1>
                <h2>{product.price}</h2>
                <p>{product.description}</p>
                Buy
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CarouselFM;
