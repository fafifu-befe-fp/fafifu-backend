"use strict";
const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/login.controller");
const UserController = require("../controllers/user.controller");
const { validation } = require("../middlewares");
const { loginValidationRules } = require("../validations/auth.validation");
const {
  registerUserValidationRules,
} = require("../validations/user.validation");

router.post(
  "/login",
  loginValidationRules(),
  validation,
  LoginController.login
);
router.post(
  "/register",
  registerUserValidationRules(),
  validation,
  UserController.register
);

module.exports = router;
