"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refund", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      order_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "order_item",
          key: "id",
        },
      },
      exchange_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("refund");
  },
};
