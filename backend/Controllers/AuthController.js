const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const db = require("./../db");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const q = "SELECT * FROM users WHERE name = ?";
  db.query(q, [req.body.name], async (err, data) => {
    if (err) return res.status(500).json("Oops! Something went wrong");
    if (data.length === 0) return res.status(401).json("User not found");

    const userPassword = req.body.password;
    if (!(await bcrypt.compare(userPassword, data[0].password))) {
      return res.status(401).json("Wrong email or password");
    }
    const token = promisify(jwt.sign)(
      { id: data[0].id },
      "my-jwt-secret-key-for-blog-app-is-defined-here",
    );
    const { password, ...other } = data[0];
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(200).json(other);
  });
};

exports.register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";
  db.query(q, [req.body.email, req.body.name], async (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    //Hash the password and create a user
    const hash = await bcrypt.hash(req.body.password, 12);
    const q = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
    const values = [req.body.name, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(404).json("Oops! Something went wrong");
      return res.status(200).json("User created successfully");
    });
  });
};

exports.logout = (req, res) => {
  res
    .clearCookie("jwt", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User logged out");
};
