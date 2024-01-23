const LocalStrategy = require("passport-local").Strategy;
const User = require("./../../models/userModel");
const bcrypt = require("bcrypt");

function configurePassport(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, {
            message: "User not found.Please register!",
          });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in successfully" });
            }
            return done(null, false, { message: "Wrong email or password" });
          })
          .catch((err) => {
            return done(err, false, { message: "Something went wrong" });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });
}
module.exports = configurePassport;
