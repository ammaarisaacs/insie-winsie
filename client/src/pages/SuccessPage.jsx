import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import * as api from "../services/api";

const SuccessPage = () => {
  const [orderSummary, setOrderSummary] = useState({});
  const { clearCart } = useStateContext();

  const { id } = useParams();

  const fetchData = async (id) => {
    try {
      const { data } = await api.fetchOrderData(id);
      console.log(data);
      setOrderSummary(data);
    } catch (error) {
      console.log(error);
      // redirect to error page
    }
  };

  useEffect(() => {
    clearCart();
    fetchData(id);
  }, []);

  useEffect(() => {
    if (Object.keys(orderSummary).length < 1) {
    }
    console.log(orderSummary);
  }, [orderSummary]);

  return (
    <div>
      <header>Payment Successful</header>
    </div>
  );
};

export default SuccessPage;
