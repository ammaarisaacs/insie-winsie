"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category_detail extends Model {
    static associate(models) {
      category_detail.belongsToMany(models.product, {
        through: "category_item",
        timestamps: false,
        foreignKey: "category_id",
        as: "product",
      });
    }
  }
  category_detail.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      tableName: "category_detail",
      freezeTableName: true,
      modelName: "category_detail",
    }
  );
  return category_detail;
};
