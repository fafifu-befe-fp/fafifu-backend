("use strict");
const { faker } = require("@faker-js/faker");
const generateUUID = require("../../api/v1/helpers/generateUUID");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyProductData = [];

    for (let index = 1; index < 21; index++) {
      dummyProductData.push({
        publicId: await generateUUID(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        userId: faker.datatype.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    dummyProductData[0].publicId = "0225dec5-33a1-467f-8567-592628c2ec5f";

    await queryInterface.bulkInsert("Products", dummyProductData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
