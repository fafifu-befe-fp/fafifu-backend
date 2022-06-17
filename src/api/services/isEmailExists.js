const { User } = require("../models");

module.exports = async (emailParam) => {
  return await User.findOne({
    where: {
      email: emailParam,
    },
  });
};
