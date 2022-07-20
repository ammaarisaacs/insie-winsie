import { useEffect, useState } from "react";
import Product from "./Product/Product";
import styles from "./products.module.css";
import { motion } from "framer-motion";
import { filterIcons } from "../../constants/filterIcons";
import * as api from "../../api";

// https://dribbble.com/shots/17246781-GLASS-LIZZARD-Products

// infinite scrolling
// https://youtu.be/NZKUirTtxcg

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  // could possibly use the category type as an index when searching in database query to quicken search

  const fetchData = async (searchQuery, category) => {
    try {
      const { data } = await api.fetchProducts(searchQuery, category);
      setProducts(data);
    } catch (error) {
      setNetworkError(true);
    }
  };

  const handleFilterClick = (query) => {
    if (category.includes(query))
      return setCategory((prevCategories) =>
        prevCategories.filter((item) => item != query)
      );
    setCategory((prevCategories) => [...prevCategories, query]);
  };

  useEffect(() => {
    fetchData(searchQuery, category);
  }, [category, search]);

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

  if (networkError) return <div>Something wen't wrong</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className={styles.container}
    >
      <div className={styles.sort_section}>
        <div>
          <input
            className={styles.search_bar}
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className={styles.search_button}
            onClick={() => setSearch(!search)}
          >
            Search
          </button>
        </div>

        {filterIcons.map(({ name, query }) => (
          <motion.button
            whileHover={{ y: -5 }}
            className={styles.filter_button}
            key={name}
            onClick={() => {
              handleFilterClick(query);
            }}
          >
            <img
              className={styles.filter_icons}
              src={require(`../../assets/images/${name}`)}
            />
            <motion.div
              className={styles.filter_underline}
              initial={{ width: 0 }}
              variants={filterVariants}
              animate={category.includes(query) ? "grow" : "shrink"}
            ></motion.div>
          </motion.button>
        ))}

        <button className={styles.sort_button} type="check">
          Sort
        </button>
        <button className={styles.filter_menu}>Filters</button>
      </div>

      <motion.div layout className={styles.products_grid}>
        {products.length > 0 ? (
          products.map((product, i) => (
            <Product product={product} key={product.id} index={i} />
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            No Products
          </motion.p>
        )}
      </motion.div>

      <div className={styles.pagination}>pagination</div>
    </motion.div>
  );
};

export default Products;
