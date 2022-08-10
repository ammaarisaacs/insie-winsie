import { useState } from "react";
import styles from "./faqs.module.css";
import { Blob } from "../../../components";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Faqs = ({ faq, i }) => {
  const [start, setStart] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const className = "faq_container" + i;

  return (
    <div className={styles.faqs_container}>
      <motion.article
        className={styles[className]}
        ref={ref}
        key={faq.question + i}
        initial={{
          opacity: 0,
          x: i % 2 ? "-50%" : "50%",
          ...(i % 2
            ? { borderTopRightRadius: "0px" }
            : { borderTopLeftRadius: "0px" }),
        }}
        animate={
          inView && {
            opacity: 1,
            x: "0%",
            ...(i % 2
              ? { borderTopRightRadius: "300px" }
              : { borderTopLeftRadius: "300px" }),
            transition: { duration: 1, type: "tween", ease: "easeOut" },
          }
        }
        exit={{
          opacity: 0,
          x: i % 2 ? "-50%" : "50%",
          transition: { duration: 1, type: "tween", ease: "easeOut" },
        }}
        onAnimationComplete={() => setStart(true)}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          animate={start && { opacity: 1, transition: { duration: 1 } }}
        >
          {faq.question}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={start && { opacity: 1, transition: { duration: 1 } }}
          className={styles.faq_paragraph_container}
        >
          {i == 0
            ? faq.answer.areas.map((area) => {
                return (
                  <span key={area} className={styles.area}>
                    {area}
                  </span>
                );
              })
            : faq.answer}
        </motion.p>
      </motion.article>

      <Blob
        paths={[
          "M444.5,289Q398,328,380.5,370.5Q363,413,317,419Q271,425,216.5,453.5Q162,482,119.5,443Q77,404,69.5,350Q62,296,75,253Q88,210,89.5,159.5Q91,109,136.5,90Q182,71,227.5,68Q273,65,317,77Q361,89,398.5,120.5Q436,152,463.5,201Q491,250,444.5,289Z",
          "M435,305.5Q461,361,418.5,397Q376,433,326,448.5Q276,464,235.5,430Q195,396,146,391Q97,386,61,345.5Q25,305,60.5,258.5Q96,212,101.5,168Q107,124,142,91Q177,58,223,74Q269,90,313,92.5Q357,95,406.5,118.5Q456,142,432.5,196Q409,250,435,305.5Z",
        ]}
        viewBox={[0, 0, 500, 500]}
        top={10}
        left={0}
        width="40%"
        translateX={-200}
        threshold={0.2}
        growTime={1.2}
        morphAt={0.3}
        morphTime={1}
      />
    </div>
  );
};

export default Faqs;
