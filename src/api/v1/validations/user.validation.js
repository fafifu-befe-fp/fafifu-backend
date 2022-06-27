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
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 255 })
      .withMessage("name must be less than 255 characters"),
  ];
};

const updateUserValidationRules = () => {
  return [body("name").notEmpty().withMessage("name is required")];
};
module.exports = {
  registerUserValidationRules,
  updateUserValidationRules,
};
