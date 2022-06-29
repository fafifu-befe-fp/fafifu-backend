"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  ProductImage.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "ProductImages",
    }
  );
  return ProductImage;
};
