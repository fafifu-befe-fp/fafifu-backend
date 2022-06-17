const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { authorization } = require("../middlewares");

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

router.post("/", UserController.register);
router.post(
  "/is-data-completed",
  authorization,
  UserController.isDataCompleted
);
router.put(
  "/complete-data",
  authorization,
  upload.single("avatar"),
  UserController.completeData
);

module.exports = router;
