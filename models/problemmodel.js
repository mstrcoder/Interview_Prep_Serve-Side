const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
    available_languages: {
    type: [String]
  },
  languages: {
    type: [Object]
  },
  name: {
    type: String
  },
  statement: {
    type: String
  },
  url: {
    type: String
  },
  topics: {
    type: String
  },
  companies: [String]
});
const Problem = mongoose.model("Problem",ProblemSchema);
module.exports = Problem;
