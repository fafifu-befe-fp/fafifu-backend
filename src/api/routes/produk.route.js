const express = require("express");
const router = express.Router();

const ProdukController = require("../controllers/produk.controller");
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

router.get("/", ProdukController.list);
router.get("/:id", ProdukController.get);
router.get("/shop/:id", ProdukController.getProdukListByUserId);
router.post(
  "/",
  authorization,
  upload.array("fotoProduk", 5),
  addProdukValidationRules(),
  validation,
  ProdukController.add
);

module.exports = router;
