"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE OR REPLACE FUNCTION add_notification_published_product()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW."isPublished" = TRUE THEN
	    INSERT INTO "Notifications" ("publicId", "userId", "offerId", "productId", "statusNotificationId", "createdAt", "updatedAt", "deletedAt")
	    VALUES (gen_random_uuid(), NEW."userId", null, OLD."id", 3, now(),now(), null );
	END IF;

	RETURN NEW;
END;
$$`
    );

    await queryInterface.sequelize.query(`
    CREATE TRIGGER add_notification_published_product_before_update_trigger
  BEFORE UPDATE
    OF "isPublished" ON "Products"
  FOR EACH ROW
  EXECUTE PROCEDURE add_notification_published_product();`);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER add_notification_published_product_after_insert_trigger
    AFTER INSERT ON "Products"
    FOR EACH ROW
    EXECUTE PROCEDURE add_notification_published_product();`);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS add_notification_published_product_after_insert_trigger ON "Products"'
    );

    queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS add_notification_published_product_before_update_trigger ON "Products"'
    );

    queryInterface.sequelize.query(
      "DROP FUNCTION IF EXISTS add_notification_published_product()"
    );
  },
};
