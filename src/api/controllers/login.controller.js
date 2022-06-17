const isEmailExists = require("../services/isEmailExists");
const comparePassword = require("../helpers/comparePassword");
const generateJWT = require("../helpers/generateJWT");

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
            message: "Invalid username or password",
          };
        }
      } else {
        throw {
          status: 401,
          message: "Invalid username or password",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

https: module.exports = LoginController;
