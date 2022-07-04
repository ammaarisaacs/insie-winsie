"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    static associate(models) {
      address.hasMany(models.order_detail, {
        foreignKey: "ship_address_id",
        as: "shipAddressId",
      });
      address.hasMany(models.order_detail, {
        foreignKey: "bill_address_id",
        as: "billAddressId",
      });
    }
  }
  address.init(
    {
      street: DataTypes.STRING,
      area: DataTypes.STRING,
      city: DataTypes.STRING,
      zipcode: DataTypes.CHAR,
      province: DataTypes.CHAR,
    },
    {
      sequelize,
      tableName: "address",
      freezeTableName: true,
      modelName: "address",
    }
  );
  return address;
};
