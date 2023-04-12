const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const insertDataController = require("../controllers/insertData")
const csvController = require("../controllers/csvUpload")
const upload = require("../middlewares/upload");
const getSeedForTrial = require("../controllers/getSeedForTrial")
const addGerminationTest = require("../controllers/addGerminationTest")
const addViabilityTracking = require("../controllers/addViabilityTracking")
const finishGerminationTest = require("../controllers/finishGerminationTest")
const addTransfer = require("../controllers/addTransfer")
const updateTransfer = require("../controllers/updateTransfer")
const getTransfer = require("../controllers/getTransfer")
const updateMaterialSample = require("../controllers/updateMaterialSample")
const getGerminationTrials = require("../controllers/getGerminationTrials")
const searchMaterialSamples = require("../controllers/searchMaterialSamples")


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

  //GET /api/seedForTrial
  router.get("/seedForTrial", getSeedForTrial.getSeedsForTrial)

  //POST /api/addGerminationTest
  router.post("/addGerminationTest", addGerminationTest.addGerminationTest)

  //POST /api/addViabilityTracking
  router.post("/addViabilityTracking", addViabilityTracking.addViabilityTracking)

  //PUT /api/finsihGerminationTest
  router.put("/finishGerminationTest", finishGerminationTest.finishGerminationTest)

  //POST /api/addTransfer
  router.post("/addTransfer", addTransfer.addTransfer)

  //PUT /api/updateTransfer
  router.put("/updateTransfer", updateTransfer.updateTransfer)

  //GET /api/getTransfer
  router.get("/getTransfer", getTransfer.getTransfer)

  //PUT /api/updateMaterialSample
  router.put("/updateMaterialSample", updateMaterialSample.updateMaterialSample)

  //GET /api/getGermplasmViabilityTests
  router.get("/getGermplasmViabilityTests", getGerminationTrials.getGerminationTrials)

  //GET /api/searchMaterialSamples
  router.get("/searchMaterialSamples", searchMaterialSamples.searchMaterialSamples)

  //POST /api/exportSearchToCSV
  router.post("/exportSearchToCSV", searchMaterialSamples.exportSearchToCSV)

  app.use("/api", router);
};

module.exports = routes;