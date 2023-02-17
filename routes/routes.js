const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const insertDatasController = require("../controllers/insertData")
//const upload = require("../middlewares/upload");
//const { auth, requiresAuth } = require('express-openid-connect');



let routes = (app) => {
 
  //views
    //index
    app.get('/', (req, res) => {
      res.render("index");
    });
  
  
  //POST /api/projects
  router.post("/project", projectController.addProject);

  //GET /api/projects
  router.get("/project", projectController.getAllProjects);

  //POST /api/materialSamples
  router.post("/materialSample", insertDatasController.insertData)

  app.use("/api", router);
};

module.exports = routes;