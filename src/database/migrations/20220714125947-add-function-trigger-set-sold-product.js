"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE OR REPLACE FUNCTION set_sold_product()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS
$$
BEGIN
IF NEW."statusOfferId" = 3 THEN
UPDATE "Offers"
SET "statusOfferId" = 2
WHERE "productId" = OLD."productId"
AND "buyerId" != OLD."buyerId";

UPDATE "Products"
SET "isAvailable" = false
WHERE "id" = OLD."productId";
END IF;

RETURN NEW;
END;
$$`
    );

    await queryInterface.sequelize.query(
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
      'DROP TRIGGER IF EXISTS set_sold_product_trigger ON "Offers"'
    );
    queryInterface.sequelize.query(
      "DROP FUNCTION IF EXISTS set_sold_product()"
    );
  },
};
