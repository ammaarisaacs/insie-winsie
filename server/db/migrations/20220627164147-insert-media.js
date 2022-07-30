"use strict";

const fs = require("fs");

const fileNames = fs.readdirSync("./public");

module.exports = {
  async up(queryInterface) {
    let data = [];
    let count = 25;

    for (let i = 0; i < count; i++) {
      data.push({
        file_name: fileNames[Math.floor(Math.random() * fileNames.length)],
        alt_text: `product ${i}`,
        product_id: i + 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < count; i++) {
      data.push({
        file_name: fileNames[Math.floor(Math.random() * fileNames.length)],
        alt_text: `product ${i}`,
        product_id: i + 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("media", data);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("media", null, {
      truncate: true,
      cascade: true,
    });
  },
};
