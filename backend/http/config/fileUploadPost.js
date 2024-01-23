const multer = require("multer");
const path = require("path");
const uploadPost = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/post");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).single('post_file');

module.exports = uploadPost;
