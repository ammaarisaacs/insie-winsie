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
  {
    name: "onesie.png",
    query: "rompers",
  },
  {
    name: "baby-body.png",
    query: "aprons",
  },
  {
    name: "baby-socks.png",
    query: "bibs",
  },
  {
    name: "sneakers.png",
    query: "mittens",
  },
  {
    name: "baby-hat.png",
    query: "berets",
  },
];

const Products = () => {
  // debouncing + throttling
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setSearchQuery(...filterQuery, e.target.value);
  };

  const handleFilterClick = (query) => {
    setFilterQuery(query);
  };

  // could possibly use the category type as an index when searching in database query to quicken search
  const fetchOtherData = async (searchQuery, filterQuery) => {
    try {
      const { data } = await api.fetchProducts(searchQuery, filterQuery);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (searchQuery, filterQuery) => {
    try {
      const { data } = await api.fetchProducts(searchQuery, filterQuery);
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
      <div className={styles.sort_section}>
        <input
          className={styles.search_bar}
          type="search"
          placeholder="Search"
          onChange={(e) => handleChange(e)}
        />
        {filterIcons.map(({ name, query }) => (
          <motion.button
            whileHover={{ y: -5 }}
            className={styles.filter_button}
            key={name}
            onClick={() => handleFilterClick(query)}
          >
            <img
              className={styles.filter_icons}
              src={require(`../../assets/images/${name}`)}
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
