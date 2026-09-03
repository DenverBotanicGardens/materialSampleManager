const db = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const csv = require("fast-csv")

//standard query to return all records from transfers table. extra where params provided by user are added via named replacements
var materialSampleSelect = `SELECT p.id AS projectTableID, p.project, p.principalInvestigator, p.dbgContact, p.PIemail, o.id AS occurrenceTableID, o.occurrenceID, o.recordedBy, o.eventDate, o.scientificName, o.identifiedBy, o.dateIdentified, o.associatedTaxa, o.reproductiveCondition, o.occurrenceRemarks, o.habitat, o.country, o.stateProvince, o.county, o.locality, o.locationRemarks, o.locationID, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, ms.id AS materialSampleTableID, ms.materialSampleID, ms.materialSampleType, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, ps.id AS preservedSpecimenTableID, ps.catalogNumber, ps.recordNumber FROM occurrences AS o LEFT JOIN projects as p ON o.projectTableID = p.id LEFT JOIN materialSamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN preservedSpecimens as ps on o.id = ps.occurrenceTableID WHERE o.id IS NOT NULL`

//helper to safely check "does this field actually have a value"
const hasValue = (val) => val !== undefined && val !== null && val !== '';

//function to define query and get materialSamples and associated metadata
async function searchMaterialSamplesForUpdate(req, res) {
    let whereClauses = [];
    let replacements = {};

    //project
    if (hasValue(req.body.project)) {
        whereClauses.push(`AND p.project = :project`);
        replacements.project = req.body.project;
    }
    //scientificName
    if (hasValue(req.body.scientificName)) {
        whereClauses.push(`AND o.scientificName LIKE :scientificName`);
        replacements.scientificName = `%${req.body.scientificName}%`;
    }
    //materialSample_catalogNumber
    if (hasValue(req.body.materialSample_catalogNumber)) {
        whereClauses.push(`AND ms.materialSample_catalogNumber = :catalogNumber`);
        replacements.catalogNumber = req.body.materialSample_catalogNumber;
    }
    //materialSampleType
    if (hasValue(req.body.materialSampleType)) {
        whereClauses.push(`AND ms.materialSampleType = :materialSampleType`);
        replacements.materialSampleType = req.body.materialSampleType;
    }

    const finalQuery = materialSampleSelect.concat(' ', whereClauses.join(' '));
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

module.exports = {
    searchMaterialSamplesForUpdate
}