const { Penawaran } = require("../models");
const { getProdukId, getUserId } = require("../services");
const getPenawaranList = require("../services/getPenawaranList");
const isPenawaranExists = require("../services/isPenawaranExists");

class PenawaranController {
  static async list(req, res, next) {
    try {
      console.log("req.user.id", req.user.id);
      res.status(200).json({
        data: await getPenawaranList(req.user.id),
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const penawaran = await isPenawaranExists(
        req.user.id,
        await getProdukId(req.body.produkId)
      );
      if (penawaran) {
        res.status(400).json({
          message: "Penawaran already exists",
        });
      } else {
        const penawaran = await Penawaran.create({
          penawarId: req.user.id,
          produkId: await getProdukId(req.body.produkId),
          harga: req.body.harga,
        });
        res.status(200).json({
          message: "Success add penawaran",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async accept(req, res, next) {
    try {
      const penawaran = Penawaran.update(
        {
          // 0 : Tolak, 1:Terima, 2 :Selesai
          statusPenawaranId: 1,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({
        message: "Success accept penawaran",
      });
    } catch (error) {
      next(error);
    }
  }

  static async decline(req, res, next) {
    try {
      const penawaran = Penawaran.update(
        {
          // 0 : Tolak, 1:Terima, 2 :Selesai
          statusPenawaranId: 0,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({
        message: "Success decline penawaran",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PenawaranController;
