"use strict";
const { cloudinary } = require("../helpers");
const { sequelize } = require("../models");
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
        req.query.sort,
        userId,
        false,
        true,
        true
      );

      if (data) {
        res.status(200).json({
          data,
          count: data.length,
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

  static async listByUserId(req, res, next) {
    try {
      const data = await ProductService.getProductList(
        req.query.categoryId,
        req.query.limit,
        req.query.page,
        req.query.sort,
        false,
        req.params.id,
        null,
        null
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

  static async soldlistByUserId(req, res, next) {
    try {
      const data = await ProductService.getProductList(
        req.query.categoryId,
        req.query.limit,
        req.query.page,
        req.query.sort,
        false,
        req.params.id,
        false,
        false
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

  static async add(req, res, next) {
    const addProductTransaction = await sequelize.transaction();

    try {
      console.log("req.body", req.body);
      const product = await ProductService.createProduct(
        req.body.name,
        req.body.description,
        req.body.price,
        req.user.id,
        req.user.isPublished,
        addProductTransaction
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

      await ProductService.addProductImage(
        productImageList,
        addProductTransaction
      );

      let productCategoryList;

      if (req.body.categoryId.length != 1) {
        productCategoryList = req.body.categoryId.map((item) => {
          return {
            productId: product.id,
            categoryId: item,
          };
        });
      } else {
        productCategoryList = [
          {
            productId: product.id,
            categoryId: req.body.categoryId,
          },
        ];
      }

      await ProductService.addProductCategory(
        productCategoryList,
        addProductTransaction
      );

      await addProductTransaction.commit();
      res.status(201).json({
        message: "Success register product",
      });
    } catch (error) {
      await addProductTransaction.rollback();
      next(error);
    }
  }

  static async update(req, res, next) {
    const updateProductTransaction = await sequelize.transaction();

    try {
      const product = await ProductService.isProductExists(req.params.id);

      if (product) {
        await ProductService.updateProduct(
          req.body.name,
          req.body.description,
          req.body.price,
          req.user.id,
          req.params.id,
          updateProductTransaction
        );

        await ProductService.deleteProductCategory(
          product.id,
          updateProductTransaction
        );

        let productCategoryList;
        if (req.body.categoryId.length != 1) {
          productCategoryList = req.body.categoryId.map((item) => {
            return {
              productId: product.id,
              categoryId: item,
            };
          });
        } else {
          productCategoryList = [
            {
              productId: product.id,
              categoryId: req.body.categoryId,
            },
          ];
        }

        await ProductService.addProductCategory(
          productCategoryList,
          updateProductTransaction
        );

        await ProductService.deleteProductImage(
          product.id,
          updateProductTransaction
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

        await ProductService.addProductImage(
          productImageList,
          updateProductTransaction
        );

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

  static async delete(req, res, next) {
    try {
      const product = await ProductService.isProductExists(req.params.id);

      if (product) {
        await ProductService.deleteProduct(req.params.id, req.user.id);

        res.status(200).json({
          message: "Success delete product",
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

  static async getProductCategoryList(req, res, next) {
    try {
      const data = await ProductService.getProductCategoryList();

      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        throw {
          status: 404,
          message: "Product category list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      let userId;
      if (req.headers.authorization) {
        userId = req.user.id;
      }

      const search = await ProductService.searchProduct(
        req.query.search,
        userId
      );

      if (search) {
        res.status(200).json({
          data: search,
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
