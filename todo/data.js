const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const todoListSchema = new Schema({
  name: String,
  title: String,
  todos: [{}],
  comments: [{}]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("todoData", todoListSchema);
