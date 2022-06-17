("use strict");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyProdukKategoriData = [];

    for (let index = 1; index < 21; index++) {
      dummyProdukKategoriData.push({
        produkId: faker.datatype.number({ min: 1, max: 20 }),
        kategoriId: faker.datatype.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(
      "ProdukKategori",
      dummyProdukKategoriData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProdukKategori", null, {});
  },
};
