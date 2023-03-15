const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest 
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

const calculateViabilityAdjustedGermination = (numberGerminants, numberViable) => {
  return (numberGerminants / numberViable) * 100
}

async function finishGerminationTest(req,res) {
  var set = {}
  if (req.body.endDate){
    set.endDate = req.body.endDate
  }
  if (req.body.numberDead){
    set.numberDead = req.body.numberDead
  }
  if (req.body.numberViable){
    set.numberViable = req.body.numberViable
  }
  if (req.body.totalGerminants){
    set.totalGerminants = req.body.totalGerminants
  }
  if (req.body.totalGerminants && req.body.numberViable){
    set.viabilityAdjustedGermination = calculateViabilityAdjustedGermination(req.body.totalGerminants,req.body.numberViable)
  }
  console.log(set)
    const result = await GermplasmViabilityTest.update(set,{
        where: {
            id: req.body.id
        }
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
  
  module.exports = {
    finishGerminationTest
}