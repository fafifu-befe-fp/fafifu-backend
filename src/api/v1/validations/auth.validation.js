"use strict";
const { body } = require("express-validator");

const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .bail()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not valid"),
    body("password")
      .notEmpty()
      .bail()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 21 })
      .withMessage("Password must between 8 - 21 characters"),
  ];
};

module.exports = {
  loginValidationRules,
};
