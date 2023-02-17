const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;

async function insertData() {
  //create some data
  const data = [
    {
      recordedBy: "Rick Levy",
      MaterialSample:
        {
          materialSampleType: "tissue",
          numberCollected: 2
        }
    },
    {
      recordedBy: "Shawn Cohen",
      MaterialSample:
      {
        materialSampleType: "seed",
        numberCollected: 72
      }
    }
  ]

  //use bulkCreate with include to insert the data
  const result = await Occurrence.bulkCreate(data, {
    include : [
      {
        model: MaterialSample
      }
    ]
  })

}

module.exports = {
  insertData
}


