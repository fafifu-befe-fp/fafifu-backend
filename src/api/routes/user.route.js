const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/", UserController.add);
router.post("/is-data-completed/:id", UserController.isDataCompleted);
router.put("/:id", UserController.completeData);

module.exports = router;
