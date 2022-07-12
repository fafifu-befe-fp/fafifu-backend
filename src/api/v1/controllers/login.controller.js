"use strict";
const { comparePassword, generateJWT } = require("../helpers");
const { UserService } = require("../services");

class LoginController {
  static async login(req, res, next) {
    try {
      const user = await UserService.isEmailExists(req.body.email);

      if (user) {
        const isPasswordValid = await comparePassword(
          req.body.password,
          user.password
        );
        if (isPasswordValid) {
          res.status(200).json({
            data: {
              token: await generateJWT(user.publicId, user.email),
              user: await UserService.getProfile(user.id),
            },
          });
        } else {
          throw {
            status: 401,
            message: "Invalid email or password",
          };
        }
      } else {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
