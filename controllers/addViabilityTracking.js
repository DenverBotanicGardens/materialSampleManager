const db = require("../models");
const ViabilityTracking = db.viabilityTracking 
const Sequelize = require("sequelize");
const { sequelize } = require("../models");


async function addViabilityTracking(req,res) {
    const result = await ViabilityTracking.create({
        numberGerminants : req.body.numberGerminants,
        date : req.body.date,
        notes : req.body.notes,
        germplasmViabilityTestID : req.body.germplasmViabilityTestID
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
  
  module.exports = {
    addViabilityTracking
}