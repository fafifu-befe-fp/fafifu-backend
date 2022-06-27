const { Product } = require("../models");

module.exports = async (
  nameParam,
  descriptionParam,
  priceParam,
  userIdParam,
  idParam
) => {
  await Product.update(
    {
      name: nameParam,
      description: descriptionParam,
      price: priceParam,
      userId: userIdParam,
    },
    {
      where: {
        id: idParam,
      },
    }
  );
};
