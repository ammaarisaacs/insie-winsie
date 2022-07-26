import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./nocart.module.css";
import { Link } from "react-router-dom";

const NoCart = () => {
  return (
    <motion.main
      key="nocart"
      className={styles.no_cart_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -50 }}
      transition={{ duration: 1 }}
    >
      <motion.p
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        exit={{ y: -30 }}
        transition={{ duration: 1 }}
      >
        No products in cart
      </motion.p>
      <Link to="/products">
        <motion.button
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          exit={{ y: -30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.continue_shopping}
        >
          Continue Shopping
        </motion.button>
      </Link>
    </motion.main>
  );
};

export default NoCart;
