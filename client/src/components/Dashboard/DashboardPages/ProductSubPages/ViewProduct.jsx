import React, { useState, useEffect } from "react";
import * as api from "../../../../api";
import styles from "../../dashboard.module.css";
import { motion } from "framer-motion";
import ProductDescription from "./ProductDescription";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className={styles.view_products_container}>
      {products.map((product, i) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileHover={{
              backgroundColor: "lightgray",
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: i * 0.1,
                duration: 1,
              },
            }}
            className={styles.product_container}
          >
            <img src={product.url} alt={product.description} />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
            <ProductDescription product={product} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ViewProduct;
