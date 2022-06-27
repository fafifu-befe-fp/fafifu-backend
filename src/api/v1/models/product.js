"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductCategory, {
        foreignKey: "productId",
      });

      Product.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
      });

      Product.hasMany(models.Offer, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      userId: DataTypes.INTEGER,
      publicId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
    }
  );
  return Product;
};
