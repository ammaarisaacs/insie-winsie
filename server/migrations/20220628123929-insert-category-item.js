"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    let count = 25;
    let numberOfProducts = 25;
    let numberOfCategories = 10;

    for (let i = 0; i < count; i++) {
      data.push({
        product_id: Math.floor(Math.random() * numberOfProducts) + 1,
        category_id: Math.floor(Math.random() * numberOfCategories) + 1,
      });
    }

    return await queryInterface.bulkInsert("category_item", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("category_item", null, {});
  },
};
