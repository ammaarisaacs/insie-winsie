import { fetchProducts } from "../api";

export const fetchProducts = async (searchQuery, category) => {
  try {
    const { data } = await api.fetchProducts(searchQuery, category);
    setProducts(data);
  } catch (error) {
    setNetworkError(true);
  }
};
