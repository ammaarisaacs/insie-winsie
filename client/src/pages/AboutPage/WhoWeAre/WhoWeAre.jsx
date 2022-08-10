import styles from "./whoweare.module.css";
import { Blob } from "../../../components";
import url from "../../../assets/images/profile.jpg";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={styles.who_we_are_container}>
      <svg
        className={styles.svg_left}
        viewBox="0 0 226 562"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="181.5" cy="102.5" r="44.5" fill="#D9D9D9" />
        <path
          d="M1 1C41.5 36.5 67 62.5 102.5 77C138 91.5 166 72 182 149.5C198 227 203 248 182 298C161 348 151.5 406.5 127 435.5C102.5 464.5 116 466.5 57.5 490.5C10.7 509.7 0.333338 545.833 1 561.5M1 77C25 112.5 91 136.5 109 156C127 175.5 145 208 127 253C109 298 99.5 317.5 86.5 346.5C73.5 375.5 44.5 451.5 1 490.5"
          stroke="black"
        />
      </svg>
      <div className={styles.profile_container}>
        <motion.img
          src={url}
          alt="photograph of the owner of insie-winsie"
          className={styles.profile_photo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView && { opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "easeOut" }}
        />
        <svg
          className={styles.image_border}
          viewBox="0 0 502 751"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M501 1H1V750"
            initial={{ pathLength: 0 }}
            animate={inView && { pathLength: 1 }}
            transition={{ duration: 2, type: "easeOut" }}
            stroke="black"
          />
          <motion.path
            d="M501 1V750H1"
            initial={{ pathLength: 0 }}
            animate={inView && { pathLength: 1 }}
            transition={{ duration: 2, delay: 1, type: "easeOut" }}
            stroke="black"
          />
        </svg>
      </div>
      <motion.div
        className={styles.text_container}
        initial={{ opacity: 0 }}
        animate={inView && { opacity: 1, transition: { duration: 2 } }}
      >
        <h3 className={styles.profile_header}>Name</h3>
        <p className={styles.profile_body}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          consequatur ea laborum quas alias! Odit labore iste consectetur quasi
          dolores expedita nostrum cumque reiciendis repellat unde, cum magni.
          Assumenda, sed!
        </p>
        <Link to="/contact">
          <button className={styles.get_in_touch}>Get In touch</button>
        </Link>
      </motion.div>

      <Blob
        paths={[
          "M434,301.5Q446,353,404,382.5Q362,412,320,445Q278,478,230.5,452.5Q183,427,147.5,399.5Q112,372,70.5,338.5Q29,305,46,254.5Q63,204,93,170.5Q123,137,151.5,101.5Q180,66,229,43Q278,20,330,39Q382,58,391.5,114.5Q401,171,411.5,210.5Q422,250,434,301.5Z",
          "M448.5,295.5Q422,341,398.5,386Q375,431,324,437Q273,443,227,438Q181,433,138,410Q95,387,86.5,339.5Q78,292,62,246Q46,200,64.5,151Q83,102,127,72Q171,42,224.5,32Q278,22,313.5,64.5Q349,107,402.5,124.5Q456,142,465.5,196Q475,250,448.5,295.5Z",
        ]}
        viewBox={[0, 0, 500, 500]}
        width="40%"
        minWidth={600}
        growTime={1.3}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
        zIndex={2}
        className={styles.who_we_are_blob}
        color="#F4F5FF"
      />
    </div>
  );
};

export default WhoWeAre;
