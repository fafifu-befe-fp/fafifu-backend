"use strict";
const { WishlistService, ProductService } = require("../services");

class WishlistController {
  static async list(req, res, next) {
    try {
      const wishlist = await WishlistService.getWishlistList(req.user.id);
      if (wishlist) {
        res.status(200).json({
          data: wishlist,
        });
      } else {
        res.status(200).json({
          message: "Wishlist is empty",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const wishlist = await WishlistService.isWishlistExists(
        req.params.id,
        req.user.id
      );

      if (wishlist) {
        throw {
          status: 400,
          message: "Product already in wishlist",
        };
      } else {
        const product = await ProductService.isProductExists(req.params.id);

        if (product) {
          await WishlistService.addWishlist(product.id, req.user.id);
          res.status(200).json({
            message: "Success add wishlist",
          });
        } else {
          throw {
            status: 404,
            message: "Product not found",
          };
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const wishlist = await WishlistService.isWishlistExists(
        req.params.id,
        req.user.id
      );

      if (wishlist) {
        const product = await ProductService.isProductExists(req.params.id);

        if (product) {
          await WishlistService.deleteWishlist(product.id, req.user.id);
          res.status(200).json({
            message: "Success delete wishlist",
          });
        } else {
          throw {
            status: 404,
            message: "Product not found",
          };
        }
      } else {
        throw {
          status: 404,
          message: "Wishlist not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WishlistController;
