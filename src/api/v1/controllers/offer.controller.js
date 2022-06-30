const {
  Offer,
  Product,
  UserBiodata,
  ProductCategory,
  Category,
  ProductImage,
  Notification,
} = require("../models");
const { getUserId, getProductId } = require("../services");
const { generateUUID } = require("../helpers");
const getOfferList = require("../services/getOfferList");
const isOfferExists = require("../services/isOfferExists");

class OfferController {
  static async list(req, res, next) {
    try {
      const data = await Offer.findAll({
        include: [
          {
            model: Product,
            include: [
              {
                model: ProductCategory,
                include: {
                  model: Category,
                },
              },
              {
                model: ProductImage,
              },
            ],
          },
          {
            model: UserBiodata,
          },
        ],
      });

      const result = data.map((item) => {
        return {
          publicId: item.publicId,
          name: item.Product.name,
          description: item.Product.description,
          price: item.Product.price,
          offerPrice: item.price,
          statusOfferId: item.statusOfferId,
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
          name: item.UserBiodatum.name,
          city: item.UserBiodatum.city,
          address: item.UserBiodatum.address,
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
      const offer = await isOfferExists(
        req.user.id,
        await getProductId(req.body.productId)
      );

      const notification = await Notification.create({
        userId: req.user.id,
        productId: await getProductId(req.body.productId),
      });

      if (offer) {
        res.status(400).json({
          message: "Offer already exists",
        });
      } else {
        const offer = await Offer.create({
          buyerId: req.user.id,
          publicId: await generateUUID(),
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
