const express = require("express");
const router = express.Router();

const ProdukController = require("../controllers/produk.controller");
const { validation, authorization } = require("../middlewares");
const {
  addProdukValidationRules,
} = require("../validations/produk.validation");

router.get("/", ProdukController.list);
router.get("/:id", ProdukController.get);
router.get("/shop/:id", ProdukController.getProdukListByUserId);
router.post(
  "/",
  authorization,
  addProdukValidationRules(),
  validation,
  ProdukController.add
);

module.exports = router;
