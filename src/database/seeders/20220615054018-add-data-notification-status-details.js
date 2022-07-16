("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusNotificationData = [
      {
        id: 1,
        description: "Incoming Offer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: "Accepted Offer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        description: "Published Product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        description: "Published Offer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "StatusNotificationDetails",
      statusNotificationData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusNotificationDetails", null, {});
  },
};
