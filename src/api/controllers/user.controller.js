const { User } = require("../models");
const generateUUID = require("../helpers/generateUUID");
const hashPassword = require("../helpers/hashPassword");

class UserController {
  static async add(req, res, next) {
    try {
      const user = await User.create({
        publicId: await generateUUID(),
        email: req.body.email,
        password: await hashPassword(req.body.password),
      });

      res.status(200).json({
        message: "Success add user",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
