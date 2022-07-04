"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("order_item", [
      {
        order_detail_id: 1,
        product_id: 1,
        order_qty: 1,
      },
      // {
      //   order_detail_id: 1,
      //   product_id: 2,
      //   order_qty: 1,
      // },
      // {
      //   order_detail_id: 1,
      //   product_id: 3,
      //   order_qty: 1,
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("order_item", null, {});
  },
};
