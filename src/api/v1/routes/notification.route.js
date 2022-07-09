"use strict";
const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.controller");
const { authorization } = require("../middlewares");

router.get("/", authorization, NotificationController.get);
router.get("/all", authorization, NotificationController.get);
router.post("/:id/read", authorization, NotificationController.setRead);
router.post("/read-all", authorization, NotificationController.setAllRead);
router.delete("/:id/remove", authorization, NotificationController.remove);
router.delete("/remove-all", authorization, NotificationController.removeAll);

module.exports = router;
