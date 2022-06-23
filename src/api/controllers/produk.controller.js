const {
  getProduk,
  getUserByPublicId,
  getProdukListByUserId,
  getUpdateProduk,
  getProdukList,
  updateProduk,
  getProdukId,
} = require("../services");
const { generateUUID } = require("../helpers");

const { sequelize, Produk, PotoProduk } = require("../models");
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

      let fotoProdukList = [];

      if (req.files) {
        for (let index = 0; index < req.files.length; index++) {
          fotoProdukList.push({
            produkId: produk.id,
            urlFotoProduk: `http://127.0.0.1:3000/foto-produk/${req.files[index].filename}`,
          });
        }
      }

      const fotoProduk = await PotoProduk.bulkCreate(fotoProdukList, {
        transaction: addProdukTransaction,
      });

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

  static async update(req, res, next) {
    try {
      console.log("req.body", req.body);
      console.log("req.user.id", req.user.id);
      await updateProduk(
        req.body.nama,
        req.body.deskripsi,
        req.body.harga,
        req.user.id,
        await getProdukId(req.body.publicId)
      );

      res.status(200).json({
        message: "Success update product",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProdukController;
