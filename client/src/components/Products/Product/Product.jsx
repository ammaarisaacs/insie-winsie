import styles from "./product.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";

const Product = ({ product, index }) => {
  const { addToCart } = useStateContext();

  return (
    <div className={styles.main_container}>
      <Link to={`${product.id}`} key={product.id}>
        <motion.div
          className={styles.product_container}
          key={product.id}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: index * 0.2,
              ease: "easeOut",
              duration: 1,
            },
          }}
        >
          <img src={product.url} className={styles.product_image} />
          <div className={styles.product_info_container}>
            <p className={styles.product_name}>{product.name}</p>
            <span className={styles.product_price}>{product.price}</span>
          </div>
        </motion.div>
      </Link>

      <motion.div className={styles.button_container}>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>add to cart</button>
        <Link to="/checkout">
          <button>buy now</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Product;
