"use strict";
const { body } = require("express-validator");

const addOfferValidationRules = () => {
  return [
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .bail()
      .isNumeric()
      .withMessage("price must be numeric"),
  ];
};
module.exports = {
  addOfferValidationRules,
};
