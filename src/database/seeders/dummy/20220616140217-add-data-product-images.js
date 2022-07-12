("use strict");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyPotoProductData = [];

    for (let index = 1; index < 6; index++) {
      dummyPotoProductData.push({
        productId: 1,
        imageUrl: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ProductImages", dummyPotoProductData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductImages", null, {});
  },
};
