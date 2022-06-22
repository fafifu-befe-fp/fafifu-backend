"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    static associate(models) {
      Penawaran.belongsTo(models.Produk, {
        foreignKey: "produkId",
      });
    }
  }
  Penawaran.init(
    {
      penawarId: DataTypes.INTEGER,
      produkId: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
      statusPenawaranId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Penawaran",
      tableName: "Penawaran",
    }
  );
  return Penawaran;
};
