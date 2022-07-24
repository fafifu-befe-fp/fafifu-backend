("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      `ALTER SEQUENCE "Wishlists_id_seq" RESTART WITH 100 ;
ALTER SEQUENCE "Users_id_seq" RESTART WITH 100;
ALTER SEQUENCE "ProductCategory_id_seq" RESTART WITH 100;
ALTER SEQUENCE "Products_id_seq" RESTART WITH 100;
ALTER SEQUENCE "ProductImages_id_seq" RESTART WITH 100;`
    );
  },

  async down(queryInterface, Sequelize) {},
};
