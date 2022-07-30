"use strict";

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("order_item", [
      {
        order_id: 1,
        product_id: 1,
        order_qty: 1,
      },
      {
        order_id: 1,
        product_id: 2,
        order_qty: 1,
      },
      {
        order_id: 1,
        product_id: 3,
        order_qty: 1,
      },
      {
        order_id: 2,
        product_id: 5,
        order_qty: 2,
      },
      {
        order_id: 2,
        product_id: 2,
        order_qty: 2,
      },
      {
        order_id: 2,
        product_id: 3,
        order_qty: 2,
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("order_item", null, {});
  },
};
