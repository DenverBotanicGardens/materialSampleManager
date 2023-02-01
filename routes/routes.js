const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects");
//const upload = require("../middlewares/upload");
//const { auth, requiresAuth } = require('express-openid-connect');



let routes = (app) => {
 
  //views
    //index
    app.get('/', (req, res) => {
      res.render("index");
    });
  
  
  //POST /api/projects
  router.post("/projects", projectsController.addProject);

  app.use("/api", router);
};

module.exports = routes;