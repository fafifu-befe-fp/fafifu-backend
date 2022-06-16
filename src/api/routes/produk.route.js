const express = require("express");
const router = express.Router();

const ProdukController = require("../controllers/produk.controller");
const validator = require("../middlewares/validation");
const { addProdukValidation } = require("../validations/produk.validation");

router.get("/", ProdukController.list);
router.get("/:id", ProdukController.get);
router.get("/shop/:id", ProdukController.getProdukListByUserId);
// router.post("/", addProdukValidation(), validator, ProdukController.add);

module.exports = router;
