"use strict";
const { generateUUID } = require("../helpers");
const {
  Offer,
  Product,
  ProductCategory,
  Category,
  ProductImage,
  UserBiodata,
} = require("../models");

class OfferService {
  static async getOfferList(userIdParam) {
    return (
      await Offer.findAll({
        attributes: ["publicId", "price"],
        include: [
          {
            model: Product,
            attributes: ["publicId", "name", "price"],
            include: [
              {
                model: ProductCategory,
                attributes: ["id"],
                include: {
                  model: Category,
                  attributes: ["name"],
                },
              },
              {
                model: ProductImage,
                attributes: ["imageUrl"],
              },
            ],
            where: {
              userId: userIdParam,
            },
          },
          {
            model: UserBiodata,
            attributes: ["name"],
          },
        ],
        order: [
          [Product, ProductImage, "id", "ASC"],
          [Product, ProductCategory, "id", "ASC"],
        ],
      })
    ).map((item) => {
      return {
        offerPublicId: item.publicId,
        productPublicId: item.Product.publicId,
        name: item.Product.name,
        description: item.Product.description,
        productPrice: item.Product.price,
        offerPrice: item.price,
        category: item.Product.ProductCategories.map((item) => {
          return {
            id: item.id,
            name: item.Category.name,
          };
        }),
        imageUrl: item.Product.ProductImages[0].imageUrl,
        buyerName: item.UserBiodatum.name,
      };
    });
  }

  static async getSoldProduct(userIdParam) {
    return (
      await Offer.findAll({
        attributes: ["publicId", "price"],
        include: [
          {
            model: Product,
            attributes: ["publicId", "name", "price"],
            include: [
              {
                model: ProductCategory,
                attributes: ["id"],
                include: {
                  model: Category,
                  attributes: ["name"],
                },
              },
              {
                model: ProductImage,
                attributes: ["imageUrl"],
              },
            ],
            where: {
              userId: userIdParam,
            },
          },
          {
            model: UserBiodata,
            attributes: ["name"],
          },
        ],
        order: [
          [Product, ProductImage, "id", "ASC"],
          [Product, ProductCategory, "id", "ASC"],
        ],
        where: {
          statusOfferId: 3,
        },
      })
    ).map((item) => {
      return {
        offerPublicId: item.publicId,
        productPublicId: item.Product.publicId,
        name: item.Product.name,
        description: item.Product.description,
        productPrice: item.Product.price,
        offerPrice: item.price,
        category: item.Product.ProductCategories.map((item) => {
          return {
            id: item.id,
            name: item.Category.name,
          };
        }),
        imageUrl: item.Product.ProductImages[0].imageUrl,
        buyerName: item.UserBiodatum.name,
      };
    });
  }

  static async isOfferExists(buyerIdParam, productIdParam) {
    return await Offer.findOne({
      where: {
        buyerId: buyerIdParam,
        productId: productIdParam,
        statusOfferId: 0,
      },
    });
  }

  static async createOffer(buyerIdParam, productIdParam, priceParam) {
    return await Offer.create({
      buyerId: buyerIdParam,
      publicId: await generateUUID(),
      productId: productIdParam,
      price: priceParam,
    });
  }
}

module.exports = OfferService;
