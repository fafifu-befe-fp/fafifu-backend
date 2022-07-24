"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      ProductCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  ProductCategory.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "ProductCategory",
    }
  );
  return ProductCategory;
};
