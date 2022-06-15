"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Produk", "publicId", {
      type: Sequelize.STRING,
    });
    queryInterface.addColumn("User", "publicId", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Produk", "publicId");
  },
};
