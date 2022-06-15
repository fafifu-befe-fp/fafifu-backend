("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusNotifikasiData = [
      {
        id: 0,
        deskripsi: "Belum dibuka",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        deskripsi: "Telah dibuka",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "StatusNotifikasiDetail",
      statusNotifikasiData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusNotifikasiDetail", null, {});
  },
};
