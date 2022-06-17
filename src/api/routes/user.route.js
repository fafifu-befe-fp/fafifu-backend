const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

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

router.post("/", UserController.add);
router.post("/is-data-completed/:id", UserController.isDataCompleted);
router.put("/:id", upload.single("avatar"), UserController.completeData);

module.exports = router;
