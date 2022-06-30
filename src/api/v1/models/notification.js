"use strict";
const { Model } = require("sequelize");
const { generateUUID } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.Offer, {
        foreignKey: "offerId",
      });
    }
  }
  Notification.init(
    {
      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      offerId: { type: DataTypes.INTEGER, allowNull: false },
      statusNotificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Notification",
    }
  );
  return Notification;
};
