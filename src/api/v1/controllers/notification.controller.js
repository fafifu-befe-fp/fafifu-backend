"use strict";
const {
  Notification,
  Offer,
  Product,
  ProductImage,
  StatusNotificationDetail,
} = require("../models");
class NotificationController {
  static async get(req, res, next) {
    try {
      const notification = (
        await Notification.findAll({
          attributes: ["publicId", "statusNotificationId", "isRead"],
          include: [
            {
              model: Product,
              attributes: ["name", "price"],
              include: {
                model: ProductImage,
                attributes: ["imageUrl"],
              },
            },
            {
              model: Offer,
              attributes: ["price"],
              require: false,
            },
            {
              model: StatusNotificationDetail,
              attributes: ["description"],
            },
          ],
          order: [
            ["createdAt", "DESC"],
            [Product, ProductImage, "id", "ASC"],
          ],
          where: {
            isRead: false,
            userId: req.user.id,
          },
        })
      ).map((item) => {
        if (item.statusNotificationId === 3) {
          return {
            statusNotification: item.StatusNotificationDetail.description,
            publicId: item.publicId,
            productName: item.Product.name,
            productPrice: item.Product.price,
            productImage: item.Product.ProductImages[0].imageUrl,
          };
        }
        if (item.statusNotificationId === 4) {
          return {
            statusNotification: item.StatusNotificationDetail.description,
            publicId: item.publicId,
            productName: item.Product.name,
            productPrice: item.Product.price,
            offerPrice: item.Offer.price,
            productImage: item.Product.ProductImages[0].imageUrl,
          };
        }
      });

      if (notification.length !== 0) {
        res.status(200).json({
          data: notification,
        });
      } else {
        throw {
          status: 404,
          message: "Notification not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    // try {
    //   const notification = await Notification.findAll({
    //     include: {
    //       model: Offer,
    //       include: {
    //         model: Product,
    //       },
    //     },
    //     where: {
    //       userId: req.user.id,
    //     },
    //   });
    //   res.status(200).json({
    //     data: notification,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  }

  static async setRead(req, res, next) {
    try {
      await Notification.update(
        {
          isRead: true,
        },
        {
          where: {
            userId: req.user.id,
            publicId: req.params.id,
          },
        }
      );

      res.status(200).json({
        message: "Success read notification",
      });
    } catch (error) {
      next(error);
    }
  }

  static async setAllRead(req, res, next) {
    try {
      await Notification.update(
        {
          isRead: true,
        },
        {
          where: {
            userId: req.user.id,
          },
        }
      );

      res.status(200).json({
        message: "Success read all notification",
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      await Notification.destroy({
        where: {
          publicId: req.params.id,
          userId: req.user.id,
        },
      });
      res.status(200).json({
        message: "Success remove notification",
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeAll(req, res, next) {
    try {
      await Notification.destroy({
        where: {
          userId: req.user.id,
        },
      });
      res.status(200).json({
        message: "Success remove all notification",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NotificationController;
