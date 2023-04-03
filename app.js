var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8081; // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.connect(database.url);
var User = require("./models/user");
require("./models/workspace");

const auth = require("./routes/auth");
const manageWorkspace = require("./routes/manage-workspace");

app.use(auth);
app.use(manageWorkspace);

app.get("/", function (req, res) {
  User.find()
    .then((result) => {
      console.log("USERS:  ", result);
      res.json(result);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

app.post("/signUp", function (req, res) {
  console.log(req.body);
  res.send("Sign Up API Called");
});

app.post("/allWorkspaces", function (req, res) {
  console.log(req.body);
  res.send("All Workspaces api called");
});

app.post("/createWorkspace", function (req, res) {
  console.log(req.body);
  res.send("Create Workspaces api called");
});

app.get("/login", function (req, res) {
  console.log(req.body);
  res.send("Sign in api called");
});

app.get("/getAllUsernames", function (req, res) {
  console.log(req.body);
  res.send("get all username api called");
});

app.listen(port);
console.log("App listening on port : " + port);
