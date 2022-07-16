"use strict";
const {
  Notification,
  Offer,
  Product,
  ProductImage,
  StatusNotificationDetail,
} = require("../models");
const { Op } = require("sequelize");

class NotificationService {
  static async getNotification(userIdParam, isReadParam) {
    return (
      await Notification.findAll({
        attributes: ["publicId", "statusNotificationId", "isRead", "createdAt"],
        include: [
          {
            model: Product,
            attributes: ["publicId", "name", "price"],
            include: {
              model: ProductImage,
              attributes: ["imageUrl"],
            },
          },
          {
            model: Offer,
            attributes: ["publicId", "price"],
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
          isRead: isReadParam,
          userId: userIdParam,
        },
      })
    ).map((item) => {
      if (item.statusNotificationId === 1) {
        return {
          publicId: item.publicId,
          statusNotification: item.StatusNotificationDetail.description,
          product: {
            publicId: item.Product.publicId,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.ProductImages[0].imageUrl,
          },
          offer: {
            publicId: item.Offer.publicId,
            price: item.Offer.price,
          },
          createdAt: item.createdAt,
          isRead: item.isRead,
        };
      }
      if (item.statusNotificationId === 2) {
        return {
          publicId: item.publicId,
          statusNotification: item.StatusNotificationDetail.description,
          product: {
            publicId: item.Product.publicId,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.ProductImages[0].imageUrl,
          },
          offer: {
            publicId: item.Offer.publicId,
            price: item.Offer.price,
          },
          createdAt: item.createdAt,
          isRead: item.isRead,
        };
      }
      if (item.statusNotificationId === 3) {
        return {
          publicId: item.publicId,
          statusNotification: item.StatusNotificationDetail.description,
          product: {
            publicId: item.Product.publicId,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.ProductImages[0].imageUrl,
          },
          createdAt: item.createdAt,
          isRead: item.isRead,
        };
      }
      if (item.statusNotificationId === 4) {
        return {
          publicId: item.publicId,
          statusNotification: item.StatusNotificationDetail.description,
          product: {
            publicId: item.Product.publicId,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.ProductImages[0].imageUrl,
          },
          offer: {
            publicId: item.Offer.publicId,
            price: item.Offer.price,
          },
          createdAt: item.createdAt,
          isRead: item.isRead,
        };
      }
    });
  }

  static async isNotificationExists(publicIdParam) {
    return await Notification.findOne({
      where: {
        publicId: publicIdParam,
      },
    });
  }

  static async setReadNotification(userIdParam, publicIdParam) {
    return await Notification.update(
      {
        isRead: true,
      },
      {
        where: {
          userId: userIdParam,
          publicId: publicIdParam,
        },
      }
    );
  }

  static async removeNotification(userIdParam, publicIdParam) {
    return await Notification.destroy({
      where: {
        userId: userIdParam,
        publicId: publicIdParam,
      },
    });
  }

  static async removeAllNotification(userIdParam) {
    return await Notification.destroy({
      where: {
        userId: userIdParam,
      },
    });
  }
}

module.exports = NotificationService;
