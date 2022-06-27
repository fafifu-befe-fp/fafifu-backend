const {
  getProduct,
  getUserByPublicId,
  updateProduk,
  getProdukId,
  getProductListByUserId,
} = require("../services");
const { generateUUID } = require("../helpers");
const { Op } = require("sequelize");

const {
  sequelize,
  Product,
  ProductImage,
  ProductCategory,
  Category,
} = require("../models");
class ProductController {
  static async get(req, res, next) {
    try {
      const produk = await getProduct(req.params.id);

      if (produk.length != 0) {
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
      const option = {
        attributes: ["publicId", "name", "description", "price"],
        include: [
          {
            model: ProductCategory,
            include: [
              {
                model: Category,
                attributes: ["id", "name"],
              },
            ],
            where: {},
          },
          {
            model: ProductImage,
            attributes: ["imageUrl"],
          },
        ],
      };

      if (req.query.categoryId) {
        option.include[0].where.categoryId = Number(req.query.categoryId);
      }

      if (req.query.limit) {
        option.limit = Number(req.query.limit);
      }
      if (req.query.page) {
        option.offset = Number(req.query.page - 1);
      }

      // if (req.user.id) {
      //   option.where = {
      //     userId: {
      //       [Op.not]: req.user.id,
      //     },
      //   };
      // }

      const product = await Product.findAll(option);

      res.status(200).json({
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const addProductTransaction = await sequelize.transaction();
    try {
      const product = await Product.create(
        {
          publicId: await generateUUID(),
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          userId: req.user.id,
        },
        { transaction: addProductTransaction }
      );

      let productImageList = [];

      if (req.files) {
        for (let index = 0; index < req.files.length; index++) {
          productImageList.push({
            productId: product.id,
            imageUrl: `http://127.0.0.1:3000/foto-produk/${req.files[index].filename}`,
          });
        }
      }

      const productImage = await ProductImage.bulkCreate(productImageList, {
        transaction: addProductTransaction,
      });

      await addProductTransaction.commit();
      res.status(200).json({
        message: "Success register product",
      });
    } catch (error) {
      await addProductTransaction.rollback();
      next(error);
    }
  }

  static async getProductListByUserId(req, res, next) {
    try {
      const user = await getUserByPublicId(req.params.id);

      if (user) {
        res.status(200).json({
          data: await getProductListByUserId(req.params.id),
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

module.exports = ProductController;
