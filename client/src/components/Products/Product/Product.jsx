import styles from "./product.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";
import { randify } from "../../../utils/costing";
import { STATIC_URL } from "../../../constants";
import { Button } from "../../";

const Product = ({ product, index }) => {
  const { id, name, description, price, stock_qty, media } = product;
  const { addToCart, handleBuyNow } = useStateContext();

  const productCardVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: stock_qty < 1 ? 0.4 : 1,
      transition: {
        delay: index * 0.3,
        ease: "easeOut",
        duration: 2,
      },
    },
    exit: { scaleY: 0.7, opacity: 0, transition: { duration: 1 } },
  };

  const addToCartProps = {
    text: "add to cart",
    onClick: () => addToCart(product),
  };
  const buyNowProps = {
    text: "buy now",
    onClick: () => handleBuyNow(product),
  };

  return (
    <motion.article
      layout
      variants={productCardVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.card_container}
    >
      <Link to={`${id}`}>
        <div className={styles.info_container}>
          <img src={`${STATIC_URL}${media[0].file_name}`} />
          <div>
            <p>{name}</p>
            <span>{randify(price)}</span>
            <p>{stock_qty} left</p>
          </div>
        </div>
      </Link>

      <div className={styles.button_container}>
        <p>{description}</p>
        <Button {...addToCartProps} />
        <Button {...buyNowProps} />
      </div>
    </motion.article>
  );
};

export default Product;
