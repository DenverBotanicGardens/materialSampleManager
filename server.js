//dependencies
var express = require("express")
var exhbs = require("express-handlebars")
var path = require("path")
var dotenv = require('dotenv').config()
var fs = require("fs");
const passport = require('./config/passport');
const session = require('express-session');

//create express server
var app = express()

//define PORT
var PORT = 8080
//var PORT = process.env.PORT

//require models
var db = require("./models")

//set up express app to handle data parsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//set the static directory to public dir
app.use(express.static("public"))

//set the global root dir
global.__basedir = __dirname + "/.";

// setup handelbars
app.engine("handlebars", exhbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//routes
const initRoutes = require("./routes/routes");
//api routes for handling data exchanges
initRoutes(app);
require("./routes/routes.js")(app);

// start the server. {force:true} drops the tables from exisiting db. {force:false} keeps the existing db and tables and data in place
db.sequelize.sync({
    force: false
  }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening at http://localhost:" + PORT);
    });
  });