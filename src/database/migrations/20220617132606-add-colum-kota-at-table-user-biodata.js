"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("UserBiodata", "kota", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("UserBiodata", "kota");
  },
};
