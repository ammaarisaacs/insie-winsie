import { useState, useEffect } from "react";

function useFilterSearch(cb) {
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
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

  const handleClear = () => {
    setCategory("");
    setSearchQuery("");
    setSearch(!search);
  };

  useEffect(() => {
    if (!cb) return;
    setIsPending(true);
    fetchData(searchQuery, category);
  }, [category, search]);

  const styling = {
    fontSize: "1rem",
    width: "fit-content",
    maxWidth: 500,
    display: "flex",
    alignItems: "center",
    margin: "auto",
    textAlign: "center",
  };

  return {
    data,
    isPending,
    error,
    searchQuery,
    setSearchQuery,
    setSearch,
    category,
    searchQuery,
    handleFilter,
    handleClear,
    styling,
  };
}

export default useFilterSearch;
