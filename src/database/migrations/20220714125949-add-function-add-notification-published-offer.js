"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE OR REPLACE FUNCTION add_notification_add_offer()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW."statusOfferId" = 0 THEN
	    INSERT INTO "Notifications" ("publicId", "userId", "offerId", "productId", "statusNotificationId", "createdAt", "updatedAt", "deletedAt")
	    VALUES (gen_random_uuid(), NEW."buyerId", NEW."id", NEW."productId", 4, now(),now(), null );
	END IF;

	RETURN NEW;
END;
$$`
    );

    await queryInterface.sequelize.query(`
    CREATE TRIGGER add_notification_add_offer_after_insert_trigger
  AFTER INSERT ON "Offers"
  FOR EACH ROW
  EXECUTE PROCEDURE add_notification_add_offer();`);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS add_notification_add_offer_after_insert_trigger ON "Offers"'
    );

    queryInterface.sequelize.query(
      "DROP FUNCTION IF EXISTS add_notification_add_offer()"
    );
  },
};
