const { isEmailExists } = require("../services");
const { comparePassword, generateJWT } = require("../helpers");
const { User, UserBiodata } = require("../models");

class LoginController {
  static async login(req, res, next) {
    try {
      const user = await isEmailExists(req.body.email);

      if (user) {
        if (await comparePassword(req.body.password, user.password)) {
          const dataUser = await User.findOne({
            attributes: ["id", "email"],
            where: { id: user.id },
            include: [
              {
                model: UserBiodata,
                attributes: [
                  "name",
                  "imageUrl",
                  "city",
                  "address",
                  "handphone",
                ],
              },
            ],
          });
          res.status(200).json({
            data: {
              token: await generateJWT(user.publicId, user.email),
              user: {
                id: dataUser.id,
                name: dataUser.UserBiodatum.name,
                email: dataUser.email,
                imageUrl: dataUser.UserBiodatum.imageUrl,
                city: dataUser.UserBiodatum.city,
                address: dataUser.UserBiodatum.address,
                handphone: dataUser.UserBiodatum.handphone,
              },
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
