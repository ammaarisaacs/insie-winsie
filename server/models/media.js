"use strict";
module.exports = (sequelize, DataTypes) => {
  const media = sequelize.define(
    "media",
    {
      file_name: { type: DataTypes.STRING, allowNull: false },
      alt_text: { type: DataTypes.STRING, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "media",
      modelName: "media",
    }
  );

  media.associate = function (models) {
    media.belongsTo(models.product, {
      foreignKey: "product_id",
    });
  };
  return media;
};
