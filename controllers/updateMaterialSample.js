const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;


// //function to update a material sample.
async function updateMaterialSample(req,res) {
    //empty object into which user provided values will be added
    var set = {}
    //logic to include or not fields/values that will be updated
    if (req.body.disposition){
        set.disposition = req.body.disposition
      }
    if (req.body.storageLocation){
    set.storageLocation = req.body.storageLocation
    }
    if (req.body.numberAvailable){
        set.numberAvailable = req.body.numberAvailable
    }
    console.log(set)
      const result = await MaterialSample.update(set,{
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
        updateMaterialSample
  }