"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_detail", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
      },
      order_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ship_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "address",
          key: "id",
        },
      },
      bill_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "address",
          key: "id",
        },
      },
      ship_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ship_method",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
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
    await queryInterface.dropTable("order_detail", null, {});
  },
};
