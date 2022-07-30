"use strict";

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("refund", [
      {
        order_item_id: 1,
        exchange_id: 2,
        reason: "just no okay",
        quantity: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_item_id: 1,
        exchange_id: 1,
        reason: "again no okay",
        quantity: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("refund", null, {});
  },
};
