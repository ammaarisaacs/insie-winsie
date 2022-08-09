"use strict";
const { order_detail } = require("../models");

module.exports = {
  async up(queryInterface) {
    const orderIds = await order_detail.findAll({
      attributes: ["id"],
      raw: true,
    });
    const data = orderIds.map(({ id }, i) => {
      return {
        name: `pf payment id ${i}`,
        amount: 200,
        created_at: new Date(),
        updated_at: new Date(),
        order_id: id,
      };
    });

    await queryInterface.bulkInsert("payment_detail", data);
    return;
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("payment_detail", null, {});
  },
};
