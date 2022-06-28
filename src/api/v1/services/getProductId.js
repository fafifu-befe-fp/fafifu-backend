const { Product } = require("../models");

module.exports = async (publicIdParam) => {
  const result = await Product.findOne({
    attributes: ["id"],
    where: {
      publicId: publicIdParam,
    },
  });

  if (result) {
    return result.id;
  } else {
    return null;
  }
};
