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
    // raw: true,
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
