("use strict");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyProductKategoriData = [];

    for (let index = 1; index < 21; index++) {
      dummyProductKategoriData.push({
        productId: faker.datatype.number({ min: 1, max: 20 }),
        categoryId: faker.datatype.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(
      "ProductCategory",
      dummyProductKategoriData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductCategory", null, {});
  },
};
