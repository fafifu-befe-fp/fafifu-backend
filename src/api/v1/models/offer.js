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
    }
  }
  Offer.init(
    {
      buyerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      statusOfferId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "Offers",
    }
  );
  return Offer;
};
