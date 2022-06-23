const express = require("express");
const router = express.Router();

const PenawaranController = require("../controllers/penawaran.controller");
const { validation, authorization } = require("../middlewares");
const {
  addProdukValidationRules,
} = require("../validations/produk.validation");

router.get("/", authorization, PenawaranController.list);
router.post(
  "/",
  authorization,
  //   addProdukValidationRules(),
  //   validation,
  PenawaranController.add
);
router.post("/accept-penawaran", authorization, PenawaranController.accept);
router.post("/decline-penawaran", authorization, PenawaranController.decline);

module.exports = router;
