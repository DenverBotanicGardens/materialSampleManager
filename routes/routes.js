const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const insertDataController = require("../controllers/insertData")
const csvController = require("../controllers/csvUpload")
const upload = require("../middlewares/upload");




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

  //POST /api/upload
  router.post("/upload", upload.single("file"), csvController.csvUpload);

  //POST /api/materialSample
  router.post("/materialSample", insertDataController.insertData)

  app.use("/api", router);
};

module.exports = routes;