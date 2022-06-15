("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const kategoriData = [
      {
        id: 1,
        nama: "Hobi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nama: "Kendaraan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nama: "Baju",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nama: "Elektronik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nama: "Kesehatan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Kategori", kategoriData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kategori", null, {});
  },
};
