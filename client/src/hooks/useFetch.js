import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [errors, setError] = useState(null);

  return [data, setData];
};

export default useFetch;
