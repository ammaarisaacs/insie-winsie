"use strict";
const types = [
  "beanies",
  "bibs",
  "bows",
  "dresses",
  "rompers",
  "bow tie",
  "poor boy hats",
  "berets",
  "aprons",
  "mittens",
];

const sizes = ["small", "medium", "large", "xlarge", "xxlarge"];
const color = ["red", "blue", "grey", "purple", "grey", "black"];

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert(
      "category_detail",
      types.map((type) => {
        return {
          name: type,
          created_at: new Date(),
          updated_at: new Date(),
        };
      })
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("category_detail", null, {});
  },
};
