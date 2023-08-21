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
const getGerminationTrialResults = require("../controllers/exportGerminationTrialResults")

let routes = (app) => {

  //VIEW ROUTES-------------------------------------------------------------------------------------------------
    //index
    app.get('/', (req, res) => {
      res.render("index");
    });

    app.get('/createNewProject', (req, res) => {
      res.render("createNewProject");
    });

    app.get('/uploadMaterialSamples', (req, res) => {
      res.render("uploadMaterialSamples");
    });

    app.get('/search', (req, res) => {
      res.render("search");
    });

    app.get('/updateMaterialSample', (req, res) => {
      res.render("updateMaterialSample");
    });

    app.get('/germinationTrials', (req, res) => {
      res.render("germinationTrials");
    });

    app.get('/createNewGerminationTrial', (req, res) => {
      res.render("createNewGerminationTrial");
    });

    app.get('/finishGerminationTrial', (req, res) => {
      res.render("finishGerminationTrial");
    });

    app.get('/addViabilityTracking', (req, res) => {
      res.render("addViabilityTracking");
    });

    app.get('/transferMaterialSample', (req, res) => {
      res.render("transferMaterialSample");
    });

    app.get('/transfers', (req, res) => {
      res.render("transfers");
    });

    app.get('/updateTransfer', (req, res) => {
      res.render("updateTransfers");
    });
  
  //API ROUTES---------------------------------------------------------------------------------------------
  //POST /api/projects
  router.post("/project", projectController.addProject);

  //GET /api/projects
  router.get("/project", projectController.getAllProjects);

  //POST /api/upload
  router.post("/upload", upload.single("file"), csvController.csvUpload);

  //POST /api/materialSample
  router.post("/materialSample", insertDataController.insertData)

  //GET /api/seedForTrial
  router.post("/seedForTrial", getSeedForTrial.getSeedsForTrial)

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

  //POST /api/getGermplasmViabilityTests
  router.post("/getGermplasmViabilityTests", getGerminationTrials.getGerminationTrials)

  //GET /api/searchMaterialSamples
  router.get("/searchMaterialSamples", searchMaterialSamples.searchMaterialSamples)

  //POST /api/exportSearchToCSV
  router.post("/exportSearchToCSV", searchMaterialSamples.exportSearchToCSV)

  //POST /api/getGerminationTrialResults
  router.post("/getGerminationTrialResults", getGerminationTrialResults.getGerminationTrialResults)

  //POST /api/exportGerminationTrialResults
  router.post("/exportGerminationTrialResults", getGerminationTrialResults.exportGerminationTrialResults)

  //GET /api/downloadGerminationTrialsFile
  router.get("/downloadGerminationTrialsFile/:name", getGerminationTrialResults.downloadGerminationTrialsFile);

  app.use("/api", router);
};

module.exports = routes;