"use strict";
const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const WishlistController = require("../controllers/wishlist.controller");
const { validation, authorization, isLogin } = require("../middlewares");
const {
  addProdukValidationRules,
  updateProdukValidationRules,
} = require("../validations/produk.validation");

const multer = require("multer");
const { storage } = require("../helpers");

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 300,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error("Please upload a image file"));
    }
    cb(null, true);
  },
});

router.get("/", isLogin, ProductController.list);
router.delete("/:id", authorization, ProductController.delete);
router.get("/wishlist", authorization, WishlistController.list);
router.post("/:id/wishlist", authorization, WishlistController.add);
router.delete("/:id/wishlist", authorization, WishlistController.delete);
router.get("/:id", isLogin, ProductController.get);
router.get("/shop/:id", ProductController.listByUserId);
router.post(
  "/",
  authorization,
  upload.array("image", 5),
  addProdukValidationRules(),
  validation,
  ProductController.add
);
router.put(
  "/:id",
  authorization,
  upload.array("image", 5),
  updateProdukValidationRules(),
  validation,
  ProductController.update
);

module.exports = router;
