const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  level1: {
    type: [Object]
  },
  level2: {
    type: [Object]
  },
  level3: {
    type: [Object]
  },
  levels: [String]
});
const Topic = mongoose.model("Topic",TopicSchema);
module.exports = Topic;
