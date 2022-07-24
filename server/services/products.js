const { product, media, category_detail } = require("../models");

exports.getProducts = (search, category) => {
  const products = product.findAll({
    attributes: ["id", "name", "description", "price", "stock_qty"],
    where: search ? { name: search } : {},
    include: [
      { model: media, attributes: ["file_name", "alt_text"] },
      {
        model: category_detail,
        attributes: [],
        where: category ? { name: category } : {},
      },
    ],
  });

  return products;
};
