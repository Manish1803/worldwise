const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique."],
    lowercase: [true, "Username must be lowercase."],
    trim: true,
    validate: {
      validator: function (value) {
        return !/\s/.test(value);
      },
      message: "Username must not contain spaces.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use."],
    lowercase: [true, "Email must be lowercase."],
    trim: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters long."],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
