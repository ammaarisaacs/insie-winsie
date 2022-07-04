"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("ship_method", [
      {
        name: "Method 1",
        charge: 50.99,
        city: "cape town",
        area: "rondebosch",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Method 2",
        charge: 200,
        city: "jhb",
        area: "sandton",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Method 3",
        charge: 120.0,
        city: "durban",
        area: "amanzimtoti",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ship_method", null, {});
  },
};
