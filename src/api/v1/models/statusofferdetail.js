"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusOfferDetail extends Model {
    static associate(models) {}
  }
  StatusOfferDetail.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusOfferDetail",
      tableName: "StatusOfferDetails",
    }
  );
  return StatusOfferDetail;
};
