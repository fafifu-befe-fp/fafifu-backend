const { Offer } = require("../models");
const { Op } = require("sequelize");

module.exports = async (buyerIdParam, productIdParam) => {
  const offer = await Offer.findOne({
    where: {
      buyerId: buyerIdParam,
      productId: productIdParam,
      statusOfferId: null,
    },
  });

  if (offer) {
    return true;
  } else {
    return false;
  }
};
