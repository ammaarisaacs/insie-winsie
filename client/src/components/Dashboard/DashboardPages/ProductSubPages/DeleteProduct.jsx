import Reac, { useState } from "react";
import styles from "./deleteproduct.module.css";
import * as api from "../../../../api";

const DeleteProduct = () => {
  const [deletedProduct, setDeletedProduct] = useState();
  const deleteProduct = async (id) => {
    try {
      const { data } = await api.deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>DeleteProduct</div>;
};

export default DeleteProduct;
