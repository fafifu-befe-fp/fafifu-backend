const {
  getProduk,
  getProdukList,
  getUserByPublicId,
  getProdukListByUserId,
} = require("../services");

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
}

module.exports = ProdukController;
