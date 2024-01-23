const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const filterBody = (body, ...obj) => {
  const keys = Object.keys(body);
  const newBody = {};
  keys.forEach((key) => {
    if (obj.includes(key)) {
      newBody[key] = body[key];
    }
  });
  return newBody;
};
//Fetch user details
exports.getMyDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

exports.updateMyDetails = async (req, res) => {
  const body = filterBody(req.body, "name", "email", "photo");
  //   const { name, photo } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      message: "Your details have been updated",
      data: {
        user,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.user._id);

  const prevPassword = req.body.prevPassword;

  if (!prevPassword) {
    return res.json({
      status: "error",
      message: "Please enter your password",
    });
  }

  if (!(await bcrypt.compare(prevPassword, user.password))) {
    return res.json({
      status: "error",
      message: "Invalid password",
    });
  }
  const newPassword = await bcrypt.hash(req.body.newPassword, 12);

  user.password = newPassword;
  await user.save({ validateBeforeSave: true });
  res.json({ status: "success", message: "password upadded successfully" });
};
