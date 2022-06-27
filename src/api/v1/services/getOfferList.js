const { Offer, Product } = require("../models");

module.exports = async (userIdParam) => {
  const data = await Offer.findAll({
    // attributes: ["id", "penawarId", "produkId", "harga", "statusPenawaranId"],
    // include: [
    //   {
    //     model: Product,
    //     where: {
    //       userId: userIdParam,
    //     },
    //   },
    // ],
  });

  return data;
};
