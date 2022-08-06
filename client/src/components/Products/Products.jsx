import { useState } from "react";
import Product from "./Product/Product";
import styles from "./products.module.css";
import { motion } from "framer-motion";
import useFilterSearch from "../../hooks/useFilterSearch";
import { fetchProducts } from "../../services/api";
import { filterIcons } from "../../data/icons";
import { Menu, Button } from "../";

// https://dribbble.com/shots/17246781-GLASS-LIZZARD-Products
// infinite scrolling
// https://youtu.be/NZKUirTtxcg

const Products = () => {
  const [showMenu, setShowMenu] = useState(false);

  const {
    data,
    isPending,
    error,
    handleFilter,
    category,
    searchQuery,
    search,
    setSearch,
    setSearchQuery,
    handleClear,
    styling,
  } = useFilterSearch(fetchProducts);

  const menuProps = {
    show: showMenu,
    filters: filterIcons,
    handleFilter: handleFilter,
    category: category,
  };

  const searchProps = {
    text: "search",
    onClick: () => setSearch(!search),
  };

  // const sortProps = {
  //   text: "sort",
  // onClick: () => handleSort(sortQuery),
  // };

  const filterProps = {
    text: "filter",
    media: true,
    onClick: () => setShowMenu(!showMenu),
  };

  const clearProps = {
    text: "clear",
    onClick: handleClear,
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className={styles.container}
    >
      <div className={styles.sort_section}>
        <div className={styles.search__container}>
          <input
            className={styles.search_bar}
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button {...searchProps} />
        </div>

        {filterIcons.map(({ name, query }) => (
          <motion.button
            whileHover={{ y: -5 }}
            className={styles.filter_button}
            key={name}
            onClick={() => {
              handleFilter(query);
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
            />
          </motion.button>
        ))}

        {/* make call to backend to sort the data then send back  */}
        {/* <Button {...sortProps} /> */}
        <Button {...filterProps} />
        <Button {...clearProps} />
        <Menu {...menuProps} />
      </div>

      <motion.div layout className={styles.products_grid}>
        {data.length > 0 ? (
          data.map((product, i) => (
            <Product product={product} key={product.id} />
          ))
        ) : isPending ? (
          <main style={styling}>Loading...</main>
        ) : error ? (
          <main style={styling}>{error}</main>
        ) : (
          <motion.main
            style={styling}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            No Products
          </motion.main>
        )}
      </motion.div>

      <div className={styles.pagination}>pagination</div>
    </motion.main>
  );
};

export default Products;
