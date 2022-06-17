const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./api/middlewares/errorHandler");

const { userRouter, produkRouter, loginRouter } = require("./api/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../src/public")));

app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/produk", produkRouter);
app.use(errorHandler);
module.exports = app;
