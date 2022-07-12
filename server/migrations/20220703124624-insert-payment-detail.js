"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("payment_detail", [
      {
        token: "token123",
        amount: 200,
        provider: "fnb",
        // status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        token: "somethingelse",
        amount: 200,
        provider: "standardBank",
        // status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("payment_detail", null, {});
  },
};
