const {
  Product,
  ProductImage,
  ProductCategory,
  Category,
  User,
  UserBiodata,
  Wishlist,
  Offer,
} = require("../models");
const { Op } = require("sequelize");
const { generateUUID } = require("../helpers");

class ProductService {
  static async getProductDetail(publicIdParam, authorizationParam) {
    let option = {
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
        },
        {
          model: ProductImage,
          attributes: ["imageUrl"],
        },
        {
          model: User,
          attributes: ["publicId"],
          include: [
            {
              model: UserBiodata,
              attributes: ["name", "city", "address", "handphone", "imageUrl"],
            },
          ],
        },
      ],
      order: [
        [ProductImage, "id", "ASC"],
        [ProductCategory, "id", "ASC"],
      ],
      where: {
        publicId: publicIdParam,
      },
    };

    if (authorizationParam) {
      option.include.push(
        {
          model: Wishlist,
          attributes: ["id"],
          where: {
            userId: authorizationParam,
          },
          required: false,
        },
        {
          model: Offer,
          attributes: ["publicId"],
          where: {
            buyerId: authorizationParam,
          },
          required: false,
        }
      );
    }

    const product = await Product.findOne(option);

    if (product) {
      return {
        publicId: product.publicId,
        name: product.name,
        description: product.description,
        price: product.price,
        userId: product.userId,
        category: product.ProductCategories.map((item) => {
          return {
            id: item.Category.id,
            name: item.Category.name,
          };
        }),
        imageUrl: product.ProductImages.map(function (item) {
          return item.imageUrl;
        }),
        seller: {
          publicId: product.User.publicId,
          name: product.User.UserBiodatum.name,
          city: product.User.UserBiodatum.city,
          address: product.User.UserBiodatum.address,
          handphone: product.User.UserBiodatum.handphone,
          imageUrl: product.User.UserBiodatum.imageUrl,
        },
        status: {
          wishlist: product.Wishlists.length > 0 ? true : false,
          offer: product.Offers.length > 0 ? true : false,
        },
      };
    } else {
      return null;
    }
  }

  static async getProductList(
    categoryIdParam,
    limitParam,
    pageParam,
    authorizationParam
  ) {
    const option = {
      attributes: ["publicId", "name", "price"],
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
      order: [
        [ProductImage, "id", "ASC"],
        [ProductCategory, "id", "ASC"],
      ],
    };

    if (categoryIdParam) {
      option.include[0].where.categoryId = Number(categoryIdParam);
    }

    if (limitParam) {
      option.limit = Number(limitParam);
    }

    if (pageParam) {
      option.offset = Number(pageParam - 1);
    }

    if (authorizationParam) {
      option.where = {
        userId: {
          [Op.not]: authorizationParam,
        },
      };
    }

    const product = await Product.findAll(option);

    if (product.length > 0) {
      return product.map((item) => {
        return {
          publicId: item.publicId,
          name: item.name,
          price: item.price,
          imageUrl: item.ProductImages[0].imageUrl,
          category: item.ProductCategories.map((item) => {
            return {
              categoryId: item.Category.id,
              name: item.Category.name,
            };
          }),
        };
      });
    } else {
      return null;
    }
  }

  static async isProductExists(publicIdParam) {
    return await Product.findOne({
      attributes: ["id", "publicId"],
      where: {
        publicId: publicIdParam,
      },
    });
  }

  static async createProduct(
    nameParam,
    descriptionParam,
    priceParam,
    userIdParam,
    transactionParam
  ) {
    return await Product.create(
      {
        publicId: await generateUUID(),
        name: nameParam,
        description: descriptionParam,
        price: priceParam,
        userId: userIdParam,
      },
      { transaction: transactionParam }
    );
  }

  static async addProductImage(productImageListParam, transactionParam) {
    return await ProductImage.bulkCreate(productImageListParam, {
      transaction: transactionParam,
    });
  }
}

module.exports = ProductService;
