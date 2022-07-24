"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.ProductCategory, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
    }
  );
  return Category;
};
