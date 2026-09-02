const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//standard query to return all seed records from materialSamples table. extra where params provided by user are added via named replacements
var seedSelect = `SELECT ms.id, ms.materialSampleType, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.scientificName, o.eventDate, o.recordedBy, o.county, o.stateProvince, o.county, o.locality, o.locationID, o.locationRemarks, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, ps.catalogNumber FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN preservedSpecimens AS ps ON o.id = ps.occurrenceTableID WHERE ms.materialSampleType = 'seed' `

async function getSeedsForTrial(req, res) {
    let whereClauses = [];
    let replacements = {};

    if (req.body.materialSample_catalogNumber !== '') {
        whereClauses.push(`AND ms.materialSample_catalogNumber = :catalogNumber`);
        replacements.catalogNumber = req.body.materialSample_catalogNumber;
    }

    if (req.body.scientificName !== '') {
        whereClauses.push(`AND o.scientificName LIKE :scientificName`);
        replacements.scientificName = `%${req.body.scientificName}%`;
    }

    if (req.body.earlyDate !== '' && req.body.lateDate === '') {
        whereClauses.push(`AND o.eventDate BETWEEN :earlyDate AND '2300-01-01'`);
        replacements.earlyDate = req.body.earlyDate;
    }

    if (req.body.earlyDate !== '' && req.body.lateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN :earlyDate AND :lateDate`);
        replacements.earlyDate = req.body.earlyDate;
        replacements.lateDate = req.body.lateDate;
    }

    if (req.body.earlyDate === '' && req.body.lateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN '1900-01-01' AND :lateDate`);
        replacements.lateDate = req.body.lateDate;
    }

    const finalQuery = seedSelect
        .concat(whereClauses.join(' '))
        .concat(' ORDER BY o.scientificName, o.eventDate');

    console.log("FINAL QUERY " + finalQuery, replacements)

    sequelize.query(finalQuery, { replacements, type: QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
      })
}

module.exports = {
    getSeedsForTrial
  };