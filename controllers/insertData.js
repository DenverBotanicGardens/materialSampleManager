const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;

async function insertData(req, res) {
  try {
    const result = await Occurrence.bulkCreate(req.body, {
      include: [
        {
          model: MaterialSample
        },
        {
          model: PreservedSpecimen
        }
      ]
    });
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Could not insert data" });
  }
}

module.exports = {
  insertData
}