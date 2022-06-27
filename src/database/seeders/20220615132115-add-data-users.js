("use strict");
const { faker } = require("@faker-js/faker");
const generateUUID = require("../../api/v1/helpers/generateUUID");
const hashPassword = require("../../api/v1/helpers/hashPassword");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyUserData = [];
    let tempEmail = "";

    for (let index = 1; index < 21; index++) {
      dummyUserData.push({
        publicId: await generateUUID(),
        email: (tempEmail = faker.internet.email()),
        password: await hashPassword(tempEmail),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    dummyUserData[0].publicId = "9e50ab39-8f99-4333-b2b4-8b6344bd23b6";
    dummyUserData[0].email = "admin@admin.com";
    dummyUserData[0].password = await hashPassword("admin@admin.com");

    await queryInterface.bulkInsert("Users", dummyUserData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
