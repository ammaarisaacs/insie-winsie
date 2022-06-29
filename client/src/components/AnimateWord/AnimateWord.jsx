import { motion } from "framer-motion";

const AnimateWord = ({ word, fontSize, className }) => {
  return word.map((letter, i) => {
    return letter === "space" ? (
      <span className={className} style={{ marginLeft: "1.25em" }}>
        &nbsp;
      </span>
    ) : (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: i * 0.1 },
        }}
        style={{
          fontSize: fontSize,
          margin: "0 auto",
          display: "inline-block",
        }}
      >
        {letter}
      </motion.span>
    );
  });
};

export default AnimateWord;
