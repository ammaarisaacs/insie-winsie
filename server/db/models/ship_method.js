"use strict";
module.exports = (sequelize, DataTypes) => {
  const ship_method = sequelize.define(
    "ship_method",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      charge: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      area: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "ship_method",
      freezeTableName: true,
      modelName: "ship_method",
    }
  );
  ship_method.associate = function (models) {
    ship_method.hasMany(models.order_detail, {
      foreignKey: "ship_method_id",
    });
  };
  return ship_method;
};
