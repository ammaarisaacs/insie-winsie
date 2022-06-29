"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      // product.hasMany(models.media, { foreignKey: "product_id", as: "media" });
      product.hasMany(models.media, { foreignKey: "product_id" });

      product.belongsToMany(models.category_detail, {
        through: models.category_item,
        timestamps: false,
        // through: "category_item",
        // as: "product",
      });
    }
  }
  product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock_qty: { type: DataTypes.INTEGER, allowNull: false },
      // category_id: { type: DataTypes.INTEGER, allowNull: false },
      in_carousel: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      // tableName: "product",
      modelName: "product",
    }
  );
  return product;
};
