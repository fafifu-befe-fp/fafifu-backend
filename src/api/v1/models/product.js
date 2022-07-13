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

      Product.hasMany(models.Wishlist, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      publicId: { type: DataTypes.STRING, allowNull: false },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
      paranoid: true,
    }
  );
  return Product;
};
