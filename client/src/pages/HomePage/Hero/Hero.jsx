import styles from "./hero.module.css";
import { Blob, DrawPath } from "../../../components";
import { heroBlob } from "../../../data/paths";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className={styles.hero_section}>
      <motion.article
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
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
          <button className={styles.learn_more}>learn more</button>
        </Link>
      </motion.article>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, stiffness: 50, type: "spring" }}
        className={styles.dummy}
      >
        <motion.div
          initial={{ backgroundSize: "150%" }}
          animate={{ backgroundSize: "120%" }}
          transition={{ type: "tween", duration: 1.5, delay: 0.2 }}
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
            animateWhen={true}
          />
        </motion.div>
      </motion.div>
      <Blob
        paths={heroBlob}
        viewBox={[0, 0, 892, 514]}
        width="80%"
        translateY="-10%"
        minWidth={800}
        maxWidth={1400}
        growTime={1.2}
        morphAt={0.3}
        morphTime={1}
        color="#FCF2F4"
        animateWhen={true}
      />
    </section>
  );
};

export default Hero;
