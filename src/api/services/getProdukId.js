const { Produk } = require("../models");

module.exports = async (publicIdParam) => {
  const result = await Produk.findOne({
    attributes: ["id"],
    where: {
      publicId: publicIdParam,
    },
  });

  console.log("result", result);

  return result.id;
};
