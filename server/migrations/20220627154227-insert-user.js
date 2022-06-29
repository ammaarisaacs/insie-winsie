"use strict";

const names = [
  "Shoe",
  "Tshirt",
  "Jacket",
  "Bow Tie",
  "Beret",
  "Undertop",
  "Shoe",
  "Romper",
];

const desc =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.";

const prices = [6.99, 8.99, 10.99, 2, 1, 3, 4, 5, 10.99];
const inCarousel = [true, false];

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    let count = 25;

    for (let i = 0; i < count; i++) {
      data.push({
        name: names[Math.floor(Math.random() * names.length)],
        description: desc,
        price: prices[Math.floor(Math.random() * prices.length)],
        stock_qty: Math.floor(Math.random() * 10),
        in_carousel: inCarousel[Math.round(Math.random())],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("product", data);
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.bulkDelete("product", null, {
    //   truncate: true,
    //   cascade: true,
    // });
  },
};
