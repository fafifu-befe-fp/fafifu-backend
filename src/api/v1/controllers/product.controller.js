const {
  getProduct,
  getUserByPublicId,
  updateProduk,
  getProdukId,
  getProductListByUserId,
  getProductId,
} = require("../services");
const { generateUUID } = require("../helpers");
const { Op } = require("sequelize");
const {
  sequelize,
  Product,
  ProductImage,
  ProductCategory,
  Category,
  Notification,
  Offer,
  Wishlist,
} = require("../models");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");
const authorization = require("../middlewares/authorization");
class ProductController {
  static async get(req, res, next) {
    try {
      const produk = await getProduct(req.params.id);

      if (produk.length != 0) {
        res.status(200).json({
          data: produk,
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
      const option = {
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
            where: {},
          },
          {
            model: ProductImage,
            attributes: ["imageUrl"],
                        sort: ["id", "ascending"],
          },
        ],
      };

      if (req.query.categoryId) {
        option.include[0].where.categoryId = Number(req.query.categoryId);
      }

      if (req.query.limit) {
        option.limit = Number(req.query.limit);
      }
      if (req.query.page) {
        option.offset = Number(req.query.page - 1);
      }

      if (req.headers.authorization) {
        option.where = {
          userId: {
            [Op.not]: req.user.id,
          },
        };
      }

      const product = await Product.findAll(option);

      const result = product.map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          description: item.description,
          price: item.price,
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
        };
      });

      res.status(200).json({
        data: result,
      });
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

  static async getProductListByUserId(req, res, next) {
    try {
      const user = await getUserByPublicId(req.params.id);

      if (user) {
        res.status(200).json({
          data: await getProductListByUserId(req.params.id),
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
              where: {},
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
        console.log("wishlist", wishlist);
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
      await Product.update(
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        },
        {
          where: {
            userId: req.user.id,
            publicId: req.params.publicId,
          },
        },
        {
          transaction: updateProductTransaction,
        }
      );

      const productId = await getProductId(req.params.publicId);

      await ProductCategory.destroy(
        {
          where: {
            productId,
          },
        },
        {
          transaction: updateProductTransaction,
        }
      );

      if (req.body.categoryId.length != 1) {
        const productCategoryList = req.body.categoryId.map((item) => {
          return {
            productId,
            categoryId: item,
          };
        });

        await ProductCategory.bulkCreate(productCategoryList, {
          transaction: updateProductTransaction,
        });
      } else {
        await ProductCategory.create(
          {
            productId,
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
            productId,
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
            productId,
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
    } catch (error) {
      await updateProductTransaction.rollback();

      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    try {
      if (
        await Wishlist.findOne({
          where: {
            userId: req.user.id,
            productId: await getProductId(req.params.id),
          },
        })
      ) {
        res.status(422).json({
          message: "Wishlist already exists",
        });
      } else {
        Wishlist.create({
          userId: req.user.id,
          productId: await getProductId(req.params.id),
        });
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
            productId: await getProductId(req.params.id),
          },
        })
      ) {
        Wishlist.destroy({
          where: {
            userId: req.user.id,
            productId: await getProductId(req.params.id),
          },
        });
        res.status(200).json({
          message: "Success delete wishlist",
        });
      } else {
        res.status(404).json({
          message: "Wishlist not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          publicId: req.params.id,
          userId: req.user.id,
        },
      });

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
        res.status(404).json({
          message: "Product not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
