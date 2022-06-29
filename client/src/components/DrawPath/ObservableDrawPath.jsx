import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ObservableDrawPath = ({
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
  threshold = 0,
  thickness = 1,
  delay = 0,
  zIndex,
  rootMargin,
  className,
  position,
}) => {
  const [ref, inView] = useInView({
    ...(threshold && { threshold: threshold }),
    ...(rootMargin && { rootMargin: rootMargin }),
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
          duration: drawTime,
          bounce: 0,
          delay: delay,
        },
        opacity: { duration: 0.01 },
      },
    },
  };
  return (
    <motion.svg
      ref={ref}
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

export default ObservableDrawPath;
