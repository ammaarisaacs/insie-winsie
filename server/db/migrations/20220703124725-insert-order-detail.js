"use strict";
const uuidv4 = require("../../lib/uuid");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("order_detail", [
      {
        id: uuidv4(),
        order_number: 1,
        first_name: "ammaar",
        last_name: "isaacs",
        total: 200,
        email: "isaacsammaar@gmail.com",
        cellphone: "0670213131",
        ship_address_id: 1,
        bill_address_id: 2,
        ship_method_id: 1,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        order_number: 2,
        first_name: "ereshia",
        last_name: "benjamin",
        total: 400,
        email: "ereshiabenjamin@gmail.com",
        cellphone: "0824583202",
        ship_address_id: 2,
        bill_address_id: 2,
        ship_method_id: 1,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("order_detail", null, {});
  },
};
