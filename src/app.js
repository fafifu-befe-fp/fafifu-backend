const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./api/middlewares/errorHandler");

const indexRouter = require("./api/routes/index");
const userRouter = require("./api/routes/user.route");
const produkRouter = require("./api/routes/produk.route");
const loginRouter = require("./api/routes/login.route");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/produk", produkRouter);
app.use(errorHandler);
module.exports = app;
