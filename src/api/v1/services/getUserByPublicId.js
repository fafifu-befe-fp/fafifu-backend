const { User } = require("../models");

module.exports = async (publicIdParam) => {
  const user = await User.findOne({
    attributes: ["id", "email", "publicId"],
    where: {
      publicId: publicIdParam,
    },
  });

  if (user == null) {
    return null;
  }

  return user;
};
