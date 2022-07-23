import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./menu.module.css";

const Menu = ({ show, setShow, links, filters, handleFilter, category }) => {
  const navigate = useNavigate();

  const movePage = (url) => {
    setShow(false);
    navigate(`../${url}`);
  };

  const menuVariants = {
    initial: { clipPath: "ellipse(200% 0 at 0 0)" },
    animate: {
      clipPath: "ellipse(200% 200% at 0 0)",
      transition: { duration: 1.2 },
    },
    exit: {
      clipPath: "ellipse(200% 0% at 0 0)",
      transition: { duration: 0.7 },
    },
  };

  const menuItemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 * i },
    }),
  };

  const filterVariants = {
    grow: {
      width: "100%",
      transition: {
        duration: 0.3,
      },
    },
    shrink: {
      width: "0%",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.menu
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={
            styles[links ? "nav_menu_container" : "filter_menu_container"]
          }
        >
          {links &&
            links.map(({ url, text }, i) => {
              return (
                <motion.p
                  key={text}
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  className={styles.nav_item}
                  onClick={() => movePage(url)}
                >
                  {text}
                </motion.p>
              );
            })}

          {filters &&
            filters.map(({ name, query }, i) => (
              <motion.div
                className={styles.filter_item}
                key={name}
                onClick={() => {
                  handleFilter(query);
                }}
              >
                <motion.p
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                >
                  {query}
                </motion.p>
                <motion.div
                  variants={filterVariants}
                  initial={{ width: 0 }}
                  animate={category.includes(query) ? "grow" : "shrink"}
                  className={styles.underline}
                />
              </motion.div>
            ))}
        </motion.menu>
      )}
    </AnimatePresence>
  );
};

export default Menu;
