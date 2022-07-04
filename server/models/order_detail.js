"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    static associate(models) {
      order_detail.belongsToMany(models.product, {
        through: models.order_item,
      });
      // order_detail.hasMany(models.order_item, {
      //   foreignKey: "order_id",
      // });

      // order_detail.belongsToMany(models.product, {
      //   through: models.order_item,
      //   timestamps: false,
      //   foreignKey: "order_id",
      //   // as: "product",
      // });

      order_detail.belongsTo(models.address, {
        foreignKey: "ship_address_id",
        as: "shipAddressId",
      });

      order_detail.belongsTo(models.address, {
        foreignKey: "bill_address_id",
        as: "billAddressId",
      });

      order_detail.belongsTo(models.payment_detail, {
        foreignKey: "payment_id",
      });
    }
  }
  order_detail.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      cellphone: { type: DataTypes.STRING, allowNull: false },
      payment_id: { type: DataTypes.INTEGER, allowNull: false },
      ship_address_id: { type: DataTypes.INTEGER, allowNull: false },
      bill_address_id: { type: DataTypes.INTEGER, allowNull: false },
      ship_method_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "order_detail",
      tableName: "order_detail",
      freezeTableName: true,
    }
  );
  return order_detail;
};
