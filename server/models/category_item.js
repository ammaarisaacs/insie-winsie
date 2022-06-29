"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category_item extends Model {
    static associate(models) {
      category_item.belongsTo(models.product, {
        foreignKey: "product_id",
        // as: "product",
      });
      category_item.belongsTo(models.category_detail, {
        foreignKey: "category_id",
        // as: "product",
      });
    }
  }
  category_item.init(
    {
      product_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "category_item",
      modelName: "category_item",
    }
  );
  return category_item;
};
