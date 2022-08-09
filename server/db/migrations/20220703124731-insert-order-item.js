"use strict";
const { order_detail, product } = require("../models");

module.exports = {
  async up(queryInterface) {
    const orderIds = await order_detail.findAll({
      attributes: ["id"],
      raw: true,
    });
    const productIds = await product.findAll({ attributes: ["id"], raw: true });
    const data = orderIds.map(({ id }) => {
      return (
        {
          order_id: id,
          product_id:
            productIds[Math.floor(Math.random() * productIds.length) + 1].id,
          order_qty: 2,
        },
        {
          order_id: id,
          product_id:
            productIds[Math.floor(Math.random() * productIds.length) + 1].id,
          order_qty: 5,
        },
        {
          order_id: id,
          product_id:
            productIds[Math.floor(Math.random() * productIds.length) + 1].id,
          order_qty: 2,
        }
      );
    });
    await queryInterface.bulkInsert("order_item", data);
    return;
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("order_item", null, {});
  },
};
