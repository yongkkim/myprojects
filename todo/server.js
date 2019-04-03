const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const mongoose = require("mongoose");
const ServerPortRouter = require("./ServerPortRouter");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/todoDB").then(
  () => {
    console.log("connected to the database");
  },
  err => {
    console.log("Can not connect to the database -> " + err);
  }
);

app.use("/serverport", ServerPortRouter);

app.listen(port, () => console.log(`Server started on paort ${port}`));
