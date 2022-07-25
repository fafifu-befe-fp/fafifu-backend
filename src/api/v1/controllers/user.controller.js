"use strict";
const { sequelize } = require("../models");
const { cloudinary } = require("../helpers");
const { UserService } = require("../services");
const fs = require("fs");

class UserController {
  static async get(req, res, next) {
    try {
      const user = await UserService.getProfile(req.user.id);

      if (user) {
        res.status(200).json({
          data: user,
        });
      } else {
        throw {
          status: 404,
          message: "User not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    const registerUserTransaction = await sequelize.transaction();
    try {
      const user = await UserService.createUser(
        req.body.email,
        req.body.password,
        registerUserTransaction
      );

      await UserService.createUserBiodata(
        user.id,
        req.body.name,
        registerUserTransaction
      );

      await registerUserTransaction.commit();
      res.status(201).json({
        message: "Success register user",
      });
    } catch (error) {
      await registerUserTransaction.rollback();
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      let image;
      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
      }

      if (req.user) {
        await UserService.updateUserBiodata(
          req.body.name,
          req.body.city,
          req.body.address,
          req.body.handphone,
          image.secure_url,
          req.user.id
        );

        res.status(200).json({
          message: "Success update data user",
        });
      } else {
        throw {
          status: 404,
          message: "User not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
