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
          attributes: ["publicId", "statusNotificationId"],
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
            publicId: item.publicId,
            productName: item.Product.name,
            productPrice: item.Product.price,
            productImage: item.Product.ProductImages[0].imageUrl,
            statusNotification: item.StatusNotificationDetail.description,
          };
        }
      });

      res.status(200).json({
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const notification = await Notification.findAll({
        include: {
          model: Offer,
          include: {
            model: Product,
          },
        },
        where: {
          userId: req.user.id,
        },
      });

      res.status(200).json({
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  static async setRead(req, res, next) {
    try {
      await Notification.update(
        {
          statusNotificationId: 1,
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
          statusNotificationId: 1,
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
