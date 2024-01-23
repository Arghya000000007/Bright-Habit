const express = require("express");
const uploadPost = require("../http/config/fileUploadPost");
const UploadRouter = express.Router();

UploadRouter.post("/upload", uploadPost, (req, res) => {
  console.log("File uploaded successfully");
  res.json({
    status: "success",
    message: "File uploaded successfully",
  });
});

module.exports = UploadRouter;
