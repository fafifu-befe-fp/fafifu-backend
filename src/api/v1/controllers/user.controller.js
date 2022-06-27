const { sequelize, User, UserBiodata } = require("../models");
const { hashPassword, generateUUID } = require("../helpers");
const { updateUser } = require("../services");

class UserController {
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
      res.status(200).json({
        message: "Success register user",
      });
    } catch (error) {
      await registerUserTransaction.rollback();
      next(error);
    }
  }

  static async isDataCompleted(req, res, next) {
    try {
      const userBiodata = await UserBiodata.findOne({
        attributes: ["name", "city", "address", "handphone", "imageUrl"],
        where: {
          userId: req.user.id,
        },
      });

      if (
        userBiodata.city === null ||
        userBiodata.address === null ||
        userBiodata.handphone === null ||
        userBiodata.imageUrl === null
      ) {
        res.status(400).json({
          value: false,
          message: "user data is not completed, please complete the data.",
          data: userBiodata,
        });
      } else {
        res.status(200).json({
          value: true,
          message: "user data is completed",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      if (req.file) {
        req.body.avatar = `http://127.0.0.1:3000/avatar/${req.file.filename}`;
      }
      const user = req.user;

      if (user) {
        await updateUser(
          req.body.name,
          req.body.city,
          req.body.address,
          req.body.handphone,
          req.body.avatar,
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
