"use strict";
const express = require("express");
const ProductController = require("../controllers/product.controller");
const router = express.Router();

router.get("/", ProductController.getProductCategoryList);

module.exports = router;
