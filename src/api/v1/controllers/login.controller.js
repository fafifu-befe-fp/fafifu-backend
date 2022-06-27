const { isEmailExists } = require("../services");
const { comparePassword, generateJWT } = require("../helpers");

class LoginController {
  static async login(req, res, next) {
    try {
      const user = await isEmailExists(req.body.email);

      if (user) {
        if (await comparePassword(req.body.password, user.password)) {
          res.status(200).json({
            data: {
              token: await generateJWT(user.publicId, user.email),
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

https: module.exports = LoginController;
