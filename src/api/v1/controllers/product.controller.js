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
  Wishlist,
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

      const result = product.map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.ProductCategories.map((item) => {
            return {
              categoryId: item.Category.id,
              name: item.Category.name,
            };
          }),
          imageUrl: item.ProductImages.map((item) => {
            return {
              imageUrl: item.imageUrl,
            };
          }),
        };
      });

      res.status(200).json({
        data: result,
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

  static async wishlist(req, res, next) {
    try {
      const wishlist = await Wishlist.findAll({
        include: {
          model: Product,
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
        },
        where: {
          userId: req.user.id,
        },
      });

      if (wishlist.length != 0) {
        console.log("wishlist", wishlist);
        const result = wishlist.map((item) => {
          return {
            publicId: item.Product.publicId,
            name: item.Product.name,
            description: item.Product.description,
            price: item.Product.price,
            category: item.Product.ProductCategories.map((item) => {
              return {
                categoryId: item.Category.id,
                name: item.Category.name,
              };
            }),
            imageUrl: item.Product.ProductImages.map((item) => {
              return {
                imageUrl: item.imageUrl,
              };
            }),
          };
        });

        res.status(200).json({
          data: result,
        });
      } else {
        res.status(200).json({
          message: "Wishlist still empty",
        });
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

  static async addWishlist(req, res, next) {
    try {
      if (
        await Wishlist.findOne({
          where: {
            userId: req.user.id,
            productId: await getProductId(req.body.productId),
          },
        })
      ) {
        res.status(422).json({
          message: "Wishlist already exists",
        });
      } else {
        Wishlist.create({
          userId: req.user.id,
          productId: await getProductId(req.body.productId),
        });
      }

      res.status(200).json({
        message: "Success add wishlist",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      if (
        await Wishlist.findOne({
          where: {
            userId: req.user.id,
            productId: await getProductId(req.body.productId),
          },
        })
      ) {
        Wishlist.destroy({
          where: {
            userId: req.user.id,
            productId: await getProductId(req.body.productId),
          },
        });
        res.status(200).json({
          message: "Success delete wishlist",
        });
      } else {
        res.status(404).json({
          message: "Wishlist not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
