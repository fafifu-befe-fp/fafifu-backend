"use strict";
const { sequelize, User, UserBiodata } = require("../models");
const { hashPassword, generateUUID, cloudinary } = require("../helpers");
const fs = require("fs");

class UserController {
  static async get(req, res, next) {
    try {
      const user = await User.findOne({
        attributes: ["email", "publicId"],
        include: {
          model: UserBiodata,
        },
        where: {
          id: req.user.id,
        },
      });

      const result = {
        publicId: user.publicId,
        email: user.email,
        name: user.UserBiodatum.name,
        city: user.UserBiodatum.city,
        address: user.UserBiodatum.address,
        handphone: user.UserBiodatum.handphone,
        imageUrl: user.UserBiodatum.imageUrl,
      };

      if (result) {
        res.status(200).json({
          data: result,
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
    try {
      const registerUserTransaction = await sequelize.transaction();

      const user = await User.create(
        {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          publicId: await generateUUID(),
        },
        { transaction: registerUserTransaction }
      );

      await UserBiodata.create(
        {
          userId: user.id,
          name: req.body.name,
        },
        { transaction: registerUserTransaction }
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
      const image = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      const user = req.user;

      if (user) {
        await UserBiodata.update(
          {
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            handphone: req.body.handphone,
            imageUrl: image.secure_url,
          },
          {
            where: {
              userId: user.id,
            },
          }
        );

        res.status(200).json({
          message: "Success Update data user",
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
