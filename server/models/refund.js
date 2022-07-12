"use strict";
module.exports = (sequelize, DataTypes) => {
  const refund = sequelize.define(
    "refund",
    {
      // order_id: { type: DataTypes.INTEGER, allowNUll: false },
      order_item_id: { type: DataTypes.INTEGER, allowNUll: false },
      exchange_id: { type: DataTypes.INTEGER, allowNUll: false },
      reason: { type: DataTypes.STRING },
      quantity: { type: DataTypes.INTEGER, allowNUll: false },
    },
    {
      tableName: "refund",
      modelName: "refund",
      freezeTableName: true,
    }
  );

  refund.associate = function (models) {
    refund.belongsTo(models.order_item, {
      foreignKey: "order_item_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return refund;
};
