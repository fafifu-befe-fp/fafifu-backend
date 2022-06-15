"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserBiodata.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserBiodata.init(
    {
      userId: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      handphone: DataTypes.STRING,
      urlProfilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserBiodata",
      tableName: "UserBiodata",
    }
  );
  return UserBiodata;
};
