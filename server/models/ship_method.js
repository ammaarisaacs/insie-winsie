"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ship_method extends Model {
    static associate(models) {
      ship_method.hasMany(models.order_detail, {
        foreignKey: "ship_method_id",
      });
    }
  }
  ship_method.init(
    {
      name: DataTypes.STRING,
      charge: DataTypes.DECIMAL(10, 2),
      city: DataTypes.STRING,
      area: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "ship_method",
      freezeTableName: true,
      modelName: "ship_method",
    }
  );
  return ship_method;
};
