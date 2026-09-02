const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest 
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

const calculateViabilityAdjustedGermination = (numberGerminants, numberViable) => {
  const germinants = Number(numberGerminants);
  const viable = Number(numberViable);

  if (!viable) {
    // no viable seeds to divide by — avoid NaN from 0/0 or division by zero
    return 0;
  }

  return (germinants / viable) * 100;
}

async function finishGerminationTest(req, res) {
  var set = {}
  if (req.body.endDate) {
    set.endDate = req.body.endDate
  }
  if (req.body.numberDead) {
    set.numberDead = req.body.numberDead
  }
  if (req.body.numberViable !== undefined && req.body.numberViable !== '') {
    set.numberViable = req.body.numberViable
  }
  if (req.body.totalGerminants !== undefined && req.body.totalGerminants !== '') {
    set.totalGerminants = req.body.totalGerminants
  }
  if (set.totalGerminants !== undefined && set.numberViable !== undefined) {
    set.viabilityAdjustedGermination = calculateViabilityAdjustedGermination(set.totalGerminants, set.numberViable)
  }
  console.log(set)

  try {
    const result = await GermplasmViabilityTest.update(set, {
      where: {
        id: req.body.id
      }
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Could not finish germination test" });
  }
}

module.exports = {
  finishGerminationTest
}