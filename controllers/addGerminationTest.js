const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest 
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

async function addGerminationTest(req,res) {
    const result = await GermplasmViabilityTest.create({
        materialSample_catalogNumber : req.body.materialSample_catalogNumber,
        testConductedBy : req.body.testConductedBy,
        sampleFrozen : req.body.sampleFrozen,
        medium: req.body.medium,
        scarified: req.body.scarified,
        stratificationTemperature: req.body.stratificationTemperature,
        stratificationStartDate : req.body.stratificationStartDate,
        incubationStartDate : req.body.incubationStartDate,
        numberSeedsTested : req.body.numberSeedsTested,
        incubationTempDay : req.body.incubationTempDay,
        incubationTempNight : req.body.incubationTempNight,
        pretreatments: req.body.pretreatments,
        materialSampleTableID : req.body.materialSampleTableID
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
  
  module.exports = {
    addGerminationTest
}