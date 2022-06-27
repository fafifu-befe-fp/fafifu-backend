const { body } = require("express-validator");
const { isEmailExists } = require("../services");

const registerUserValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .bail()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not valid")
      .custom(async (value) => {
        if (await isEmailExists(value)) {
          return Promise.reject("Email already in use");
        }
      }),
    body("password")
      .notEmpty()
      .bail()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 21 })
      .withMessage("Password must between 8 - 21 characters"),
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 255 })
      .withMessage("name must be less than 255 characters"),
  ];
};

const updateUserValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("address").notEmpty().withMessage("address is required"),
    body("handphone")
      .notEmpty()
      .bail()
      .withMessage("handphone is required")
      .isNumeric()
      .withMessage("handphone must be numbers"),
  ];
};
module.exports = {
  registerUserValidationRules,
  updateUserValidationRules,
};
