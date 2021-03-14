const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required to create The user."],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required to create"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter The password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Enter The same Password As enter Above"],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
UserSchema.pre("save", async function (next) {
  if(!this.isModified('password'))return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
UserSchema.methods.verifyPassword=async function(UserPassword,ActualPassword){
  //bcrypt is a function to compare the Password in encryption form only
     return await bcrypt.compare(UserPassword, ActualPassword);
  
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
