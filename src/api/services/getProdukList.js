const { Produk, ProdukKategori, Kategori } = require("../models");

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
    };
  });

  return result;
};
