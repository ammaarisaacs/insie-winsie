"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("order_detail", [
      {
        name: "00000001",
        first_name: "ammaar",
        last_name: "isaacs",
        total: 200,
        email: "isaacsammaar@gmail.com",
        cellphone: "0670213131",
        payment_id: "1",
        ship_address_id: 1,
        bill_address_id: 2,
        ship_method_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("order_detail", null, {});
  },
};
