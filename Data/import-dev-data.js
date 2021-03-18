const mongoose = require("mongoose");
const fs = require("fs");
// const Problem = require("../models/problemmodel");
const Topic = require('./../models/topicmodel');

mongoose
  .connect(
    "mongodb+srv://Interview:12345@cluster0.z0rxw.mongodb.net/Interview_Prep?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => {
    // console.log(con.connection);
    console.log("We are Connected to the Database");
  });
//Read JSON file
// let problems = JSON.parse(
//   fs.readFileSync(`${__dirname}/problem.json`, "utf-8")
// );

// let val=JSON.stringify(problems);
// val=val.replace(/\"available languages\":/g, "\"available_languages\":")
// problems = JSON.parse(val)
let topics = JSON.parse(
  fs.readFileSync(`${__dirname}/../topic.json`, "utf-8")
);
console.log(topics);
// console.log(problems);
const importData = async () => {
  try {
    await Topic.create(topics);
    // await User.create(users,{validateBeforeSave:false});
    // await Review.create(reviews,{validateBeforeSave:false});
    console.log("Data loaded Successfully");
  } catch (err) {
    console.log(err);
  }
};

const DeleteData = async () => {
  try {
    await Topic.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
};

// DeleteData();
importData();
