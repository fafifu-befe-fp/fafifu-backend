"use strict";
const { generateUUID, cloudinary } = require("../helpers");
const {
  sequelize,
  User,
  UserBiodata,
  Product,
  ProductImage,
  ProductCategory,
  Category,
  Notification,
  Offer,
  Wishlist,
} = require("../models");
const fs = require("fs");
const ProductService = require("../services/product.services");
class ProductController {
  static async get(req, res, next) {
    try {
      let userId = false;

      if (req.headers.authorization) {
        userId = req.user.id;
      }

      const data = await ProductService.getProductDetail(req.params.id, userId);

      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        throw {
          status: 404,
          message: "Product not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      let userId = false;

      if (req.headers.authorization) {
        userId = req.user.id;
      }

      const data = await ProductService.getProductList(
        req.query.categoryId,
        req.query.limit,
        req.query.page,
        userId
      );

      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        throw {
          status: 404,
          message: "Product list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getProductListByUserId(req, res, next) {
    try {
      const product = (
        await Product.findAll({
          attributes: ["publicId", "name", "description", "price"],
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
            {
              model: User,
              attributes: ["publicId"],
              include: [
                {
                  model: UserBiodata,
                  attributes: [
                    "name",
                    "city",
                    "address",
                    "handphone",
                    "imageUrl",
                  ],
                },
              ],
              where: {
                publicId: req.params.id,
              },
            },
          ],
          order: [[ProductImage, "id", "ASC"]],
        })
      ).map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          description: item.description,
          price: item.price,
          userId: item.userId,
          category: item.ProductCategories.map((item) => {
            return {
              categoryId: item.Category.id,
              name: item.Category.name,
            };
          }),
          imageUrl: item.ProductImages.map((item) => {
            return {
              imageUrl: item.imageUrl,
            };
          }),
          seller: {
            publicId: item.User.publicId,
            name: item.User.UserBiodatum.name,
            city: item.User.UserBiodatum.city,
            address: item.User.UserBiodatum.address,
            handphone: item.User.UserBiodatum.handphone,
            imageUrl: item.User.UserBiodatum.imageUrl,
          },
        };
      });

      if (product) {
        res.status(200).json({
          data: product,
        });
      } else {
        throw {
          status: 404,
          message: "Seller not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const addProductTransaction = await sequelize.transaction();

    try {
      const product = await Product.create(
        {
          publicId: await generateUUID(),
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          userId: req.user.id,
        },
        { transaction: addProductTransaction }
      );

      let productImageList = [];

      for (let index = 0; index < req.files.length; index++) {
        const image = await cloudinary.uploader.upload(req.files[index].path);
        productImageList.push({
          productId: product.id,
          imageUrl: image.secure_url,
        });
        fs.unlinkSync(req.files[index].path);
      }

      await ProductImage.bulkCreate(productImageList, {
        transaction: addProductTransaction,
      });

      if (req.body.categoryId.length != 1) {
        const productCategoryList = req.body.categoryId.map((item) => {
          return {
            productId: product.id,
            categoryId: item,
          };
        });

        await ProductCategory.bulkCreate(productCategoryList, {
          transaction: addProductTransaction,
        });
      } else {
        await ProductCategory.create(
          {
            productId: product.id,
            categoryId: req.body.categoryId,
          },
          {
            transaction: addProductTransaction,
          }
        );
      }

      await addProductTransaction.commit();
      res.status(200).json({
        message: "Success register product",
      });
    } catch (error) {
      await addProductTransaction.rollback();
      next(error);
    }
  }

  static async wishlist(req, res, next) {
    try {
      const wishlist = await Wishlist.findAll({
        include: {
          model: Product,
          attributes: ["publicId", "name", "description", "price"],
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
        },
        where: {
          userId: req.user.id,
        },
      });

      if (wishlist.length != 0) {
        const result = wishlist.map((item) => {
          return {
            publicId: item.Product.publicId,
            name: item.Product.name,
            description: item.Product.description,
            price: item.Product.price,
            category: item.Product.ProductCategories.map((item) => {
              return {
                categoryId: item.Category.id,
                name: item.Category.name,
              };
            }),
            imageUrl: item.Product.ProductImages.map((item) => {
              return {
                imageUrl: item.imageUrl,
              };
            }),
          };
        });

        res.status(200).json({
          data: result,
        });
      } else {
        res.status(200).json({
          message: "Wishlist still empty",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const updateProductTransaction = await sequelize.transaction();

    try {
      const product = await Product.findOne(
        {
          attributes: ["id"],
          where: {
            publicId: req.params.id,
          },
        },
        { transaction: updateProductTransaction }
      );

      if (product) {
        await Product.update(
          {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
          },
          {
            where: {
              userId: req.user.id,
              publicId: req.params.id,
            },
          },
          {
            transaction: updateProductTransaction,
          }
        );

        await ProductCategory.destroy(
          {
            where: {
              productId: product.id,
            },
          },
          {
            transaction: updateProductTransaction,
          }
        );

        if (req.body.categoryId.length != 1) {
          const productCategoryList = req.body.categoryId.map((item) => {
            return {
              productId: product.id,
              categoryId: item,
            };
          });

          await ProductCategory.bulkCreate(productCategoryList, {
            transaction: updateProductTransaction,
          });
        } else {
          await ProductCategory.create(
            {
              productId: product.id,
              categoryId: req.body.categoryId,
            },
            {
              transaction: updateProductTransaction,
            }
          );
        }

        await ProductImage.destroy(
          {
            where: {
              productId: product.id,
            },
          },
          {
            transaction: updateProductTransaction,
          }
        );

        let productImageList = [];

        if (req.files) {
          for (let index = 0; index < req.files.length; index++) {
            productImageList.push({
              productId: product.id,
              imageUrl: `http://127.0.0.1:3000/foto-produk/${req.files[index].filename}`,
            });
          }
        }

        await ProductImage.bulkCreate(productImageList, {
          transaction: updateProductTransaction,
        });

        await updateProductTransaction.commit();

        res.status(200).json({
          message: "Success update product",
        });
      } else {
        throw {
          status: 404,
          message: "Product not found",
        };
      }
    } catch (error) {
      await updateProductTransaction.rollback();

      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    try {
      const wishlist = await Wishlist.findOne({
        where: {
          userId: req.user.id,
        },
        include: {
          model: Product,
          where: {
            publicId: req.params.id,
          },
        },
      });

      if (wishlist) {
        throw {
          status: 400,
          message: "Wishlist already in wishlist",
        };
      } else {
        const product = await Product.findOne({
          where: {
            publicId: req.params.id,
          },
        });

        if (product) {
          Wishlist.create({
            userId: req.user.id,
            productId: product.id,
          });
        } else {
          throw {
            status: 404,
            message: "Product not found",
          };
        }
      }

      res.status(200).json({
        message: "Success add wishlist",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      if (
        await Wishlist.findOne({
          where: {
            userId: req.user.id,
          },
          include: {
            model: Product,
            where: {
              publicId: req.params.id,
            },
          },
        })
      ) {
        Wishlist.destroy({
          where: {
            userId: req.user.id,
          },
          include: {
            model: Product,
            where: {
              publicId: req.params.id,
            },
          },
        });
        res.status(200).json({
          message: "Success delete wishlist",
        });
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

  static async delete(req, res, next) {
    try {
      const product = await ProductService.isProductExist(req.params.id);

      if (product) {
        await Product.destroy({
          where: {
            publicId: req.params.id,
            userId: req.user.id,
          },
        });
        res.status(200).json({
          message: "Success delete product",
        });

        await Offer.destroy({
          where: {
            productId: product.id,
          },
        });

        await Notification.destroy({
          where: { productId: product.id },
        });

        await Wishlist.destroy({
          where: { productId: product.id },
        });
      } else {
        throw {
          status: 404,
          message: "Product not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
