import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import useFetch from "../../hooks/useFetch";
import { fetchProduct } from "../../services/api";
import styles from "./productdetail.module.css";
import { motion } from "framer-motion";
import { STATIC_URL } from "../../constants";
import { randify } from "../../utils/costing";

// state for a seperate quantity that adds to the orderQty and defaults back to one everytime this component is rendered
// derived state might be a problem
// could pass product through props only if usehistory shows products was the page before

// https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed

const ProductDetailPage = () => {
  const ref = useRef();
  const [x, setX] = useState(0);
  const { id } = useParams();
  const wrapper = () => fetchProduct(id);
  const { data, isPending, error, styling } = useFetch(wrapper, "*");
  const { orderQty, incQty, decQty, addToCart, handleBuyNow } =
    useStateContext();

  const slideLeft = () => {
    if (x == 0) return;
    setX((prevX) => prevX + 50);
  };

  const slideRight = () => {
    if (x == (100 / data.media.length) * (1 - data.media.length)) return;
    setX((prevX) => prevX - 50);
  };

  if (isPending) return <main style={styling}>Loading...</main>;
  if (error) return <main style={styling}>{error}</main>;

  const { name, description, price, stock_qty, media } = data ?? {};

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.product_detail_container}
    >
      {data && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <motion.p whileHover={{ scale: 1.1 }} onClick={slideLeft}>
              &#60;
            </motion.p>
            <div className={styles.product_image_container}>
              <div
                ref={ref}
                style={{
                  transform: `translateX(${x}%)`,
                  transition: "transform 1s",
                  width: `${100 * media.length}%`,
                }}
                className={styles.image_inner_container}
              >
                {media.map((img) => {
                  const { file_name, alt_text, id } = img;
                  return (
                    <img
                      className={styles.product_image}
                      src={`${STATIC_URL}${file_name}`}
                      style={{ width: `${100 / media.length}%` }}
                      alt={alt_text}
                      key={id}
                    />
                  );
                })}
              </div>
            </div>
            <motion.p whileHover={{ scale: 1.1 }} onClick={slideRight}>
              &#62;
            </motion.p>
          </div>
          <div className={styles.detail_container}>
            <h1 className={styles.product_name}>{name}</h1>
            <p className={styles.product_description}>{description}</p>
            <p className={styles.product_price}>{randify(price)}</p>
            <p className={styles.product_stock}>In Stock: {stock_qty} left</p>
            <div className={styles.quantity_container}>
              <button className={styles.decrement_button} onClick={decQty}>
                -
              </button>
              <span className={styles.quantity}>{orderQty}</span>
              <button
                className={styles.increment_button}
                onClick={() => incQty(stock_qty)}
              >
                +
              </button>
            </div>
            <button
              className={styles.add_to_cart_button}
              onClick={() => addToCart(data)}
            >
              Add to Cart
            </button>
            <button
              className={styles.buy_now_button}
              onClick={() => handleBuyNow(data)}
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </motion.main>
  );
};

export default ProductDetailPage;
