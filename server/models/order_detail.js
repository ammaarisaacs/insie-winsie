"use strict";
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define(
    "order_detail",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      cellphone: { type: DataTypes.STRING, allowNull: false },
      ship_address_id: { type: DataTypes.INTEGER, allowNull: false },
      bill_address_id: { type: DataTypes.INTEGER, allowNull: false },
      ship_method_id: { type: DataTypes.INTEGER, allowNull: false },
      payment_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "order_detail",
      modelName: "order_detail",
    }
  );

  // need to add beforeCreate hook to lowercase everything

  order_detail.associate = function (models) {
    order_detail.belongsToMany(models.product, {
      through: "order_item",
      foreignKey: "order_id",
      // over here going to have to decide whether you want to keep your order data for legal purposes or data analysis
      // could you use set default
      onDelete: "cascade",
      hooks: true,
    });
    order_detail.belongsTo(models.address, {
      foreignKey: "ship_address_id",
      as: "shipAddressId",
      // over here going to have to decide whether you want to keep your order data for legal purposes or data analysis
      // could you use set default
      onDelete: "cascade",
      hooks: true,
    });
    order_detail.belongsTo(models.address, {
      foreignKey: "bill_address_id",
      as: "billAddressId",
      // over here going to have to decide whether you want to keep your order data for legal purposes or data analysis
      // could you use set default
      onDelete: "cascade",
      hooks: true,
    });
    order_detail.belongsTo(models.payment_detail, {
      foreignKey: "payment_id",
      // over here going to have to decide whether you want to keep your order data for legal purposes or data analysis
      // could you use set default
      onDelete: "cascade",
      hooks: true,
    });
  };

  return order_detail;
};
