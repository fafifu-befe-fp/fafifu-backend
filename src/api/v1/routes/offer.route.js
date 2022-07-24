"use strict";
const express = require("express");
const router = express.Router();

const OfferController = require("../controllers/offer.controller");
const { authorization } = require("../middlewares");

router.get("/:id", authorization, OfferController.get);
router.put("/:id", authorization, OfferController.update);

module.exports = router;
