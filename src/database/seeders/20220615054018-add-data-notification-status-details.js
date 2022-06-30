("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusNotifikasiData = [
      {
        id: 0,
        description: "Not Seen Yet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        description: "Seen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "StatusNotificationDetails",
      statusNotifikasiData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusNotificationDetails", null, {});
  },
};
