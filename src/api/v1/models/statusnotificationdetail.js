"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusNotificationDetail extends Model {
    static associate(models) {}
  }
  StatusNotificationDetail.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusNotificationDetail",
      tableName: "StatusNotificationDetails",
    }
  );
  return StatusNotificationDetail;
};
