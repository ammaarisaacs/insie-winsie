"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_item", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      // order_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "order_detail",
      //     key: "id",
      //   },
      // },
      // product_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "product",
      //     key: "id",
      //   },
      // },
      order_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("order_item");
  },
};
