"use strict";
const express = require("express");
const router = express.Router();

const OfferController = require("../controllers/offer.controller");
const { authorization } = require("../middlewares");

router.get("/", authorization, OfferController.list);
router.post("/", authorization, OfferController.add);
router.put("/:id", authorization, OfferController.update);

module.exports = router;
