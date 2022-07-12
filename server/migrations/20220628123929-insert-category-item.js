"use strict";

module.exports = {
  async up(queryInterface) {
    let data = [];
    let numberOfProducts = 25;
    let numberOfCategories = 10;

    for (let i = 0; i < numberOfProducts; i++) {
      data.push({
        product_id: i + 1,
        category_id: Math.floor(Math.random() * numberOfCategories) + 1,
      });
    }

    return await queryInterface.bulkInsert("category_item", data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("category_item", null, {});
  },
};
