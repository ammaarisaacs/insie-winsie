"use strict";

module.exports = (sequelize, DataTypes) => {
  const category_item = sequelize.define(
    "category_item",
    {
      product_id: {
        type: DataTypes.UUID,
        // type: DataTypes.INTEGER,
        onDelete: "cascade",
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        allowNull: false,
      },
      //   stock_qty: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "category_item",
      modelName: "category_item",
      timestamps: false,
    }
  );

  return category_item;
};
