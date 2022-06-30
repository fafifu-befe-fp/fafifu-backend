const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("public/images")) {
      cb(null, "public/images");
    } else {
      fs.mkdirSync("public/images", { recursive: true });
      cb(null, "public/images");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = { storage };
