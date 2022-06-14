"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PotoProduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PotoProduk.init(
    {
      productId: DataTypes.INTEGER,
      urlFotoProduk: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PotoProduk",
      tableName: "PotoProduk",
    }
  );
  return PotoProduk;
};
