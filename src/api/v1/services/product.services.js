"use strict";
const {
  Product,
  ProductImage,
  ProductCategory,
  Category,
  User,
  UserBiodata,
  Wishlist,
  Offer,
} = require("../models");
const { Op } = require("sequelize");
const { generateUUID } = require("../helpers");

class ProductService {
  static async getProductDetail(publicIdParam, authorizationParam) {
    let option = {
      attributes: [
        "publicId",
        "name",
        "description",
        "price",
        "isAvailable",
        "isPublished",
      ],
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
              attributes: ["name", "city", "address", "handphone", "imageUrl"],
            },
          ],
        },
      ],
      order: [
        [ProductImage, "id", "ASC"],
        [ProductCategory, "id", "ASC"],
      ],
      where: {
        publicId: publicIdParam,
      },
    };

    if (authorizationParam) {
      option.include.push(
        {
          model: Wishlist,
          attributes: ["id"],
          where: {
            userId: authorizationParam,
          },
          required: false,
        },
        {
          model: Offer,
          attributes: ["publicId"],
          where: {
            buyerId: authorizationParam,
            statusOfferId: {
              [Op.or]: [0, 1],
            },
          },
          required: false,
        }
      );
    }

    const product = await Product.findOne(option);

    let wishlistStatus = false;
    let offerStatus = false;
    if (product) {
      if (Array.isArray(product.Wishlists)) {
        if (product.Wishlists.length > 0 && product.Wishlists[0].id) {
          wishlistStatus = true;
        }
      }

      if (Array.isArray(product.Offers)) {
        if (product.Offers.length > 0 && product.Offers[0].publicId) {
          offerStatus = true;
        }
      }

      return {
        publicId: product.publicId,
        name: product.name,
        description: product.description,
        price: product.price,
        userId: product.userId,
        category: product.ProductCategories.map((item) => {
          return {
            id: item.Category.id,
            name: item.Category.name,
          };
        }),
        imageUrl: product.ProductImages.map(function (item) {
          return typeof item.imageUrl != "undefined" ? item.imageUrl : null;
        }),
        seller: {
          publicId: product.User.publicId,
          name: product.User.UserBiodatum.name,
          city: product.User.UserBiodatum.city,
          address: product.User.UserBiodatum.address,
          handphone: product.User.UserBiodatum.handphone,
          imageUrl:
            typeof product.User.UserBiodatum.imageUrl != "undefined"
              ? product.User.UserBiodatum.imageUrl
              : null,
        },
        status: {
          wishlist: wishlistStatus,
          offer: offerStatus,
          sold: !product.isAvailable,
          published: product.isPublished,
        },
      };
    } else {
      return null;
    }
  }

  static async getProductList(
    categoryIdParam,
    limitParam,
    pageParam,
    sortingParam,
    authorizationFilterParam,
    userIdParam,
    isPublishedParam,
    isAvailableParam
  ) {
    const option = {
      attributes: ["publicId", "name", "price"],
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
        {
          model: User,
          attributes: ["publicId"],
        },
      ],
      where: {},
      order: [
        ["id", "DESC"],
        [ProductImage, "id", "ASC"],
        [ProductCategory, "id", "ASC"],
      ],
    };

    if (categoryIdParam) {
      option.include[0].where.categoryId = Number(categoryIdParam);
    }

    if (limitParam && pageParam) {
      option.limit = Number(limitParam);
      option.offset = Number(pageParam * limitParam - 1);
    }

    // if (pageParam) {
    // }

    if (sortingParam) {
      switch (sortingParam) {
        case "1":
          option.order[0] = ["id", "DESC"];
          break;
        case "2":
          option.order[0] = ["id", "ASC"];
          break;
        case "3":
          option.order[0] = ["price", "ASC"];
          break;
        default:
          option.order[0] = ["price", "DESC"];
          break;
      }
    }

    if (authorizationFilterParam) {
      option.where = {
        userId: {
          [Op.not]: authorizationFilterParam,
        },
      };
    }

    if (userIdParam) {
      option.include[2].where = {
        publicId: userIdParam,
      };
    }

    if (isPublishedParam) {
      option.where.isPublished = true;
    } else if (isPublishedParam === false) {
      option.where.isPublished = false;
    }

    if (isAvailableParam) {
      option.where.isAvailable = true;
    } else if (isAvailableParam === false) {
      option.where.isAvailable = false;
    }

    const product = await Product.findAll(option);

    if (product.length > 0) {
      return product.map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          price: item.price,
          imageUrl:
            typeof item.ProductImages[0] != "undefined"
              ? item.ProductImages[0].imageUrl
              : null,
          category: item.ProductCategories.map((item) => {
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

  static async isProductExists(publicIdParam) {
    return await Product.findOne({
      attributes: ["id", "publicId"],
      where: {
        publicId: publicIdParam,
      },
    });
  }

  static async createProduct(
    nameParam,
    descriptionParam,
    priceParam,
    userIdParam,
    isPublishedParam,
    transactionParam
  ) {
    return await Product.create(
      {
        publicId: await generateUUID(),
        name: nameParam,
        description: descriptionParam,
        price: priceParam,
        isPublished: isPublishedParam,
        userId: userIdParam,
      },
      { transaction: transactionParam }
    );
  }

  static async addProductImage(productImageListParam, transactionParam) {
    return await ProductImage.bulkCreate(productImageListParam, {
      transaction: transactionParam,
    });
  }

  static async addProductCategory(productCategoryListParam, transactionParam) {
    return await ProductCategory.bulkCreate(productCategoryListParam, {
      transaction: transactionParam,
    });
  }

  static async updateProduct(
    nameParam,
    descriptionParam,
    priceParam,
    userIdParam,
    publicIdParam,
    transactionParam
  ) {
    return await Product.update(
      {
        name: nameParam,
        description: descriptionParam,
        price: priceParam,
      },
      {
        where: {
          publicId: publicIdParam,
          userId: userIdParam,
        },
      },
      { transaction: transactionParam }
    );
  }

  static async deleteProduct(publicIdParam, userIdParam) {
    return await Product.destroy({
      where: {
        publicId: publicIdParam,
        userId: userIdParam,
      },
    });
  }

  static async deleteProductCategory(publicIdParam, transactionParam) {
    return await ProductCategory.destroy({
      where: {
        productId: publicIdParam,
      },
      transaction: transactionParam,
    });
  }

  static async deleteProductImage(publicIdParam, transactionParam) {
    return await ProductImage.destroy(
      {
        where: {
          productId: publicIdParam,
        },
      },
      { transaction: transactionParam }
    );
  }

  static async getProductCategoryList() {
    return await Category.findAll({
      attributes: ["id", "name"],
    });
  }

  static async searchProduct(searchKeyParam, authorizationFilterParam) {
    const option = {
      attributes: ["publicId", "name", "price"],
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
        {
          model: User,
          attributes: ["publicId"],
        },
      ],
      order: [
        [ProductImage, "id", "ASC"],
        [ProductCategory, "id", "ASC"],
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: "%" + searchKeyParam + "%",
            },
          },
          {
            description: {
              [Op.iLike]: "%" + searchKeyParam + "%",
            },
          },
        ],
      },
    };

    if (authorizationFilterParam) {
      option.where.userId = {
        [Op.not]: authorizationFilterParam,
      };
    }

    const product = await Product.findAll(option);

    if (product.length > 0) {
      return product.map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          price: item.price,
          imageUrl:
            typeof item.ProductImages[0] != "undefined"
              ? item.ProductImages[0].imageUrl
              : null,
          category: item.ProductCategories.map((item) => {
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

  static async setPublishProduct(publicIdParam) {
    return await Product.update(
      {
        isPublished: true,
      },
      {
        where: {
          publicId: publicIdParam,
        },
      }
    );
  }
}

module.exports = ProductService;
