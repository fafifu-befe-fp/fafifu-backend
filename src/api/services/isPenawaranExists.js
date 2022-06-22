const { Penawaran } = require("../models");
const { Op } = require("sequelize");

module.exports = async (penawarIdParam, produkIdParam) => {
  const penawaran = await Penawaran.findOne({
    where: {
      penawarId: penawarIdParam,
      produkId: produkIdParam,
      statusPenawaranId: null,
    },
  });

  if (penawaran) {
    return true;
  } else {
    return false;
  }
};
