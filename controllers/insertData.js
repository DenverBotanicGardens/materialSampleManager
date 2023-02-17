const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;

async function insertData(req,res) {
  //create some data
  // const data = [
  //   {
  //     recordedBy: "Rick Levy",
  //     materialSamples:
  //       {
  //         materialSampleType: "tissue",
  //         numberCollected: 2
  //       }
  //   },
  //   {
  //     recordedBy: "Shawn Cohen",
  //     materialSamples:
  //     {
  //       materialSampleType: "seed",
  //       numberCollected: 72
  //     }
  //   }
  // ]
  //use bulkCreate with include to insert the data
  const result = await Occurrence.bulkCreate(req.body, {
    include : [
      {
        model: MaterialSample
      }
    ]
  })
  .then(() => {
    //console.log(data)
    res.send()
  })
  .catch((err) => {
    console.log(err);
  })

}

module.exports = {
  insertData
}


