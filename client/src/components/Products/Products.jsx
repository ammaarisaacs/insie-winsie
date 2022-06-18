import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import styles from "./products.module.css";
import * as api from "../../api";
import { motion } from "framer-motion";

// possible styling for hover over product
// https://dribbble.com/shots/17246781-GLASS-LIZZARD-Products

// infinite scrolling
// https://youtu.be/NZKUirTtxcg

const filterIcons = [
  "onesie.png",
  "baby-body.png",
  "baby-socks.png",
  "sneakers.png",
  "baby-hat.png",
  "onesie.png",
  "onesie.png",
  "baby-body.png",
];

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // need handlers for filter section to create new filter list from fetched products and displat that

  return (
    <div className={styles.container}>
      {/* <div className={styles.banner}>BANNER HERE</div> */}

      <div className={styles.sort_section}>
        <input
          className={styles.search_bar}
          type="search"
          placeholder="Search"
        />
        {filterIcons.map((url) => (
          <motion.button
            whileHover={{ y: -5 }}
            className={styles.filter_button}
            key={url}
          >
            <img
              className={styles.filter_icons}
              src={require(`../../assets/images/${url}`)}
              key={url}
            />
          </motion.button>
        ))}

        <button className={styles.sort_button} type="check">
          Sort
        </button>
        <button className={styles.filter_menu}>Filters</button>
      </div>

      <div className={styles.products_grid}>
        {products.map((product, i) => (
          <Product product={product} key={product.id} index={i} />
        ))}
      </div>

      <div className={styles.pagination}>pagination</div>
    </div>
  );
};

export default Products;
