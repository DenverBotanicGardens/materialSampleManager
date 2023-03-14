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
    const result = await GermplasmViabilityTest.update({
        endDate : req.body.endDate,
        numberDead : req.body.numberDead,
        numberViable : req.body.numberViable,
        totalGerminants: req.body.totalGerminants,
        viabilityAdjustedGermination: calculateViabilityAdjustedGermination(req.body.totalGerminants,req.body.numberViable),
    },{
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