const { User, UserBiodata } = require("../models");

module.exports = async (idParam) => {
  const data = await User.findOne({
    attributes: ["email", "publicId"],
    include: {
      model: UserBiodata,
    },
    where: {
      id: idParam,
    },
  });

  const result = {
    publicId: data.publicId,
    email: data.email,
    name: data.UserBiodatum.name,
    city: data.UserBiodatum.city,
    address: data.UserBiodatum.address,
    handphone: data.UserBiodatum.handphone,
    imageUrl: data.UserBiodatum.imageUrl,
  };

  return result;
};
