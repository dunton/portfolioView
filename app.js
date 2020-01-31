var express = require("express");
var app = express();
var path = require("path");
var React = require("react");
var ReactDOM = require("react-dom");

app.set("port", 3000);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/ajax", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/ajax.html"));
  console.log("ajax requested");
});

app.get("/neighborhood", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/neighborhood.html"));
  console.log("neighborhood requested");
});

app.get("/todo", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/todo.html"));
  console.log("todo list requested");
});

app.get("/frogger", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/frogger.html"));
  console.log("frogger requested");
});

app.get("/movie-finder", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/movie-finder.html"));
  console.log("movie-finder requested");
});

app.get("/ryantube", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/ryantube.html"));
  console.log("ryantube requested");
});

app.get("/weather", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/weather.html"));
  console.log("weather requested");
});

var server = app.listen(app.get("port"), function() {
  var port = server.address().port;
  console.log("Magic happens on port " + port);
});
