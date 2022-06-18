import styles from "./ourstory.module.css";
import { motion } from "framer-motion";
import { Blob } from "..";
import { useInView } from "react-intersection-observer";
import { BabyPath, ourStoryPaths } from "../../constants/paths";

const Baby = () => {
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
          duration: 8,
          delay: 0.2,
        },
        opacity: { duration: 2 },
      },
    },
  };
  return (
    <div ref={ref} className={styles.our_story_container}>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={inView && { opacity: 1, y: 0, transition: { duration: 2 } }}
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
          d={BabyPath}
          stroke="black"
        />
      </svg>
      <Blob
        paths={ourStoryPaths}
        viewBox={[0, 0, 500, 500]}
        bottom={1}
        left={-100}
        width="40%"
        minWidth={600}
        threshold={1}
        growTime={1.2}
        morphAt={0.3}
        morphTime={1}
        animateWhen={inView}
      />
    </div>
  );
};

export default Baby;
