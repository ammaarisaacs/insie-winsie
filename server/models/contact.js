"use strict";
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define(
    "contact",
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      cellphone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "contact",
    }
  );

  return contact;
};
