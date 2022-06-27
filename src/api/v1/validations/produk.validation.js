const { body } = require("express-validator");

const addProdukValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be numeric"),
  ];
};

module.exports = {
  addProdukValidationRules,
};
