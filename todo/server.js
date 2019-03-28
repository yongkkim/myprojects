const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoListSchema = new Schema({
  author: String,
  title: String,
  todos: [{ todo: String, date: Date, checked: Boolean, color: Number }],
  comments: [{ comment: String, color: Number }]
});

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/todoDB");
};

const todoList = mongoose.model("todoList", todoListSchema);

app.post("/add", function(req, res) {
  res.send("POST request to the homepage");
});

app.listen(port, () => console.log(`Server started on paort ${port}`));
