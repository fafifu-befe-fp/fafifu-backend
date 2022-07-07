const { sequelize, User, UserBiodata } = require("../models");
const { hashPassword, generateUUID, cloudinary } = require("../helpers");
const { updateUser } = require("../services");
const getUserProfile = require("../services/getUserProfile");
const fs = require("fs");

class UserController {
  static async get(req, res, next) {
    try {
      const user = await getUserProfile(req.user.id);

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
        await updateUser(
          req.body.name,
          req.body.city,
          req.body.address,
          req.body.handphone,
          image.secure_url,
          user.id
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
