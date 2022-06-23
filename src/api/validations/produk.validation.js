const { body } = require("express-validator");

const addProdukValidationRules = () => {
  return [
    body("nama").notEmpty().withMessage("nama is required"),
    body("deskripsi").notEmpty().withMessage("deskripsi is required"),
    body("harga")
      .notEmpty()
      .withMessage("harga is required")
      .isNumeric()
      .withMessage("Harga must be numeric"),
  ];
};

module.exports = {
  addProdukValidationRules,
};
