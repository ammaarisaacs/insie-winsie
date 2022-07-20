import { useState, useEffect, useRef } from "react";
import styles from "./productdetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import { motion, transform } from "framer-motion";
import * as api from "../../api";

// state for a seperate quantity that adds to the orderQty and defaults back to one everytime this component is rendered
// derived state might be a problem
// could pass product through props only if usehistory shows products was the page before

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState(0);

  const { orderQty, incQty, decQty, addToCart } = useStateContext();

  const ref = useRef();

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async (id) => {
    try {
      const { data } = await api.fetchProduct(id);
      setProduct(data);
    } catch (error) {
      navigate("*");
    }
  };

  const slideLeft = () => {
    if (x == 0) return;
    setX((prevX) => prevX + 50);
  };

  const slideRight = () => {
    if (x == (100 / product.media.length) * (1 - product.media.length)) return;
    setX((prevX) => prevX - 50);
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);

  useEffect(() => {
    if (Object.keys(product).length > 0) setLoading(true);
  }, [product]);

  // useEffect(() => {
  //   if (loading && ref.current) {
  //     console.log(ref.current.scrollWidth);
  //   }
  //   // setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  // }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.product_detail_container}
    >
      {loading ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <motion.p whileHover={{ scale: 1.1 }} onClick={slideLeft}>
              left
            </motion.p>
            <div className={styles.product_image_container}>
              <div
                ref={ref}
                style={{
                  transform: `translateX(${x}%)`,
                  transition: "transform 1s",
                  width: `${100 * product.media.length}%`,
                }}
                className={styles.image_inner_container}
              >
                {product.media.map((img) => {
                  return (
                    <img
                      className={styles.product_image}
                      src={`http://localhost:5000/static/${img.file_name}`}
                      style={{ width: `${100 / product.media.length}%` }}
                      alt={img.alt_text}
                      key={img.id}
                    />
                  );
                })}
              </div>
            </div>
            <motion.p whileHover={{ scale: 1.1 }} onClick={slideRight}>
              right
            </motion.p>
          </div>
          {/* <img
            src={`http://localhost:5000/static/${product.media[0].file_name}`}
          /> */}
          <div className={styles.detail_container}>
            <h1 className={styles.product_name}>{product.name}</h1>
            <p className={styles.product_description}>{product.description}</p>
            <p className={styles.product_price}>{`R ${product.price.toFixed(
              2
            )}`}</p>
            <p className={styles.product_stock}>In Stock: {product.quantity}</p>
            <div className={styles.quantity_container}>
              <button className={styles.decrement_button} onClick={decQty}>
                -
              </button>

              <div className={styles.quantity}>{orderQty}</div>

              <button
                className={styles.increment_button}
                onClick={() => incQty(product.quantity)}
              >
                +
              </button>
            </div>
            <button
              className={styles.add_to_cart_button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button className={styles.buy_now_button}>Buy Now</button>
          </div>
        </>
      ) : (
        <p>Fetching Product...</p>
      )}
    </motion.div>
  );
};

export default ProductDetail;
