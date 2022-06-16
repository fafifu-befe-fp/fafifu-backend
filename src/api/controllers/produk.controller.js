// const { sequelize, Produk, ProdukKategori, Kategori } = require("../models");
const getProdukList = require("../services/getProdukList");
const getUserByPublicId = require("../services/getUserByPublicId");
const getProdukListByUserId = require("../services/getProdukListByUserId");

class ProdukController {
  static async list(req, res, next) {
    try {
      res.status(200).json({
        data: await getProdukList(),
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProdukListByUserId(req, res, next) {
    try {
      const user = await getUserByPublicId(req.params.id);

      if (user) {
        res.status(200).json({
          data: await getProdukListByUserId(req.params.id),
        });
      } else {
        throw {
          status: 404,
          message: "Seller not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  // static async add(req, res, next) {
  //   // if (req.file) {
  //   //   req.body.video = `http://127.0.0.1:3000/videos/${req.file.filename}`;
  //   // }

  //   const addProdukTransaction = await sequelize.transaction();

  //   try {
  //     const produk = await Produk.create(
  //       {
  //         nama: req.body.nama,
  //         deskripsi: req.body.deskripsi,
  //         userId: req.user.id,
  //       },
  //       { transaction: addProdukTransaction }
  //     );

  //     const produkKategori = await ProdukKategori.create(
  //       {
  //         produkId: produk.id,
  //         kategoriId: req.body.kategoriId,
  //       },
  //       { transaction: addProdukTransaction }
  //     );

  //     await addProdukTransaction.commit();

  //     res.status(200).json({
  //       message: "Success add user",
  //     });
  //   } catch (error) {
  //     await addProdukTransaction.rollback();
  //     next(error);
  //   }
  // }
}

module.exports = ProdukController;
