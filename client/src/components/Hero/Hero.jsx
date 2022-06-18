import React from "react";
import styles from "./hero.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ObservableBlob, DrawPath } from "../";

const animationTime = 1.5;

const Hero = () => {
  return (
    <section className={styles.hero_section}>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className={styles.hero_header}
      >
        <h1>attire for your young ones</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
          cumque delectus. Veritatis, iusto vel eius quos libero maxime
          dignissimos, repellendus, ratione quaerat obcaecati beatae sequi
          voluptate accusantium asperiores? Eum, tempore.
        </p>
        <Link to="about">
          <button className={styles.learn_more}>Learn more</button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.2,
            stiffness: 50,
            type: "spring",
          },
        }}
        className={styles.dummy}
      >
        <motion.div
          initial={{ backgroundSize: "150%" }}
          animate={{
            backgroundSize: "120%",
          }}
          transition={{ type: "tween", duration: animationTime, delay: ".2" }}
          className={styles.hero_image_container}
        >
          <DrawPath
            path="M390,290.5Q377,331,340.5,350Q304,369,264,399Q224,429,161,427.5Q98,426,60,371.5Q22,317,59,261Q96,205,108.5,153Q121,101,169.5,65Q218,29,272,56.5Q326,84,374,111.5Q422,139,412.5,194.5Q403,250,390,290.5Z"
            viewBox={[0, 0, 400, 400]}
            width="100%"
            top="40%"
            left="40%"
            translateX="-50%"
            translateY="-50%"
            drawTime={2}
            delay={0.2}
          />
        </motion.div>
      </motion.div>
      <ObservableBlob
        paths={[
          "M196.005 154.981C-47.4949 288.981 28.3766 299 142.377 420C180.377 480 322.105 505.281 398.505 512.481C494.005 521.481 767.005 389.481 828.505 332.481C890.005 275.481 842.005 195.981 787.505 125.481C733.005 54.9814 594.005 111.981 578.005 34.4814C562.005 -43.0186 439.505 20.9814 196.005 154.981Z",
          "M42.1566 257.742C-71.4867 383.452 74.5136 313.452 186.514 456.452C296.513 533.452 538.114 485.252 614.514 492.452C710.014 501.452 921.141 238.399 887.156 161.742C846.156 69.2606 714.657 116.242 660.157 45.742C605.657 -24.758 511.513 33.4521 427.513 81.4521C348.613 126.538 205.796 76.7264 42.1566 257.742Z",
        ]}
        viewBox={[0, 0, 892, 514]}
        width="80%"
        translateY="-10%"
        threshold={0.8}
        minWidth={800}
        maxWidth={1400}
        growTime={1.2}
        morphAt={0.3}
        morphTime={1}
      />
    </section>
  );
};

export default Hero;
