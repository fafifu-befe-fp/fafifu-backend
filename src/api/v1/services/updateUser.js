const { UserBiodata } = require("../models");

module.exports = async (
  nameParam,
  cityParam,
  addressParam,
  handphoneParam,
  imageUrlParam,
  userIdParam
) => {
  await UserBiodata.update(
    {
      name: nameParam,
      city: cityParam,
      address: addressParam,
      handphone: handphoneParam,
      imageUrl: imageUrlParam,
    },
    {
      where: {
        userId: userIdParam,
      },
    }
  );
};
