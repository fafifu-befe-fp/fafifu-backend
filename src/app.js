const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./api/v1/middlewares/errorHandler");

const {
  userRouter,
  productRouter,
  loginRouter,
  offerRouter,
} = require("./api/v1/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../src/public")));

app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/product", productRouter);
app.use("/offer", offerRouter);
app.use(errorHandler);
module.exports = app;
