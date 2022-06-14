"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kategori.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kategori",
      tableName: "Kategori",
    }
  );
  return Kategori;
};
