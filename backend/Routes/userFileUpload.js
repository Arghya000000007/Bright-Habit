const express = require("express");
const uploadUser = require("../http/config/fileUploadUser");
const UploadUserRouter = express.Router();

UploadUserRouter.post("/upload", uploadUser, (req, res) => {
  console.log("File uploaded successfully");
  res.json({
    status: "success",
    message: "File uploaded successfully",
  });
});
module.exports = UploadUserRouter;
