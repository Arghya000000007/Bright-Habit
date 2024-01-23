const multer = require("multer");
const path = require("path");
const uploadUser = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/users");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).single("user_file");

module.exports = uploadUser;