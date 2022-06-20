const { UserBiodata } = require("../models");

module.exports = async (
  namaParam,
  kotaParam,
  alamatParam,
  handphoneParam,
  avatarUrlParam,
  userIdParam
) => {
  await UserBiodata.update(
    {
      nama: namaParam,
      kota: kotaParam,
      alamat: alamatParam,
      handphone: handphoneParam,
      avatarUrl: avatarUrlParam,
    },
    {
      where: {
        userId: userIdParam,
      },
    }
  );
};
