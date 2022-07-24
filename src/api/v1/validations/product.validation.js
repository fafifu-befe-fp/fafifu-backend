"use strict";
const { body } = require("express-validator");

const addProductValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("categoryId").notEmpty().withMessage("category is required"),
    body("price")
      .notEmpty()
      .bail()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be numeric")
  ];
};

const updateProductValidationRules = () => {
  return [
    body("name").optional().notEmpty().withMessage("name is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("description is required"),
    body("categoryId")
      .optional()
      .notEmpty()
      .withMessage("category is required"),
    body("price")
      .optional()
      .notEmpty()
      .bail()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be numeric"),
  ];
};

module.exports = {
  addProductValidationRules,
  updateProductValidationRules,
};
