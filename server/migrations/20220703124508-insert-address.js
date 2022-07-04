"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("address", [
      {
        street: "14 fifth avenue",
        area: "rondebosch east",
        city: "cape town",
        zipcode: "7780",
        province: "WC",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        street: "424 andrew zondo road",
        area: "amanzimtoti",
        city: "durban",
        zipcode: "4124",
        province: "NC",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("address", null, {});
  },
};
