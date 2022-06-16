const { Produk, ProdukKategori, Kategori, PotoProduk } = require("../models");

module.exports = async () => {
  const data = await Produk.findAll({
    attributes: ["publicId", "nama", "deskripsi", "harga"],
    include: [
      {
        model: ProdukKategori,
        include: [
          {
            model: Kategori,
            attributes: ["id", "nama"],
          },
        ],
      },
      {
        model: PotoProduk,
        attributes: ["urlFotoProduk"],
      },
    ],
  });

  const result = data.map((item) => {
    return {
      publicId: item.publicId,
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: item.harga,
      userId: item.userId,
      kategori: item.ProdukKategoris.map((item) => {
        return {
          kategoriId: item.Kategori.id,
          nama: item.Kategori.nama,
        };
      }),
      foto: item.PotoProduks.map((item) => {
        return {
          urlFotoProduk: item.urlFotoProduk,
        };
      }),
    };
  });

  return result;
};
