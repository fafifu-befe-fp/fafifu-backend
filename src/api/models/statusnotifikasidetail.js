"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusNotifikasiDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StatusNotifikasiDetail.init(
    {
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusNotifikasiDetail",
      tableName: "StatusNotifikasiDetail",
    }
  );
  return StatusNotifikasiDetail;
};
