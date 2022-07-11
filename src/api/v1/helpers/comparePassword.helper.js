"use strict";
const bcrypt = require("bcrypt");

module.exports = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
