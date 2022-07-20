import React, { useState } from "react";
import styles from "./updateproduct.module.css";
import * as api from "../../../../services/api";

const UpdateProduct = () => {
  const [updatedProduct, setupdatedProduct] = useState();

  const updateProduct = async (id) => {
    try {
      const { data } = await api.updateProduct(id, updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>UpdateProduct</div>;
};

export default UpdateProduct;
