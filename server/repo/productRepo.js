const { product, media, category_detail } = require("../db/models");

exports.getProductsBySearchAndFilter = (search, category) => {
  return product.findAll({
    attributes: ["id", "name", "description", "price", "stock_qty"],
    where: search,
    include: [
      { model: media, attributes: ["file_name", "alt_text"] },
      {
        model: category_detail,
        attributes: [],
        where: category,
      },
    ],
  });
};

exports.getProductById = (id) => {
  return product.findOne({
    include: "media",
    where: { id },
  });
};

exports.getCarouselProducts = () => {
  return product.findAll({
    include: "media",
    where: { in_carousel: true },
  });
};

exports.createProduct = (name, description, price, stock_qty, in_carousel) => {
  return product.create(name, description, price, stock_qty, in_carousel);
};

exports.findProduct = (name, description, price, stock_qty, in_carousel) => {
  return product.findAll({
    where: { name, description, price, stock_qty, in_carousel },
  });
};

exports.deleteProduct = (id) => {
  return product.destroy({ where: { id } });
};
