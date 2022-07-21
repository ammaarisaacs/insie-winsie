import * as api from "../api";

export const fetchProducts = async (searchQuery, category) => {
  return api.fetchProducts(searchQuery, category);
};

export const fetchCarousel = () => {
  return api.fetchCarouselProducts();
};
