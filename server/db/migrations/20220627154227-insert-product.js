"use strict";
const uuidv4 = require("../../lib/uuid");

const numberOfProducts = 25;
const names = [
  "Bowtie",
  "Jacket",
  "Shoes",
  "Onesie",
  "Smart Pants",
  "Beret",
  "Hat",
  "Tie",
  "Socks",
  "Shirt",
  "Blazer",
  "Jersey",
];
const desc =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.";
const prices = [6.99, 8.99, 10.99, 2, 1, 3, 4, 5, 10.99];
const inCarousel = [true, false];

module.exports = {
  async up(queryInterface) {
    let data = [];
    for (let i = 0; i < numberOfProducts; i++) {
      data.push({
        id: uuidv4(),
        name: names[Math.floor(Math.random() * names.length)],
        description: desc,
        price: prices[Math.floor(Math.random() * prices.length)],
        stock_qty: 10,
        in_carousel: inCarousel[Math.round(Math.random())],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return await queryInterface.bulkInsert("product", data);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("product", null, {});
  },
};
