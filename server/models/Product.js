"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.hasMany(models.media, { foreignKey: "product_id" });

      product.belongsToMany(models.category_detail, {
        through: "category_item",
        timestamps: false,
        foreignKey: "product_id",
        as: "category",
      });

      product.belongsToMany(models.order_detail, {
        through: models.order_item,
      });

      // product.hasMany(models.order_item, {
      //   foreignKey: "product_id",
      // });

      // product.belongsToMany(models.order_detail, {
      //   through: models.order_item,
      //   timestamps: false,
      //   foreignKey: "product_id",
      //   // as: "order",
      // });
    }
  }
  product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock_qty: { type: DataTypes.INTEGER, allowNull: false },
      in_carousel: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      tableName: "product",
      freezeTableName: true,
      modelName: "product",
    }
  );
  return product;
};
