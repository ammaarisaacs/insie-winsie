const { product, media, category_detail } = require("../db/models");

exports.getProducts = (search, category) => {
  return product.findAll({
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
};
