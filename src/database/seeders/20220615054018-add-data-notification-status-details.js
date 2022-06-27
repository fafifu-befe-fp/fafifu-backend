("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusNotifikasiData = [
      {
        id: 0,
        description: "Belum dibuka",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        description: "Telah dibuka",
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
