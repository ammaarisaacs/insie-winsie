"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    static associate(models) {
      media.belongsTo(models.product, {
        foreignKey: "product_id",
        // as: "product",
      });
    }
  }

  media.init(
    {
      file_name: DataTypes.STRING,
      alt_text: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "media",
      modelName: "media",
    }
  );
  return media;
};
