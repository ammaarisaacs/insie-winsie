const { Sequelize } = require("sequelize");

module.exports = new Sequelize("insie-winsie", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
