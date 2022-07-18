"use strict";
const { Notification } = require("../models");
const { Op } = require("sequelize");

const { NotificationService } = require("../services");
class NotificationController {
  static async get(req, res, next) {
    try {
      const notification = await NotificationService.getNotification(
        req.user.id,
        false
      );

      if (notification.length > 0) {
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
    try {
      const notification = await NotificationService.getNotification(
        req.user.id,
        { [Op.or]: [true, false] }
      );

      if (notification.length > 0) {
        res.status(200).json({
          data: notification,
        });
      } else {
        throw {
          status: 404,
          message: "Notification list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async setRead(req, res, next) {
    try {
      const notification = await NotificationService.isNotificationExists(
        req.params.id
      );

      if (notification) {
        await NotificationService.setReadNotification(
          req.user.id,
          req.params.id
        );

        res.status(200).json({
          message: "Success read notification",
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

  static async setAllRead(req, res, next) {
    try {
      const notification = await Notification.findAll({
        where: {
          userId: req.user.id,
          isRead: false,
        },
      });

      if (notification.length > 0) {
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
      } else {
        throw {
          status: 404,
          message: "Notification list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const notification = await NotificationService.isNotificationExists(
        req.params.id
      );

      if (notification) {
        await NotificationService.removeNotification(
          req.user.id,
          req.params.id
        );

        res.status(200).json({
          message: "Success remove notification",
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

  static async removeAll(req, res, next) {
    try {
      const notification = await Notification.findAll({
        where: {
          userId: req.user.id,
        },
      });

      if (notification.length > 0) {
        await NotificationService.removeAllNotification(req.user.id);
        res.status(200).json({
          message: "Success remove all notification",
        });
      } else {
        throw {
          status: 404,
          message: "Notification list not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NotificationController;
