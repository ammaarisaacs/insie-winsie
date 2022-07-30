"use strict";

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("order_detail", [
      {
        order_number: 1,
        first_name: "ammaar",
        last_name: "isaacs",
        total: 200,
        email: "isaacsammaar@gmail.com",
        cellphone: "0670213131",
        // payment_id: 1,
        ship_address_id: 1,
        bill_address_id: 2,
        ship_method_id: 1,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_number: 2,
        first_name: "ereshia",
        last_name: "benjamin",
        total: 400,
        email: "ereshiabenjamin@gmail.com",
        cellphone: "0824583202",
        // payment_id: 2,
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
