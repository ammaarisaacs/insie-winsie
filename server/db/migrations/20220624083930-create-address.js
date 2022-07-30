"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("address", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      province: {
        type: Sequelize.CHAR,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("address");
  },
};
