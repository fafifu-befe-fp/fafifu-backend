"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penawaran.init(
    {
      penawarId: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
      statusPenawaranId: DataTypes.INTEGER,
      statusNotifikasiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Penawaran",
      tableName: "Penawaran",
    }
  );
  return Penawaran;
};
