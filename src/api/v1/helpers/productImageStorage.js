const multer = require("multer");
const fs = require("fs");

const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("/src/public/images/foto-produk")) {
      cb(null, "src/public/images/foto-produk");
    } else {
      fs.mkdirSync("src/public/images/foto-produk", { recursive: true });
      cb(null, "src/public/images/foto-produk");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = { productImageStorage };
