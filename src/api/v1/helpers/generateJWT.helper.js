"use strict";
const jwt = require("jsonwebtoken");
const config = require("../../../config/jwt.config");

module.exports = async (publicIdParam, emailParam) => {
  return await jwt.sign(
    { publicId: publicIdParam, email: emailParam },
    config.JWT_SECRET_KEY
  );
};
