"use strict";
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    "address",
    {
      street: { type: DataTypes.STRING, allowNull: false },
      area: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      zipcode: { type: DataTypes.CHAR, allowNull: false },
      // https://en.wikipedia.org/wiki/Provinces_of_South_Africa
      province: { type: DataTypes.CHAR, allowNull: false },
      // eventually created and updated at when users can register
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
