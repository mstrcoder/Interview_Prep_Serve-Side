const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/usermodels");
const jwt = require("jsonwebtoken");
const {promisify}=require('util');
//Generating JWT Token!
const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    "hello-bhayya-kese-ho-aap",
    {
      expiresIn: "90d",
    }
  );
};
exports.signup = async (req, res) => {
  try {
    //Lets Create A User with this Data
    const newUser = await User.create(req.body);
    //creating the JSON web Token With the User to send to browser
    // console.log(newUser);
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "Success!",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed!",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        status: "failed!",
        message: "Please enter the Email and Passaword",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        status: "failed!",
        message: "User Not Found LOL!",
      });
    }
    const correct = await user.verifyPassword(password, user.password);
    if (!correct) {
      res.status(404).json({
        status: "failed!",
        message: "Password is Wrong!",
      });
    }
    const token = signToken(user._id);
    res.status(201).json({
      status: "Success!",
      token,
      message: "You are Logged In!",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed!",
      message: error,
    });
  }
};

exports.protect = async (req, res,next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // this is done to get the JWT token form Postman
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookie.jwt) {
    //This is done to get the Token Form Co0kie
    token = req.cookie.jwt;
  }

  if (!token) {
    res.status(404).json({
      status: "failed!",
      message: "Please Login!",
    });
  }

  // we use verfy function to verify the token with ourgiven word and promisify to convert it to Promise function because it doesnot return any promise
  //promisify is a function which comes with UTIL npm pachage to return a promise 
  const decoded = await promisify(jwt.verify)(
    token,
    "hello-bhayya-kese-ho-aap"
  );
  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(404).json({
      status: "failed!",
      message: "No User Exist!",
    });
  }
  req.user = user;
  next();
};
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    //this will verify the Password 
    const correct = await user.verifyPassword(
      req.body.passwordCurrent,
      user.password
    );  
    console.log(correct);
    //check id Posted Current Pasword is correctPassword
    if (!correct) {
      res.status(404).json({
        status: "failed!",
        message: "Current Password is Wrong!",
      });
    }

    //update the Password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    //on saving all the validators and middle ware will run
    await user.save();
    const token = signToken(user._id);
    res.status(201).json({
      status: "Success!",
      token,
      message: "PassWord Successfully Updated!",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed!",
      message: error,
    });
  }
};
