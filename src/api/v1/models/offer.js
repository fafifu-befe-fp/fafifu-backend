"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.Product, {
        foreignKey: "productId",
      });

      Offer.belongsTo(models.UserBiodata, {
        foreignKey: "buyerId",
      });

      Offer.hasMany(models.Notification, {
        foreignKey: "offerId",
      });
    }
  }
  Offer.init(
    {
      buyerId: { type: DataTypes.INTEGER, allowNull: false },
      publicId: { type: DataTypes.STRING, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      statusOfferId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "Offers",
      paranoid: true,
    }
  );
  return Offer;
};
