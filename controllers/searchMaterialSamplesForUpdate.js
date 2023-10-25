const db = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
// var dataForExport

//empty array to populate with parameters that make up where clause
var materialSampleQuery = []
//standard query to return all records from transfers table. extra where params provided by user are concatted to the end of this string
var materialSampleSelect = `SELECT p.id AS projectTableID, p.project, p.principalInvestigator, p.dbgContact, p.PIemail, o.id AS occurrenceTableID, o.occurrenceID, o.recordedBy, o.eventDate, o.scientificName, o.identifiedBy, o.dateIdentified, o.associatedTaxa, o.reproductiveCondition, o.occurrenceRemarks, o.habitat, o.country, o.stateProvince, o.county, o.locality, o.locationRemarks, o.locationID, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, ms.id AS materialSampleTableID, ms.materialSampleID, ms.materialSampleType, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, ps.id AS preservedSpecimenTableID, ps.catalogNumber, ps.recordNumber FROM occurrences AS o LEFT JOIN projects as p ON o.projectTableID = p.id LEFT JOIN materialSamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN preservedSpecimens as ps on o.id = ps.occurrenceTableID WHERE o.id IS NOT NULL`

//function to define query and get materialSamples and associated metadata
async function searchMaterialSamplesForUpdate(req, res) {
    await new Promise(resolve => setTimeout(() => {
        //project
        if (req.body.project !== '') {
            materialSampleQuery.push(` AND p.project = '${req.body.project}'`);
        }
        //scientificName
        if (req.body.scientificName !== '') {
            materialSampleQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        //materialSample_catalogNumber
        if (req.body.materialSample_catalogNumber !== '') {
            materialSampleQuery.push(` AND ms.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }
        //materialSampleType
        if (req.body.materialSampleType !== ''){
            materialSampleQuery.push(` AND ms.materialSampleType = '${req.body.materialSampleType}'`)
        }
        fullMaterialSampleQuery = materialSampleQuery.join()
        queryParams = fullMaterialSampleQuery.replaceAll(',','')
        finalQuery = materialSampleSelect.concat(queryParams)
        materialSampleQuery = []
        console.log(finalQuery)
        resolve()
    },1000))
    sequelize.query(finalQuery, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
      })
}

module.exports = {
    searchMaterialSamplesForUpdate
}