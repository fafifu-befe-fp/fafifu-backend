const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("/src/public/images/avatar")) {
      cb(null, "src/public/images/avatar");
    } else {
      fs.mkdirSync("src/public/images/avatar", { recursive: true });
      cb(null, "src/public/images/avatar");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = { storage };
