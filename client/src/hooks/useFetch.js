import { useState, useEffect } from "react";
// import show toast
// import react router

// could create a config objec that gets passed into useFetch
// will include:
// cb
// showToast
// redirect

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const styling = {
    fontSize: "2rem",
    width: "fit-content",
    margin: "auto",
  };

  // const { showToast, redirect } = options;

  const fetchData = async (cb) => {
    try {
      const { data } = await cb();
      setData(data);
    } catch (error) {
      console.log(error);
      setError(error.response.error);
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

  return { data, isPending, error, styling };
};

export default useFetch;
