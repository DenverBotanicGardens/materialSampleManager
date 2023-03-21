const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//empty array to populate with parameters that make up where clause
var seedQuery =[]
//standard query to return all seed records from materialSamples table. extra where params provided by user are concatted to the end of this string
var seedSelect = `SELECT ms.id, ms.materialSampleType, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.scientificName, o.eventDate, o.recordedBy, o.county, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, ps.catalogNumber FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN preservedSpecimens AS ps ON o.id = ps.occurrenceTableID WHERE ms.materialSampleType = 'seed'`

async function getSeedsForTrial(req, res) {
    await new Promise(resolve => setTimeout(() => {
        if (req.body.materialSample_catalogNumber !== '') {
            seedQuery.push(` AND ms.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }

        if (req.body.scientificName !== '') {
            seedQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }

        if (req.body.earlyDate !== '' && req.body.lateDate === '') {
            seedQuery.push(` AND .eventDate BETWEEN '${req.body.earlyDate}' AND '2300-01-01'`)
        }

        if (req.body.earlyDate !== '' && req.body.lateDate !== '') {
            seedQuery.push(` AND o.eventDate BETWEEN '${req.body.earlyDate}' AND '${req.body.lateDate}'`)
        }

        if (req.body.earlyDate === '' && req.body.lateDate !== '') {
            seedQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.lateDate}'`)
        }
        fullSeedQuery = seedQuery.join()
        queryParams = fullSeedQuery.replaceAll(',','')
        finalQuery = seedSelect.concat(queryParams)
        seedQuery = []
        resolve()
    },1000))
    console.log(finalQuery)
    sequelize.query(finalQuery, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
      })
}

module.exports = {
    getSeedsForTrial
  };
