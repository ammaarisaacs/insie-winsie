import { useState, useEffect } from "react";

function useFilterSearch(cb, options = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState("");
  return {};
}

export default useFilterSearch;
