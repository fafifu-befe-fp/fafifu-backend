const {
  getProduk,
  getProdukList,
  getUserByPublicId,
  getProdukListByUserId,
} = require("../services");
const { generateUUID } = require("../helpers");

const { sequelize, Produk } = require("../models");
class ProdukController {
  static async get(req, res, next) {
    try {
      const produk = await getProduk(req.params.id);
      if (produk) {
        res.status(200).json({
          data: produk,
        });
      } else {
        throw {
          status: 404,
          message: "Product not found",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      res.status(200).json({
        data: await getProdukList(),
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const addProdukTransaction = await sequelize.transaction();
    try {
      const produk = await Produk.create(
        {
          publicId: await generateUUID(),
          nama: req.body.nama,
          deskripsi: req.body.deskripsi,
          harga: req.body.harga,
          userId: req.user.id,
        },
        { transaction: addProdukTransaction }
      );

      // await UserBiodata.create(
      //   {
      //     userId: user.id,
      //     nama: req.body.nama,
      //   },
      //   { transaction: addProdukTransaction }
      // );

      await addProdukTransaction.commit();
      res.status(200).json({
        message: "Success register product",
      });
    } catch (error) {
      await addProdukTransaction.rollback();
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
