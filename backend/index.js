const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({
  path: "/backend/config.env",
});
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PostRouter = require("./Routes/PostRoute");
const AuthRouter = require("./Routes/AuthRoute");
const UserRouter = require("./Routes/UsersRoute");
const multer = require("multer");

const port = 8800;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
