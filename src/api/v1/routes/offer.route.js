const express = require("express");
const router = express.Router();

const OfferController = require("../controllers/offer.controller");
const { validation, authorization } = require("../middlewares");
const {
  addProdukValidationRules,
} = require("../validations/produk.validation");

router.get("/", authorization, OfferController.list);
router.post(
  "/",
  authorization,
  //   addProdukValidationRules(),
  //   validation,
  OfferController.add
);
router.post("/accept-offer", authorization, OfferController.accept);
router.post("/decline-offer", authorization, OfferController.decline);

module.exports = router;
