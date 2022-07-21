import { useState, useEffect } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (cb) => {
    try {
      const { data } = await cb();
      setData(data);
    } catch (error) {
      setError(error.response.data ?? "Network Error.");
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
    fontSize: "2rem",
    width: "fit-content",
    margin: "auto",
  };

  return { data, isPending, error, styling };
};

export default useFetch;
