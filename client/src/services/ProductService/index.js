import * as api from "../api";

// inject axios api
// base url area

// class ProductService {
//   constructor(API) {
//     this.get = API.get;
//   }
// }

export const fetchProducts = async (searchQuery, category) => {
  return api.fetchProducts(searchQuery, category);
};

export const fetchCarousel = () => {
  return api.fetchCarouselProducts();
};
