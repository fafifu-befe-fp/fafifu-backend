const {
  Product,
  ProductCategory,
  Category,
  ProductImage,
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
    ],
    where: {
      publicId: publicIdParam,
    },
  });

  const result = data.map((item) => {
    console.log("data", data);
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
    };
  });

  return result;
};
