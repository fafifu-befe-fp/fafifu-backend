("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusPenawaranData = [
      {
        id: 0,
        deskripsi: "Tolak",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        deskripsi: "Terima",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        deskripsi: "Terjual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "StatusPenawaranDetail",
      statusPenawaranData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusPenawaranDetail", null, {});
  },
};
