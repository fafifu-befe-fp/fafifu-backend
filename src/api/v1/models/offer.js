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
      buyerId: { type: DataTypes.INTEGER, allowNull: false },
      publicId: { type: DataTypes.STRING, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      statusOfferId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
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
