import styles from "./ourstory.module.css";
import { Blob, ObservableDrawPath } from "../../../components";
import { babyPath, ourStoryPaths } from "../../../data/paths";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const OurStory = () => {
  const [ref, inView] = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: inView && {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "easeOut",
          duration: 6,
          delay: 0.2,
        },
        opacity: { duration: 2 },
      },
    },
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, duration: 1 }}
      ref={ref}
      className={styles.our_story_container}
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={inView && { opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className={styles.our_story_heading}
      >
        Our Story
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView && { opacity: 1, y: 0, transition: { duration: 2 } }}
        className={styles.our_story_paragraph}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae deserunt
        totam aut, ipsam officia, quas, similique exercitationem unde molestiae
        ipsum maiores fugiat non voluptatum veniam? Delectus nesciunt animi
        nobis ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quod maxime neque consectetur enim tempore obcaecati soluta doloremque
        aut, cum dolore. Incidunt tenetur optio minima quod delectus amet, ut
        voluptatum quaerat.
      </motion.p>
      <svg
        className={styles.baby_svg}
        viewBox="0 0 925 427"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={draw}
          initial="hidden"
          animate="visible"
          d={babyPath}
          stroke="black"
        />
      </svg>
      <Blob
        paths={ourStoryPaths}
        viewBox={[0, 0, 500, 500]}
        bottom={1}
        left={-100}
        width="40%"
        minWidth={500}
        threshold={1}
        growTime={1.2}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
        color="#e8fde9"
      />
      <ObservableDrawPath
        path="M348 475.5C269 381.5 167.5 412.5 128.5 401C89.5 389.5 62.5 409 36.5 344.5C10.5 280 -18.5 295.5 17 229.5C52.5 163.5 34.5 188 104 147.5C173.5 107 196 73 238 31C271.6 -2.6 325.333 -1.33333 348 3.5"
        viewBox={[0, 0, 349, 476]}
        drawTime={1.5}
        thickness={1}
        animateWhen={inView}
        threshold={0.5}
        className={styles.svg_right}
      />
    </motion.div>
  );
};

export default OurStory;
