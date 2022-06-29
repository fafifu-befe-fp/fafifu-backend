"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserBiodata, {
        foreignKey: "userId",
      });
      User.hasMany(models.Product, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      publicId: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
