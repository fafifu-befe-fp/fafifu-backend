const { Offer } = require("../models");
const { getUserId, getProductId } = require("../services");
const getOfferList = require("../services/getOfferList");
const isOfferExists = require("../services/isOfferExists");

class OfferController {
  static async list(req, res, next) {
    try {
      res.status(200).json({
        data: await getOfferList(req.user.id),
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const offer = await isOfferExists(
        req.user.id,
        await getProductId(req.body.productId)
      );

      if (offer) {
        res.status(400).json({
          message: "Offer already exists",
        });
      } else {
        const offer = await Offer.create({
          buyerId: req.user.id,
          productId: await getProductId(req.body.productId),
          price: req.body.price,
        });
        res.status(200).json({
          message: "Success add offer",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async accept(req, res, next) {
    try {
      const offer = Offer.update(
        {
          // 0 : Tolak, 1:Terima, 2 :Selesai
          statusOfferId: 1,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({
        message: "Success accept offer",
      });
    } catch (error) {
      next(error);
    }
  }

  static async decline(req, res, next) {
    try {
      const offer = Offer.update(
        {
          // 0 : Tolak, 1:Terima, 2 :Selesai
          statusOfferId: 0,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({
        message: "Success decline offer",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OfferController;