"use strict";

module.exports = (sequelize, DataTypes) => {
  const payment_detail = sequelize.define(
    "payment_detail",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      provider: { type: DataTypes.STRING, allowNull: false },
      // status: { type: DataTypes.STRING, allowNull: false },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "payment_detail",
      modelName: "payment_detail",
      freezeTableName: true,
    }
  );
  payment_detail.associate = function (models) {
    payment_detail.belongsTo(models.order_detail, {
      foreignKey: "order_id",
      onDelete: "cascade",
      hooks: true,
    });
    // payment_detail.hasOne(models.order_detail, {
    //   foreignKey: "payment_id",
    // });
  };
  return payment_detail;
};
