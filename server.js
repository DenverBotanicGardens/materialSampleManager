//dependencies
var express = require("express")
var exhbs = require("express-handlebars")
var path = require("path")

//create express server
var app = express()

//define PORT
var PORT = process.env.PORT || 8080

//require models
var db = require("./models")

//set up express app to handle data aprsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//set the static directory to public dir
app.use(express.static("public"))

// setup handelbars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//routes
const initRoutes = require("./routes/api-routes");
//api routes for handling data exchanges
initRoutes(app);
require("./routes/api-routes.js")(app);

// start the server. {force:true} drops the tables from exisiting db. {force:false} keeps the existing db and tables and data in place
db.sequelize.sync({
    force: true
  }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening at http://localhost:" + PORT);
    });
  });