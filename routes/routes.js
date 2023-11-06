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
const csvUpload = require("../controllers/csvUpload");
const searchMaterialSamplesForTransfer = require("../controllers/searchMaterialSamplesForTransfer")
const searchMaterialSamplesForUpdate = require("../controllers/searchMaterialSamplesForUpdate")
const authController = require('../controllers/userAuth');
const passport = require('../config/passport');

let routes = (app) => {

  //VIEW ROUTES-------------------------------------------------------------------------------------------------
    //index
    app.get('/', ensureAuthenticated, (req, res) => {
      res.render("index");
    });

    app.get('/createNewProject',ensureAuthenticated, (req, res) => {
      res.render("createNewProject");
    });

    app.get('/uploadMaterialSamples', ensureAuthenticated, (req, res) => {
      res.render("uploadMaterialSamples");
    });

    app.get('/search', ensureAuthenticated, (req, res) => {
      res.render("search");
    });

    app.get('/updateMaterialSample', ensureAuthenticated, (req, res) => {
      res.render("updateMaterialSample");
    });

    app.get('/germinationTrials', ensureAuthenticated, (req, res) => {
      res.render("germinationTrials");
    });

    app.get('/createNewGerminationTrial', ensureAuthenticated, (req, res) => {
      res.render("createNewGerminationTrial");
    });

    app.get('/transferMaterialSample', ensureAuthenticated, (req, res) => {
      res.render("transferMaterialSample");
    });

    app.get('/transfers', ensureAuthenticated, (req, res) => {
      res.render("transfers");
    });

    app.get('/updateTransfer', ensureAuthenticated, (req, res) => {
      res.render("updateTransfers");
    });

  //USER AUTH ROUTES---------------------------------------------------------------------------------------
    //Log In Page
    app.get('/login', (req, res) => {
      res.render("login");
    })

  //POST /api/register
  router.post("/register", authController.register)
    
  //POST /api/login
  router.post("/signin", passport.authenticate('local', {
    }), (req,res) => {
      if (req.user) {
        res.status(200).json({message: "Login successful"})
      }
    })

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // If authenticated, allow access to the route
    }
    res.redirect('/login'); // If not authenticated, redirect to login
  }

  // Logout route
  app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      res.status(200).json({message: "Logout successful"})
      if (err) { return next(err); }
    });
  });

  //API ROUTES---------------------------------------------------------------------------------------------
  //POST /api/projects
  router.post("/project", projectController.addProject);

  //GET /api/projects
  router.get("/project", projectController.getAllProjects);

  //POST /api/upload
  router.post("/upload", upload.single("file"), csvController.csvUpload);

  //POST /api/projectIDFromClient
  router.post("/projectIDFromClient", csvUpload.getProjectID);

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

  //POST /api/getTransfer
  router.post("/getTransfer", getTransfer.getTransfer)

  //PUT /api/updateMaterialSample
  router.put("/updateMaterialSample", updateMaterialSample.updateMaterialSample)

  //POST /api/getGermplasmViabilityTests
  router.post("/getGermplasmViabilityTests", getGerminationTrials.getGerminationTrials)

  //POST /api/getGermplasmViabilityTestByID
  router.post("/getGermplasmViabilityTestByID", getGerminationTrials.getGerminationTrialByID)

  //POST /api/searchMaterialSamples
  router.post("/searchMaterialSamples", searchMaterialSamples.searchMaterialSamples)

  //POST /api/searchMaterialSamplesForTransfer
  router.post("/searchMaterialSamplesForTransfer", searchMaterialSamplesForTransfer.searchMaterialSamplesForTransfer)
  
  //POST /api/searchMaterialSamplesForUpdate
  router.post("/searchMaterialSamplesForUpdate", searchMaterialSamplesForUpdate.searchMaterialSamplesForUpdate)

  //POST /api/exportSearchToCSV
  router.post("/exportSearchToCSV", searchMaterialSamples.exportSearchToCSV)

  //POST /api/getGerminationTrialResults
  router.post("/getGerminationTrialResults", getGerminationTrialResults.getGerminationTrialResults)

  //POST /api/exportGerminationTrialResults
  router.post("/exportGerminationTrialResults", getGerminationTrialResults.exportGerminationTrialResults)

  //GET /api/downloadGerminationTrialsFile
  router.get("/downloadGerminationTrialsFile/:name", getGerminationTrialResults.downloadGerminationTrialsFile);

  //GET /api/downloadSearchResultsFile
  router.get("/downloadSearchResultsFile/:name", searchMaterialSamples.downloadSearchResultsFile);

  app.use("/api", router);
};

module.exports = routes;