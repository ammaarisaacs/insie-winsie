"use strict";
module.exports = (sequelize, DataTypes) => {
  const category_detail = sequelize.define(
    "category_detail",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      freezeTableName: true,
      tableName: "category_detail",
      modelName: "category_detail",
    }
  );

  category_detail.associate = function (models) {
    category_detail.belongsToMany(models.product, {
      through: "category_item",
      foreignKey: "category_id",
      onDelete: "cascade",
      hooks: true,
    });
  };

  return category_detail;
};
