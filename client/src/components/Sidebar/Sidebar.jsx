import styles from "./sidebar.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const variants = {
    initial: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <div className={styles.sidebar_container}>
      <motion.h3
        custom={1}
        variants={variants}
        animate="visible"
        initial="initial"
      >
        Admin Panel
      </motion.h3>
      <motion.h4
        custom={2}
        variants={variants}
        animate="visible"
        initial="initial"
      >
        Ecommerce
      </motion.h4>
      <ul>
        <Link to="orders">
          <motion.li
            whileHover={{ x: 10 }}
            custom={3}
            variants={variants}
            animate="visible"
            initial="initial"
          >
            Orders
          </motion.li>
        </Link>
        <Link to="products">
          <motion.li
            whileHover={{ x: 10 }}
            custom={4}
            variants={variants}
            animate="visible"
            initial="initial"
          >
            Products
          </motion.li>
        </Link>
        <Link to="customers">
          <motion.li
            custom={5}
            whileHover={{ x: 10 }}
            variants={variants}
            animate="visible"
            initial="initial"
          >
            Customers
          </motion.li>
        </Link>
      </ul>
      <motion.h4
        custom={6}
        variants={variants}
        animate="visible"
        initial="initial"
      >
        Theme
      </motion.h4>
      <ul>
        <motion.li
          custom={7}
          variants={variants}
          animate="visible"
          whileHover={{ x: 10 }}
          initial="initial"
        >
          Color-Picker
        </motion.li>
        <motion.li
          custom={8}
          variants={variants}
          animate="visible"
          whileHover={{ x: 10 }}
          initial="initial"
        >
          Editor
        </motion.li>
      </ul>
    </div>
  );
};

export default Sidebar;
