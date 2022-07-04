"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_detail extends Model {
    static associate(models) {
      payment_detail.hasOne(models.order_detail, {
        foreignKey: "payment_id",
      });
    }
  }
  payment_detail.init(
    {
      token: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      provider: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "payment_detail",
      freezeTableName: true,
      modelName: "payment_detail",
    }
  );
  return payment_detail;
};
