const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest;
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//standard query to return all records from germplasmviabilitytest table. extra where params provided by user are added via named replacements
var germplasmTrialSelect = `SELECT gvt.id,gvt.materialSample_catalogNumber,gvt.stratificationStartDate,gvt.endDate,gvt.testConductedBy,gvt.sampleFrozen,gvt.medium,gvt.scarified,gvt.stratificationTemperature,gvt.incubationStartDate,gvt.numberSeedsTested,gvt.incubationTempDay,gvt.incubationTempNight,gvt.numberDead,gvt.numberViable,gvt.totalGerminants,gvt.viabilityAdjustedGermination,o.scientificName,o.eventDate,o.stateProvince,o.county,o.locality,o.locationRemarks,o.locationID,o.recordedBy FROM occurrences AS o LEFT JOIN projects AS p ON o.projectTableID = p.id LEFT JOIN materialsamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN germplasmviabilitytests AS gvt ON ms.id = gvt.materialSampleTableID WHERE gvt.id IS NOT NULL`
//query to return record from germplasmviabilitytest based on id
var germplasmTrialSelectByID = `SELECT gvt.id,gvt.materialSample_catalogNumber,gvt.stratificationStartDate,gvt.endDate,gvt.testConductedBy,gvt.sampleFrozen,gvt.medium,gvt.scarified,gvt.stratificationTemperature,gvt.incubationStartDate,gvt.numberSeedsTested,gvt.incubationTempDay,gvt.incubationTempNight,gvt.numberDead,gvt.numberViable,gvt.totalGerminants,gvt.viabilityAdjustedGermination,o.scientificName,o.eventDate,o.stateProvince,o.county,o.locality,o.locationRemarks,o.locationID,o.recordedBy FROM occurrences AS o LEFT JOIN materialsamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN germplasmviabilitytests AS gvt ON ms.id = gvt.materialSampleTableID `

//function to define query and get germination trials
async function getGerminationTrials(req, res) {
    let whereClauses = [];
    let replacements = {};

    //project
    if (req.body.project !== '') {
        whereClauses.push(`AND p.project = :project`);
        replacements.project = req.body.project;
    }
    //catalogNumber
    if (req.body.materialSample_catalogNumber !== '') {
        whereClauses.push(`AND gvt.materialSample_catalogNumber = :catalogNumber`);
        replacements.catalogNumber = req.body.materialSample_catalogNumber;
    }
    //scientificName
    if (req.body.scientificName !== '') {
        whereClauses.push(`AND o.scientificName LIKE :scientificName`);
        replacements.scientificName = `%${req.body.scientificName}%`;
    }
    //stratificationStartDate
    if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate === '') {
        whereClauses.push(`AND gvt.stratificationStartDate BETWEEN :stratStartEarlyDate AND '2300-01-01'`);
        replacements.stratStartEarlyDate = req.body.stratStartEarlyDate;
    }
    if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate !== '') {
        whereClauses.push(`AND gvt.stratificationStartDate BETWEEN :stratStartEarlyDate AND :stratStartLateDate`);
        replacements.stratStartEarlyDate = req.body.stratStartEarlyDate;
        replacements.stratStartLateDate = req.body.stratStartLateDate;
    }
    if (req.body.stratStartEarlyDate === '' && req.body.stratStartLateDate !== '') {
        whereClauses.push(`AND gvt.stratificationStartDate BETWEEN '1900-01-01' AND :stratStartLateDate`);
        replacements.stratStartLateDate = req.body.stratStartLateDate;
    }
    //endDate
    if (req.body.endEarlyDate !== '' && req.body.endLateDate === '') {
        whereClauses.push(`AND gvt.endDate BETWEEN :endEarlyDate AND '2300-01-01'`);
        replacements.endEarlyDate = req.body.endEarlyDate;
    }
    if (req.body.endEarlyDate !== '' && req.body.endLateDate !== '') {
        whereClauses.push(`AND gvt.endDate BETWEEN :endEarlyDate AND :endLateDate`);
        replacements.endEarlyDate = req.body.endEarlyDate;
        replacements.endLateDate = req.body.endLateDate;
    }
    if (req.body.endEarlyDate === '' && req.body.endLateDate !== '') {
        whereClauses.push(`AND gvt.endDate BETWEEN '1900-01-01' AND :endLateDate`);
        replacements.endLateDate = req.body.endLateDate;
    }
    //eventDate
    if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
        whereClauses.push(`AND o.eventDate BETWEEN :eventEarlyDate AND '2300-01-01'`);
        replacements.eventEarlyDate = req.body.eventEarlyDate;
    }
    if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN :eventEarlyDate AND :eventLateDate`);
        replacements.eventEarlyDate = req.body.eventEarlyDate;
        replacements.eventLateDate = req.body.eventLateDate;
    }
    if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN '1900-01-01' AND :eventLateDate`);
        replacements.eventLateDate = req.body.eventLateDate;
    }
    //stateProvince
    if (req.body.stateProvince !== '') {
        whereClauses.push(`AND o.stateProvince = :stateProvince`);
        replacements.stateProvince = req.body.stateProvince;
    }
    //county
    if (req.body.county !== '') {
        whereClauses.push(`AND o.county = :county`);
        replacements.county = req.body.county;
    }
    //locality
    if (req.body.locality !== '') {
        whereClauses.push(`AND o.locality LIKE :locality`);
        replacements.locality = `%${req.body.locality}%`;
    }
    //locationRemarks
    if (req.body.locationRemarks !== '') {
        whereClauses.push(`AND o.locationRemarks LIKE :locationRemarks`);
        replacements.locationRemarks = `%${req.body.locationRemarks}%`;
    }
    //locationID
    if (req.body.locationID !== '') {
        whereClauses.push(`AND o.locationID LIKE :locationID`);
        replacements.locationID = `%${req.body.locationID}%`;
    }
    //recordedBy
    if (req.body.recordedBy !== '') {
        whereClauses.push(`AND o.recordedBy LIKE :recordedBy`);
        replacements.recordedBy = `%${req.body.recordedBy}%`;
    }

    const finalQuery = germplasmTrialSelect.concat(' ', whereClauses.join(' '));
    console.log(finalQuery, replacements)

    sequelize.query(finalQuery, { replacements, type: QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
      })
}

//function to get one germination trial by id
async function getGerminationTrialByID(req, res) {
    if (!req.body.id) {
        return res.status(400).send({ message: "id is required" });
    }

    const finalQueryByID = germplasmTrialSelectByID.concat(' WHERE gvt.id = :id');

    sequelize.query(finalQueryByID, { replacements: { id: req.body.id }, type: QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
      })
}

module.exports = {
    getGerminationTrials,
    getGerminationTrialByID
}