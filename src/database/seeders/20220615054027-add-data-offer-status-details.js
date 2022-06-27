("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statusPenawaranData = [
      {
        id: 0,
        description: "Tolak",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        description: "Terima",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: "Terjual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "StatusOfferDetails",
      statusPenawaranData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StatusOfferDetails", null, {});
  },
};
