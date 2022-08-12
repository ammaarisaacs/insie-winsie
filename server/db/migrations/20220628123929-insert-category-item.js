"use strict";
const { product, category_detail } = require("../models");

module.exports = {
  async up(queryInterface) {
    const categories = await category_detail.findAll({ attributes: ["id"] });
    const ids = await product.findAll({ attributes: ["id"], raw: true });
    const data = ids.map(({ id }) => {
      return {
        product_id: id,
        category_id: Math.floor(Math.random() * categories.length) + 1,
      };
    });
    await queryInterface.bulkInsert("category_item", data);
    return;
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("category_item", null, {});
  },
};
