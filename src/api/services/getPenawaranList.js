const { Penawaran, Produk } = require("../models");

module.exports = async (userIdParam) => {
  const data = await Penawaran.findAll({
    attributes: ["id", "penawarId", "produkId", "harga", "statusPenawaranId"],
    include: [
      {
        model: Produk,
        where: {
          userId: userIdParam,
        },
      },
    ],

    // attributes: ["publicId", "nama", "deskripsi", "harga"],
    // include: [
    //   {
    //     model: ProdukKategori,
    //     include: [
    //       {
    //         model: Kategori,
    //         attributes: ["id", "nama"],
    //       },
    //     ],
    //   },
    //   {
    //     model: PotoProduk,
    //     attributes: ["urlFotoProduk"],
    //   },
    // ],
  });

  return data;
};
