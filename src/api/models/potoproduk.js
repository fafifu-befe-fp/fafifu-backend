"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PotoProduk extends Model {
    static associate(models) {
      PotoProduk.belongsTo(models.Produk, {
        foreignKey: "produkId",
      });
    }
  }
  PotoProduk.init(
    {
      produkId: DataTypes.INTEGER,
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
