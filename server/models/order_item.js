"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    static associate(models) {
      // order_item.belongsTo(models.product, {
      //   foreignKey: "product_id",
      // });
      // order_item.belongsTo(models.order_detail, {
      //   foreignKey: "order_id",
      // });
    }
  }
  order_item.init(
    {
      // order_id: DataTypes.INTEGER,
      // product_id: DataTypes.INTEGER,
      order_qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      tableName: "order_item",
      modelName: "order_item",
      freezeTableName: true,
    }
  );
  return order_item;
};
