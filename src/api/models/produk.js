"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produk.hasMany(models.ProdukKategori, {
        foreignKey: "produkId",
      });

      Produk.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Produk.hasMany(models.PotoProduk, {
        foreignKey: "produkId",
      });

      Produk.hasMany(models.Penawaran, {
        foreignKey: "produkId",
      });
    }
  }
  Produk.init(
    {
      nama: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      harga: DataTypes.DOUBLE,
      userId: DataTypes.INTEGER,
      publicId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Produk",
      tableName: "Produk",
    }
  );
  return Produk;
};
