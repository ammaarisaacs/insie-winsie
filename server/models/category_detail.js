"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category_detail extends Model {
    static associate(models) {
      category_detail.belongsToMany(models.product, {
        // through: models.category_item,
        through: models.category_item,
        timestamps: false,
        // through: "category_item",
        // as: "category_detail",
      });
    }
  }
  category_detail.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      // tableName: "category_detail",
      modelName: "category_detail",
    }
  );
  return category_detail;
};
