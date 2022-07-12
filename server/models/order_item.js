"use strict";

module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define(
    "order_item",
    {
      order_id: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        allowNull: false,
      },
      order_qty: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "order_item",
      modelName: "order_item",
      timestamps: false,
    }
  );

  return order_item;
};
