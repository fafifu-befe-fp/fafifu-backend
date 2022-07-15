"use strict";
const express = require("express");
const router = express.Router();
const { ProductService } = require("../services");

router.get("/", ProductService.getProductCategoryList);

module.exports = router;
