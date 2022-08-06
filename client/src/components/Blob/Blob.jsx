import { motion } from "framer-motion";

const Blob = ({
  paths,
  viewBox,
  top,
  left,
  right,
  bottom,
  minWidth,
  width,
  maxWidth,
  height,
  translateX,
  translateY,
  growTime = 1,
  morphTime = 1,
  morphAt = 0,
  scale,
  zIndex,
  animateWhen,
  color,
}) => {
  return (
    <motion.svg
      style={{
        ...(top && { top: top }),
        ...(left && { left: left }),
        ...(right && { right: right }),
        ...(bottom && { bottom: bottom }),
        ...(minWidth && { minWidth: minWidth }),
        ...(width && { width: width }),
        ...(maxWidth && { maxWidth: maxWidth }),
        ...(height && { height: height }),
        ...(translateX && { translateX: translateX }),
        ...(translateY && { translateY: translateY }),
        ...(scale && { scale: scale }),
        ...(zIndex && { zIndex: zIndex }),
        position: "absolute",
        fill: "white",
        zIndex: -1,
        overflow: "visible",
      }}
      viewBox={`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`}
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        animateWhen && {
          scale: 1,
          opacity: 1,
          transition: { duration: growTime },
        }
      }
    >
      <motion.path
        style={{ ...(color && { fill: color }) }}
        initial={{ d: paths[0] }}
        animate={
          animateWhen && {
            d: paths[1],
            transition: {
              delay: morphAt,
              type: "easeOut",
              duration: morphTime,
            },
          }
        }
      />
    </motion.svg>
  );
};

export default Blob;
