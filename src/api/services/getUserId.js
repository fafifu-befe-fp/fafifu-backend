const { User } = require("../models");

module.exports = async (publicIdParam) => {
  const result = await User.findOne({
    attributes: ["id"],
    where: {
      publicId: publicIdParam,
    },
  });

  return result.id;
};
