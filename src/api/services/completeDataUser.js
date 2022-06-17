const { UserBiodata } = require("../models");

module.exports = async (
  namaParam,
  kotaParam,
  alamatParam,
  handphoneParam,
  avatarUrlParam,
  userIdParam
) => {
  await UserBiodata.create({
    nama: namaParam,
    kota: kotaParam,
    alamat: alamatParam,
    handphone: handphoneParam,
    avatarUrl: avatarUrlParam,
    userId: userIdParam,
  });
};
