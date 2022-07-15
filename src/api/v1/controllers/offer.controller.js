"use strict";
const {
  Offer,
  Product,
  UserBiodata,
  ProductCategory,
  Category,
  ProductImage,
} = require("../models");
const { generateUUID } = require("../helpers");
const { ProductService } = require("../services");

class OfferController {
  static async list(req, res, next) {
    try {
      const data = await Offer.findAll({
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
              userId: req.user.id,
            },
          },
          {
            model: UserBiodata,
            attributes: ["name"],
          },
        ],
      });

      const result = data.map((item) => {
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

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const product = await ProductService.isProductExists(req.params.id);
      if (product) {
        const offer = await Offer.findOne({
          where: {
            buyerId: req.user.id,
            productId: product.id,
            statusOfferId: null,
          },
        });

        if (offer) {
          res.status(400).json({
            message: "Offer already exists",
          });
        } else {
          console.log("product", product);

          await Offer.create({
            buyerId: req.user.id,
            publicId: await generateUUID(),
            productId: product.id,
            price: req.body.price,
          });

          res.status(200).json({
            message: "Success add offer",
          });
        }
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

  static async update(req, res, next) {
    try {
      const offer = await Offer.findOne({
        include: {
          model: Product,
          where: {
            userId: req.user.id,
          },
        },
        where: {
          publicId: req.params.id,
        },
      });

      if (offer) {
        await Offer.update(
          {
            //  1:Accepted, 2 :Rejected
            statusOfferId: req.body.statusOfferId,
          },
          {
            where: {
              publicId: req.params.id,
            },
          }
        );
        res.status(200).json({
          message: "Success update status offer",
        });
      } else {
        res.status(404).json({
          message: "Offer not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OfferController;
