import { useState, useEffect } from "react";

function useFilterSearch(cb) {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (searchQuery, category) => {
    try {
      const { data } = await cb(searchQuery, category);
      setData(data);
    } catch (error) {
      setError(error.response.data ?? "Network Error.");
    } finally {
      setIsPending(false);
    }
  };

  const handleFilter = (query) => {
    if (category.includes(query))
      return setCategory((prevCategories) =>
        prevCategories.filter((item) => item != query)
      );
    setCategory((prevCategories) => [...prevCategories, query]);
  };

  useEffect(() => {
    if (!cb) return;
    setIsPending(true);
    fetchData(searchQuery, category);
  }, [category, search]);

  const styling = {
    fontSize: "2rem",
    width: "fit-content",
    margin: "auto",
  };

  return {
    data,
    isPending,
    error,
    searchQuery,
    setSearchQuery,
    setSearch,
    category,
    handleFilter,
    styling,
  };
}

export default useFilterSearch;
