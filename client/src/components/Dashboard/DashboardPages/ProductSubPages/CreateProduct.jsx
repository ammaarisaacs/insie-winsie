import React, { useState } from "react";
import styles from "./createproduct.module.css";
import * as api from "../../../../services/api";
import { motion } from "framer-motion";
import { Blob } from "../../../";

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    url: "",
    stockQty: "",
  });

  const handleChange = (e) =>
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(newProduct).includes("")) return;
    try {
      const { data } = await api.createProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const variants = {
    initial: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 1 },
    }),
  };

  return (
    <>
      <h3 style={{ fontWeight: 100 }}>Create a Product</h3>
      <div className={styles.create_product_container}>
        <form action="POST" onSubmit={handleSubmit}>
          <motion.input
            onChange={(e) => handleChange(e)}
            placeholder="Product Name"
            required
            type="text"
            name="name"
            value={newProduct.name}
            variants={variants}
            initial="initial"
            animate="visible"
            custom={1}
          />
          <motion.input
            onChange={(e) => handleChange(e)}
            placeholder="Product Image"
            required
            type="file"
            name="url"
            value={newProduct.url}
            variants={variants}
            initial="initial"
            animate="visible"
            custom={2}
          />
          <motion.textarea
            onChange={(e) => handleChange(e)}
            placeholder="Product Description"
            required
            type="text"
            name="description"
            rows={4}
            value={newProduct.description}
            variants={variants}
            initial="initial"
            animate="visible"
            custom={3}
          />
          <motion.input
            onChange={(e) => handleChange(e)}
            placeholder="Product Price"
            required
            type="number"
            name="price"
            value={newProduct.price}
            variants={variants}
            initial="initial"
            animate="visible"
            custom={4}
          />
          <motion.input
            onChange={(e) => handleChange(e)}
            placeholder="Stock Quantity"
            required
            type="number"
            name="stockQty"
            value={newProduct.stockQty}
            variants={variants}
            initial="initial"
            animate="visible"
            custom={5}
          />
          <motion.button
            variants={variants}
            required
            initial="initial"
            animate="visible"
            custom={6}
            type="submit"
          >
            Add
          </motion.button>
        </form>
        {/* <div className={styles.product_preview}></div> */}
      </div>
    </>
  );
};

export default CreateProduct;
