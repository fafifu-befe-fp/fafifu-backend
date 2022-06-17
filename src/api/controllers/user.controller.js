const { User, UserBiodata } = require("../models");
const { hashPassword, generateUUID } = require("../helpers");
const {
  getUserByPublicId,
  completeDataUser,
  getUserId,
} = require("../services");

class UserController {
  static async add(req, res, next) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: await hashPassword(req.body.password),
        publicId: await generateUUID(),
      });

      res.status(200).json({
        message: "Success add user",
      });
    } catch (error) {
      next(error);
    }
  }

  static async isDataCompleted(req, res, next) {
    try {
      const userBiodata = await UserBiodata.findOne({
        where: {
          userId: await getUserId(req.params.id),
        },
      });

      if (userBiodata) {
        res.status(200).json({
          value: true,
          message: "user data is completed",
        });
      } else {
        res.status(400).json({
          value: false,
          message: "user data is not completed, please complete the data.",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async completeData(req, res, next) {
    try {
      const user = await getUserByPublicId(req.params.id);

      if (user) {
        await completeDataUser(
          req.body.nama,
          req.body.kota,
          req.body.alamat,
          req.body.handphone,
          user.id
        );
        res.status(200).json({
          message: "Success complete data user",
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
