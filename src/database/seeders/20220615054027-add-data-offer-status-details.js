("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusOfferData = [
      {
        id: 0,
        description: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        description: "Accepted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: "Rejected",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        description: "Sold",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("StatusOfferDetails", statusOfferData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusOfferDetails", null, {});
  },
};
