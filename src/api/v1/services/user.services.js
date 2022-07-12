const { hashPassword, generateUUID } = require("../helpers");
const { User, UserBiodata } = require("../models");

class UserService {
  static async isEmailExists(emailParam) {
    return await User.findOne({
      where: {
        email: emailParam,
      },
    });
  }

  static async getProfile(idParam) {
    const user = await User.findOne({
      attributes: ["email", "publicId"],
      include: {
        model: UserBiodata,
        attributes: ["name", "imageUrl", "city", "address", "handphone"],
      },
      where: {
        id: idParam,
      },
    });

    return {
      publicId: user.publicId,
      email: user.email,
      name: user.UserBiodatum.name,
      city: user.UserBiodatum.city,
      address: user.UserBiodatum.address,
      handphone: user.UserBiodatum.handphone,
      imageUrl: user.UserBiodatum.imageUrl,
    };
  }

  static async createUser(emailParam, passwordParam, transactionParam) {
    return await User.create(
      {
        email: emailParam,
        password: await hashPassword(passwordParam),
        publicId: await generateUUID(),
      },
      { transaction: transactionParam }
    );
  }

  static async createUserBiodata(userIdParam, nameParam, transactionParam) {
    return await UserBiodata.create(
      {
        userId: userIdParam,
        name: nameParam,
      },
      { transaction: transactionParam }
    );
  }
}

module.exports = UserService;
