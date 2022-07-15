"use strict";
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const userRouter = require("./user.route");
const offerRouter = require("./offer.route");
const notificationRouter = require("./notification.route");
const categoryRouter = require("./category.route");

module.exports = {
  authRouter,
  productRouter,
  userRouter,
  offerRouter,
  notificationRouter,
  categoryRouter,
};
