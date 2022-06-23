const { Produk } = require("../models");

module.exports = async (
  namaParam,
  deskripsiParam,
  hargaParam,
  userIdParam,
  idParam
) => {
  await Produk.update(
    {
      nama: namaParam,
      deskripsi: deskripsiParam,
      harga: hargaParam,
      userId: userIdParam,
    },
    {
      where: {
        id: idParam,
      },
    }
  );
};
