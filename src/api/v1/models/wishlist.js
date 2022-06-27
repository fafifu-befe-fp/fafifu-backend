"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {}
  }
  Wishlist.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlist",
      tableName: "Wishlists",
    }
  );
  return Wishlist;
};
