import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (cb, loc) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async (cb) => {
    // validation logic here
    try {
      const { data } = await cb();
      setData(data);
    } catch (error) {
      setError(error.response.data ?? "Network Error.");
      if (loc) navigate(loc);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!cb) return;
    setIsPending(true);
    fetchData(cb);
  }, []);

  // could have a refetch function here to update if the use goes away

  const styling = {
    fontSize: "1rem",
    width: "fit-content",
    maxWidth: 500,
    display: "flex",
    alignItems: "center",
    margin: "auto",
    textAlign: "center",
  };

  return { data, isPending, error, styling };
};

export default useFetch;
