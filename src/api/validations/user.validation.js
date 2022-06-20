const { body } = require("express-validator");
const { isEmailExists } = require("../services");

const registerUserValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email is not valid")
      .notEmpty()
      .withMessage("Email is required")
      .custom(async (value) => {
        if (await isEmailExists(value)) {
          return Promise.reject("Email already in use");
        }
      }),
    body("password").notEmpty().withMessage("Password is required"),
    body("nama")
      .notEmpty()
      .withMessage("nama is required")
      .isLength({ max: 255 })
      .withMessage("nama must be less than 255 characters"),
  ];
};

module.exports = {
  registerUserValidationRules,
};
