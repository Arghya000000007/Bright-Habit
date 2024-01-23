const User = require("./../../models/userModel");
const validator = require("validator");
const passport = require("passport");

function AuthController() {
  return {
    login(req, res,next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.json({
            status: "error",
            message: "User not found",
          });
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", "Something went wrong");
            return res.json({
              status: "error",
              message: "Something went wrong"
            });
          }
          return res.json({
            status: "success",
            user,
            message: "Logged in successfully"
          });
        });
      })(req, res, next);
    },
    async register(req, res) {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash("error", "Please provide all the required fields");

        req.flash("name",name);
        req.flash("email",email);

        return res.json({
          status: "error",
          message: "Please provide all the required fields"
        });
      }

      if (!validator.isEmail(email)) {
        req.flash("error", "Invalid email address");

        req.flash("name",name);

        return res.json({
          status: "error",
          message: "Invalid email address"
        });
      }

      const user = await User.findOne({ email:email });

      if(user) {
        req.flash("error","Email is already registered");
        return res.json({
          status: "error",
          message: "Email is already registered"
        });
      }

      if (password.length < 8) {
        req.flash("error", "Password must be at least 8 characters");

        req.flash("name", name);
        req.flash("email", email);

        return res.json({
          status: "error",
          message: "Password must be at least 8 characters"
        });
      }
      try {
        await User.create({ name: name, email: email, password: password });
        return res.json({
          status: "success",
          message: "User created successfully"
        });
      } catch (err) {
        req.flash("error", "Something went wrong");
        return res.json({
          status: "error",
          message: "Something went wrong"
        });
      }
    },
    logout(req, res, next) {
      req.logout((err) => {
        if (err) {
          req.flash("error", "Something went wrong");
          return next(err);
        }
        return res.json({
          status: "success"
        });
      });
    },
  };
}
module.exports = AuthController;
