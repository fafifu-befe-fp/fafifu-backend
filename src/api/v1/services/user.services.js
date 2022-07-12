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
}

module.exports = UserService;
