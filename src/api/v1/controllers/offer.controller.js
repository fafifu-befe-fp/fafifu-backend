"use strict";
const { Offer, Product } = require("../models");
const { ProductService, OfferService } = require("../services");

class OfferController {
  static async get(req, res, next) {
    try {
      const offer = await Offer.findAll({
        where: {
          publicId: req.params.id,
        },
      });

      if (offer.length > 0) {
        const data = await OfferService.getDetailOffer(req.params.id);
        res.status(200).json({
          data: data,
        });
      } else {
        throw {
          status: 404,
          message: "Offer not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async list(req, res, next) {
    try {
      const data = await OfferService.getOfferList(req.user.id);
      if (data.length > 0) {
        res.status(200).json({
          data,
        });
      } else {
        throw {
          status: 404,
          message: "Offer list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async soldList(req, res, next) {
    try {
      const data = await OfferService.getSoldProduct(req.user.id);
      if (data.length > 0) {
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
    try {
      const product = await ProductService.isProductExists(req.params.id);
      if (product) {
        const offer = await OfferService.isOfferExists(req.user.id, product.id);

        if (offer) {
          res.status(400).json({
            message: "Offer already exists",
          });
        } else {
          await OfferService.createOffer(
            req.user.id,
            product.id,
            req.body.price
          );

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
