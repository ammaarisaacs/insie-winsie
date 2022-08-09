"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment_detail", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      // provider: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      order_id: {
        type: Sequelize.UUID,
        // type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "order_detail",
          key: "id",
        },
      },
      // status: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("payment_detail");
  },
};
