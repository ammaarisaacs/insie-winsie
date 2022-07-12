"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment_detail = sequelize.define(
    "payment_detail",
    {
      token: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      provider: { type: DataTypes.STRING, allowNull: false },
      // status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "payment_detail",
      modelName: "payment_detail",
      freezeTableName: true,
    }
  );
  payment_detail.associate = function (models) {
    payment_detail.hasOne(models.order_detail, {
      foreignKey: "payment_id",
    });
  };
  return payment_detail;
};
