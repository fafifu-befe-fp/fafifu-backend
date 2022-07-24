"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api-docs/swagger.json");

const { errorHandler } = require("./api/v1/middlewares");
const cors = require("cors");

const {
  userRouter,
  productRouter,
  authRouter,
  offerRouter,
  notificationRouter,
  categoryRouter,
} = require("./api/v1/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api-docs", swaggerUi.serve);

app.use(cors());

app.get("/api-docs", swaggerUi.setup(swaggerDocument));
app.use("/v1/user", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/product", productRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/offer", offerRouter);
app.use("/v1/notification", notificationRouter);
app.use(errorHandler);
module.exports = app;
