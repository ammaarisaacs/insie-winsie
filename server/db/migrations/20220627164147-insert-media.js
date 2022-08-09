"use strict";
const fs = require("fs");
const fileNames = fs.readdirSync("../public");
const { product } = require("../models");

module.exports = {
  async up(queryInterface) {
    const ids = await product.findAll({ attributes: ["id"], raw: true });
    const data = ids.map(({ id }, i) => {
      return {
        file_name: fileNames[Math.floor(Math.random() * fileNames.length)],
        alt_text: `product ${i}`,
        product_id: id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });
    await queryInterface.bulkInsert("media", data);
    return;
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete("media", null, {
      truncate: true,
      cascade: true,
    });
  },
};
