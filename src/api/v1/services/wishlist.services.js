"use strict";
const {
  Wishlist,
  Product,
  ProductCategory,
  Category,
  ProductImage,
} = require("../models");

class WishlistService {
  static async getWishlistList(userIdParam) {
    const wishlist = await Wishlist.findAll({
      attributes: ["id"],
      include: {
        model: Product,
        attributes: ["publicId", "name", "price"],
        where: {
          isAvailable: true,
          isPublished: true,
        },
        include: [
          {
            model: ProductCategory,
            include: [
              {
                model: Category,
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: ProductImage,
            attributes: ["imageUrl"],
          },
        ],
        order: [
          [ProductImage, "id", "ASC"],
          [ProductCategory, "id", "ASC"],
        ],
      },
      where: {
        userId: userIdParam,
      },
    });

    if (wishlist.length > 0) {
      return wishlist.map((item) => {
        return {
          publicId: item.Product.publicId,
          name: item.Product.name,
          price: item.Product.price,
          imageUrl: item.Product.ProductImages[0].imageUrl,
          category: item.Product.ProductCategories.map((item) => {
            return {
              categoryId: item.Category.id,
              name: item.Category.name,
            };
          }),
        };
      });
    } else {
      return null;
    }
  }

  static async isWishlistExists(publicIdParam, userIdParam) {
    return await Wishlist.findOne({
      include: {
        model: Product,
        where: {
          publicId: publicIdParam,
        },
      },
      where: {
        userId: userIdParam,
      },
    });
  }

  static async addWishlist(idParam, userIdParam) {
    return await Wishlist.create({
      userId: userIdParam,
      productId: idParam,
    });
  }

  static async deleteWishlist(idParam, userIdParam) {
    return await Wishlist.destroy({
      where: {
        userId: userIdParam,
        productId: idParam,
      },
    });
  }
}

module.exports = WishlistService;
