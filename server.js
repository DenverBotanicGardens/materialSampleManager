//dependencies
var express = require("express")
var exhbs = require("express-handlebars")
var path = require("path")
var dotenv = require('dotenv').config()
var fs = require("fs");
const passport = require('./config/passport');
const session = require('express-session');
const MySQLStoreFactory = require('express-mysql-session')(session);
const sessionStore = new MySQLStoreFactory({}, db.sequelize.connectionManager.pool);
const cronJobUploads = require('./controllers/removeUploadsCron.js')
const cronJobDownloads = require('./controllers/removeDownloadsCron.js')


//create express server
var app = express()

//define PORT
var PORT = process.env.PORT || 8080

//require models
var db = require("./models")

//set up express app to handle data parsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
  key: 'session_id',
  secret: process.env.SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));
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
//api routes for handling data exchanges
const initRoutes = require("./routes/routes");
initRoutes(app);

// start the server. {force:true} drops the tables from exisiting db. {force:false} keeps the existing db and tables and data in place
db.sequelize.sync({
    force: false
  }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening at http://localhost:" + PORT);
    });
  });