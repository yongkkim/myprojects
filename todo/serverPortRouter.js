const express = require("express");
const ServerPortRouter = express.Router();
const Data = require("./data");

ServerPortRouter.route("/add").post(function(req, res) {
  const todolist = new Data({
    name: req.body.name,
    title: req.body.title,
    todos: req.body.todos,
    comments: req.body.comments
  });
  todolist
    .save()
    .then(todolist => {
      res.json("Server added successfully -> " + todolist);
    })
    .catch(err => {
      res.status(400).send("unable to save to database ->" + err);
    });
});

ServerPortRouter.route("/all").get(function(req, res) {
  Data.find(function(err, allList) {
    if (err) {
      console.log(err);
    } else {
      res.json(allList);
    }
  });
});

module.exports = ServerPortRouter;
