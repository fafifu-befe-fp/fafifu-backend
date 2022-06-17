const { UserBiodata } = require("../models");

module.exports = async (
  namaParam,
  kotaParam,
  alamatParam,
  handphoneParam,
  userIdParam
) => {
  console.log(
    "namaParam",
    namaParam,
    kotaParam,
    alamatParam,
    handphoneParam,
    userIdParam
  );
  await UserBiodata.create({
    nama: namaParam,
    kota: kotaParam,
    alamat: alamatParam,
    handphone: handphoneParam,
    userId: userIdParam,
  });
};
