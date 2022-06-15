("use strict");
const { faker } = require("@faker-js/faker");
const generateUUID = require("../../api/helpers/generateUUID");
const hashPassword = require("../../api/helpers/hashPassword");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyUserData = [];
    let tempEmail = "";

    for (let index = 1; index < 21; index++) {
      dummyUserData.push({
        id: index,
        publicId: await generateUUID(),
        email: (tempEmail = faker.internet.email()),
        password: await hashPassword(tempEmail),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    dummyUserData[0].publicId = "9e50ab39-8f99-4333-b2b4-8b6344bd23b6";
    dummyUserData[0].email = "admin@admin.com";
    dummyUserData[0].password = await hashPassword("admin");

    await queryInterface.bulkInsert("User", dummyUserData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
