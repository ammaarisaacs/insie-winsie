import styles from "./product.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";

const Product = ({ product, index }) => {
  const { addToCart, showToast } = useStateContext();

  const handleBuyNow = (e) => {};

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: index * 0.3,
          ease: "easeOut",
          duration: 2,
        },
      }}
      exit={{ scaleY: 0.5, opacity: 0, transition: { duration: 1 } }}
      layout
      className={styles.main_container}
    >
      <Link to={`${product.id}`} key={product.id}>
        <div className={styles.product_container} key={product.id}>
          <img
            src={`http://localhost:5000/static/${product.media[0].file_name}`}
            className={styles.product_image}
          />
          <div className={styles.product_info_container}>
            <p className={styles.product_name}>{product.name}</p>
            <span className={styles.product_price}>{`R ${product.price.toFixed(
              2
            )}`}</span>
          </div>
        </div>
      </Link>

      <div className={styles.button_container}>
        <p>{product.description}</p>
        <button
          onClick={() => {
            addToCart(product);
            showToast("Added to cart successfully!");
          }}
        >
          add to cart
        </button>
        <Link to="/checkout">
          <button onClick={(e) => handleBuyNow(e)}>buy now</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Product;
