const {
  Product,
  ProductCategory,
  Category,
  ProductImage,
  User,
  UserBiodata,
} = require("../models");

module.exports = async (publicIdParam) => {
  const data = await Product.findAll({
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
    where: {
      publicId: publicIdParam,
    },
  });

  const result = data.map((item) => {
    return {
      publicId: item.publicId,
      name: item.name,
      description: item.description,
      price: item.price,
      userId: item.userId,
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
      seller: {
        publicId: item.User.publicId,
        name: item.User.UserBiodatum.name,
        city: item.User.UserBiodatum.city,
        address: item.User.UserBiodatum.address,
        handphone: item.User.UserBiodatum.handphone,
        imageUrl: item.User.UserBiodatum.imageUrl,
      },
    };
  });

  return result;
};
