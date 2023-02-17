const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;

async function insertData(req,res) {
  //use bulkCreate with include to insert the data
  const result = await Occurrence.bulkCreate(req.body, {
    include : [
      {
        model: MaterialSample
      },
      {
        model: PreservedSpecimen
      }
    ]
  })
  .then(() => {
    res.send()
  })
  .catch((err) => {
    console.log(err);
  })

}

module.exports = {
  insertData
}


