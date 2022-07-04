import React, { useState, useEffect } from "react";
import styles from "./productdetail.module.css";
import * as api from "../../api";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

// state for a seperate quantity that adds to the orderQty and defaults back to one everytime this component is rendered

// derived state might be a problem

// could pass product through props only if usehistory shows products was the page before

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { orderQty, incQty, decQty, addToCart } = useStateContext();

  const { id } = useParams();

  const fetchProduct = async (id) => {
    try {
      const { data } = await api.fetchProduct(id);
      setProduct(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);

  return (
    <div className={styles.product_detail_container}>
      {/* carousel of images here */}

      {loading ? (
        <img
          src={`http://localhost:5000/static/${product.media[0].file_name}`}
        />
      ) : (
        <p>Getting image...</p>
      )}

      <div className={styles.detail_container}>
        <h1 className={styles.product_name}>{product.name}</h1>
        <p className={styles.product_description}>{product.description}</p>
        <p className={styles.product_price}>{product.price}</p>
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
        {/* possibly reviews */}
      </div>
    </div>

    // possible carousel here for related products
  );
};

export default ProductDetail;
