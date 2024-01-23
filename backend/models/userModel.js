const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    photo: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User',UserSchema);

module.exports = User;