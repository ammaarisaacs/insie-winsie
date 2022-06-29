import { motion } from "framer-motion";

const DrawPath = ({
  className,
  path,
  viewBox,
  top,
  left,
  right,
  bottom,
  minWidth,
  width,
  maxWidth,
  translateX,
  translateY,
  scale,
  drawTime = 1,
  thickness = 1,
  delay = 0,
  zIndex,
  animateWhen,
  position,
}) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: animateWhen && {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "easeOut",
          duration: drawTime,
          delay: delay,
        },
        opacity: { duration: 0.01 },
      },
    },
  };
  return (
    <motion.svg
      className={className}
      viewBox={`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`}
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      style={{
        ...(top && { top: top }),
        ...(left && { left: left }),
        ...(right && { right: right }),
        ...(bottom && { bottom: bottom }),

        ...(minWidth && { minWidth: minWidth }),
        ...(width && { width: width }),
        ...(maxWidth && { maxWidth: maxWidth }),

        ...(translateX && { translateX: translateX }),
        ...(translateY && { translateY: translateY }),
        ...(scale && { scale: scale }),

        ...(zIndex && { zIndex: zIndex }),

        position: position || "absolute",
        fill: "white",
        overflow: "visible",
      }}
    >
      <motion.path
        variants={draw}
        initial="hidden"
        animate="visible"
        d={path}
        strokeWidth={`${thickness}px`}
        stroke="#000"
        fill="none"
      />
    </motion.svg>
  );
};

export default DrawPath;
