const db = require("./../db");
const jwt = require("jsonwebtoken");
exports.getPost = (req, res) => {
  const queryStr = req.query.cat;
  let q;
  if (queryStr) q = "SELECT * FROM posts WHERE cat = ?";
  else q = "SELECT * FROM posts";
  db.query(q, [queryStr], (err, data) => {
    if (err) return res.status(500).json("Oops! Something went wrong");
    return res.status(200).json(data);
  });
};

exports.getPostById = (req, res) => {
  const postId = req.params.id;
  const q =
    "SELECT posts.id,`name`,`title`,`desc`,posts.image,users.image AS userImg,`cat`,`date` FROM posts JOIN users ON posts.uid = users.id WHERE posts.id = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json("Oops! Something went wrong");
    return res.status(200).json(data);
  });
};

exports.createPost = (req, res) => {
  const token = req.cookies.jwt;
  //console.log(token);
  if (!token) return res.status(401).json("You are not allowed!");
  jwt.verify(
    token,
    "my-jwt-secret-key-for-blog-app-is-defined-here",
    (err, userInfo) => {
      if (err)
        return res.status(403).json("You need to be logged in to write a post");
      const q =
        "INSERT INTO posts(`title`,`desc`,`image`,`cat`,`date`,`uid`) VALUES (?)";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.image,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Oops! Something went wrong");
        return res.status(201).json("Post created successfully");
      });
    }
  );
};

exports.updatePost = (req, res) => {
  const token = req.cookies.jwt;
  //console.log(token);
  if (!token) return res.status(401).json("You are not allowed!");
  jwt.verify(
    token,
    "my-jwt-secret-key-for-blog-app-is-defined-here",
    (err, userInfo) => {
      if (err)
        return res.status(403).json("You need to be logged in to write a post");
      const q =
        "UPDATE posts SET `title`= ?,`desc` = ?,`image` = ?,`cat` = ? WHERE `id` = ? AND `uid` = ?";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.image,
        req.body.cat,
      ];
      db.query(q, [...values,req.params.id,userInfo.id], (err, data) => {
        if (err) return res.status(500).json("Oops! Something went wrong");
        return res.status(201).json("Post updated successfully");
      });
    }
  );
};

exports.deletePost = (req, res) => {
  const token = req.cookies.jwt;
  //console.log(token);
  if (!token) return res.status(401).json("You are not allowed!");
  jwt.verify(
    token,
    "my-jwt-secret-key-for-blog-app-is-defined-here",
    (err, userInfo) => {
      if (err) return res.status(403).json("Invalid token");
      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
      db.query(q, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You cannot delete the post");
        return res.status(204).json("Post deleted successfully");
      });
    }
  );
};
