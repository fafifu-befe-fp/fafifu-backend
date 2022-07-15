"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      `CREATE TRIGGER set_sold_product_trigger
    BEFORE UPDATE
    OF "statusOfferId" ON "Offers"
    FOR EACH ROW
    EXECUTE PROCEDURE set_sold_product();
    `
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      "DROP FUNCTION IF EXISTS set_sold_product()"
    );
  },
};
