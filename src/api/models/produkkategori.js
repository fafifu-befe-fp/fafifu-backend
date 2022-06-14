"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProdukKategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProdukKategori.init(
    {
      productId: DataTypes.INTEGER,
      kategoriId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProdukKategori",
      tableName: "ProdukKategori",
    }
  );
  return ProdukKategori;
};
