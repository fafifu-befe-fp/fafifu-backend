const { Product } = require("../models");

module.exports = async (publicIdParam) => {
  const result = await Product.findOne({
    attributes: ["id"],
    where: {
      publicId: publicIdParam,
    },
  });

  console.log("result", result);

  return result.id;
};
