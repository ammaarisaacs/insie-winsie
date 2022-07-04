"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_carousel: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });

    await queryInterface.createTable("media", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alt_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
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

    await queryInterface.createTable("category_detail", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
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

    // await queryInterface.createTable("category_item", {
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.INTEGER,
    // },
    // product_id: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    // references: {
    //   model: "product",
    //   key: "id",
    // },
    // },
    // category_id: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    // references: {
    //   model: "product",
    //   key: "id",
    // },
    // },
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("category_item");
    await queryInterface.dropTable("category_detail");
    await queryInterface.dropTable("media");
    await queryInterface.dropTable("product");
  },
};
