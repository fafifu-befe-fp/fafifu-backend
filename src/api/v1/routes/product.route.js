const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
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
router.get("/wishlist", authorization, ProductController.wishlist);
router.post("/:id/wishlist", authorization, ProductController.addWishlist);
router.delete("/:id/wishlist", authorization, ProductController.deleteWishlist);
router.get("/:id", isLogin, ProductController.get);
router.get("/shop/:id", ProductController.getProductListByUserId);
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
