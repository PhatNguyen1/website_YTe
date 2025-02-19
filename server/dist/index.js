"use strict";

var express = require("express");
var app = express();
// const port = 3000;
var morgan = require("morgan");
var path = require("path");
var handlebars = require("express-handlebars");
var PORT = process.env.PORT || 5000;
var cors = require("cors");
app.use(cors());
var PatientRoutes = require("../routes/PatientRoutes");
var ExaminateRoutes = require("../routes/ExaminateRoutes");

//HTTP logger
app.use(morgan("combined"));
//Template Engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
//path Template Engine
app.set("views", path.join(__dirname, "resources\\views"));
console.log("PATH: ", path.join(__dirname, "resources\\views"));
//Xử lý json
app.use(express.json());

//Route
app.use("/api", PatientRoutes);
app.use("/api", ExaminateRoutes);
//check port
app.listen(PORT, function () {
  console.log("Example app listening at http://localhost:".concat(PORT));
});