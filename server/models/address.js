"use strict";
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    "address",
    {
      street: { type: DataTypes.STRING, allowNull: false },
      area: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      zipcode: { type: DataTypes.CHAR, allowNull: false },
      province: { type: DataTypes.CHAR, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "address",
    }
  );

  address.associate = function (models) {
    address.hasMany(models.order_detail, {
      foreignKey: "ship_address_id",
      as: "shipAddressId",
    });
    address.hasMany(models.order_detail, {
      foreignKey: "bill_address_id",
      as: "billAddressId",
    });
  };
  return address;
};
