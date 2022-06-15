const { body } = require("express-validator");

const addProdukValidation = () => {
  return [
    body("nama").notEmpty().withMessage("nama is required"),
    body("deskripsi").notEmpty().withMessage("Deskripsi is required"),
    body("harga")
      .notEmpty()
      .withMessage("name is required")
      .isNumeric()
      .withMessage("Harga must be numeric"),
  ];
};

module.exports = {
  addProdukValidation,
};
