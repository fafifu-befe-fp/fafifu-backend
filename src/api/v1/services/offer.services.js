"use strict";
const { generateUUID } = require("../helpers");
const {
  Offer,
  Product,
  ProductCategory,
  Category,
  ProductImage,
  UserBiodata,
  User,
} = require("../models");

class OfferService {
  static async getDetailOffer(publicIdParam) {
    const offer = await Offer.findOne({
      include: [
        {
          model: Product,
          attributes: ["publicId", "name", "price"],
          include: [
            {
              model: ProductImage,
              attributes: ["imageUrl"],
            },
          ],
        },
        {
          model: UserBiodata,
          attributes: ["name", "city", "imageUrl", "handphone"],
        },
      ],
      where: {
        publicId: publicIdParam,
      },
      order: [[Product, ProductImage, "id", "ASC"]],
    });

    const result = {
      offer: {
        publicId: offer.publicId,
        price: offer.price,
        status: offer.statusOfferId,
        createdAt: offer.createdAt,
      },
      buyer: {
        name: offer.UserBiodatum.name,
        city: offer.UserBiodatum.city,
        imageUrl: offer.UserBiodatum.imageUrl,
        handphone: offer.UserBiodatum.handphone,
      },
      product: {
        publicId: offer.Product.publicId,
        name: offer.Product.name,
        price: offer.Product.price,
        imageUrl: offer.Product.ProductImages[0].imageUrl,
      },
    };

    return result;
  }

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
