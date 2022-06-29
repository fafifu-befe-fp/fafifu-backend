"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    static associate(models) {
      UserBiodata.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserBiodata.init(
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      handphone: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserBiodata",
      tableName: "UserBiodatas",
    }
  );
  return UserBiodata;
};
