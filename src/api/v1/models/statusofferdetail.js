"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusOfferDetail extends Model {
    static associate(models) {}
  }
  StatusOfferDetail.init(
    {
      description: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "StatusOfferDetail",
      tableName: "StatusOfferDetails",
    }
  );
  return StatusOfferDetail;
};
