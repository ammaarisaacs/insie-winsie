"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("category_item", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: "cascade",
        references: {
          model: "product",
          key: "id",
        },
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: "cascade",
        references: {
          model: "product",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("category_item");
  },
};
