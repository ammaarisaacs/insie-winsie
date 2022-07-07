"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock_qty: { type: DataTypes.INTEGER, allowNull: false },
      in_carousel: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "product",
    }
  );

  product.associate = function (models) {
    product.belongsToMany(models.order_detail, {
      through: "order_item",
      foreignKey: "product_id",
      // as: "order",
      // timestamps: false,
    });
    product.belongsToMany(models.category_detail, {
      through: "category_item",
      timestamps: false,
      foreignKey: "product_id",
      // as: "category",
    });
    product.hasMany(models.media, { foreignKey: "product_id" });
  };

  return product;
};
