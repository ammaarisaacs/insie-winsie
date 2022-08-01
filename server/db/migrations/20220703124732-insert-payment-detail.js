"use strict";

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("payment_detail", [
      {
        name: "token123",
        amount: 200,
        // provider: "fnb",
        // status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
        order_id: 1,
      },
      {
        name: "somethingelse",
        amount: 200,
        // provider: "standardBank",
        // status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
        order_id: 2,
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("payment_detail", null, {});
  },
};
