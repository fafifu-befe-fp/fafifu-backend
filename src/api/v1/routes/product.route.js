const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const { validation, authorization } = require("../middlewares");
const {
  addProdukValidationRules,
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

router.get("/", ProductController.list);
router.get("/wishlist", authorization, ProductController.wishlist);
router.post("/wishlist", authorization, ProductController.addWishlist);
router.delete("/wishlist", authorization, ProductController.deleteWishlist);
router.get("/:id", ProductController.get);
router.get("/shop/:id", ProductController.getProductListByUserId);
router.post(
  "/",
  authorization,
  upload.array("image", 5),
  addProdukValidationRules(),
  validation,
  ProductController.add
);
router.put("/", authorization, ProductController.update);

module.exports = router;
