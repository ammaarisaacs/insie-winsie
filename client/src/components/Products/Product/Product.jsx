import styles from "./product.module.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";
import { randify } from "../../../utils/costing";

const Product = ({ product, index }) => {
  const { id, name, description, price, media } = product;
  const { addToCart } = useStateContext();

  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("../checkout");
  };

  const productCardVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: index * 0.3,
        ease: "easeOut",
        duration: 2,
      },
    },
    exit: { scaleY: 0.5, opacity: 0, transition: { duration: 1 } },
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
          <img src={`http://localhost:5000/static/${media[0].file_name}`} />
          <div>
            <p>{name}</p>
            <span>{randify(price)}</span>
            {/* stock qty here */}
          </div>
        </div>
      </Link>

      <div className={styles.button_container}>
        <p>{description}</p>
        <button onClick={() => addToCart(product)}>add to cart</button>
        <button onClick={() => handleBuyNow(product)}>buy now</button>
      </div>
    </motion.article>
  );
};

export default Product;
