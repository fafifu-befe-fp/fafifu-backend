const { body } = require("express-validator");

const addProdukValidationRules = () => {
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
  addProdukValidationRules,
};
