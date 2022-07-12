("use strict");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyPotoProdukData = [];

    for (let index = 1; index < 6; index++) {
      dummyPotoProdukData.push({
        productId: 1,
        imageUrl: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ProductImages", dummyPotoProdukData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductImages", null, {});
  },
};
