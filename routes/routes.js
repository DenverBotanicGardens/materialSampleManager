const express = require("express");
const router = express.Router();
//const csvController = require("../controllers/fasta/csv");
//const upload = require("../middlewares/upload");
//const { auth, requiresAuth } = require('express-openid-connect');



let routes = (app) => {
 
  //views
    //index
    app.get('/', (req, res) => {
      res.render("index");
    });


  //app.use("/api/csv", router);
};

module.exports = routes;