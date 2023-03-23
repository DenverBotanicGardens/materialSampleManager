const db = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;



//empty array to populate with parameters that make up where clause
var materialSampleQuery = []
//standard query to return all records from transfers table. extra where params provided by user are concatted to the end of this string
var materialSampleSelect = `SELECT p.id AS projectTableID, p.project, p.principalInvestigator, p.dbgContact, p.PIemail, o.id AS occurrenceTableID, o.occurrenceID, o.recordedBy, o.eventDate, o.scientificName, o.identifiedBy, o.dateIdentified, o.associatedTaxa, o.reproductiveCondition, o.occurrenceRemarks, o.habitat, o.country, o.stateProvince, o.county, o.locality, o.locationRemarks, o.locationID, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, ms.id AS materialSampleTableID, ms.materialSampleID, ms.materialSampleType, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, ps.id AS preservedSpecimenTableID, ps.catalogNumber, ps.recordNumber FROM occurrences AS o LEFT JOIN projects as p ON o.projectTableID = p.id LEFT JOIN materialSamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN preservedSpecimens as ps on o.id = ps.occurrenceTableID WHERE o.id IS NOT NULL`

//function to define query and get materialSamples and associated metadata
async function searchMaterialSamples(req, res) {
    await new Promise(resolve => setTimeout(() => {
        //project
        if (req.body.project !== '') {
            materialSampleQuery.push(` AND p.project = '${req.body.project}'`);
        }
        //scientificName
        if (req.body.scientificName !== '') {
            materialSampleQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        //eventDate START DATE PROVIDED
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
            materialSampleQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '2300-01-01'`)
        }
        //eventDate START DATE AND END DATE PROVIDED
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
            materialSampleQuery.push(` AND o.eventDate '${req.body.eventEarlyDate}' AND '${req.body.eventLateDate}'`)
        }
        //eventDate END DATE PROVIDED
        if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
            materialSampleQuery.push(` AND o.eventDate '1900-01-01' AND '${req.body.eventLateDate}'`)
        }
        //stateProvince
        if (req.body.stateProvince !== ''){
            materialSampleQuery.push(` AND o.stateProvince = '${req.body.stateProvince}'`)
        }
        //county
        if (req.body.county !== ''){
            materialSampleQuery.push(` AND o.county = '${req.body.county}'`)
        }
        //locationID
        if (req.body.locationID !== ''){
            materialSampleQuery.push(` AND o.locationID LIKE '%${req.body.locationID}%'`)
        }
        //locationRemarks
        if (req.body.locationRemarks !== ''){
            materialSampleQuery.push(` AND o.locationRemarks LIKE '%${req.body.locationRemarks}%'`)
        }
        //recordedBy
        if (req.body.recordedBy !== ''){
            materialSampleQuery.push(` AND o.recordedBy LIKE '%${req.body.recordedBy}%'`)
        }
        //materialSample_recordNumber
        if (req.body.materialSample_recordNumber !== ''){
            materialSampleQuery.push(` AND ms.materialSample_recordNumber LIKE '%${req.body.materialSample_recordNumber}%'`)
        }
        //materialSample_catalogNumber
        if (req.body.materialSample_catalogNumber !== '') {
            materialSampleQuery.push(` AND ms.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }
        //recordNumber
        if (req.body.recordNumber !== ''){
            materialSampleQuery.push(` AND ps.recordNumber LIKE '%${req.body.recordNumber}%'`)
        }
        //catalogNumber
        if (req.body.catalogNumber !== '') {
            materialSampleQuery.push(` AND ps.catalogNumber = '${req.body.catalogNumber}'`);
        }
        //locality IS EXACTLY
        if (req.body.locality !== '' && req.body.optradio === 'isExactly'){
            materialSampleQuery.push(` AND o.locality = '${req.body.locality}'`)
        }
        //locality STARTS WITH
        if (req.body.locality !== '' && req.body.optradio === 'startsWith'){
            materialSampleQuery.push(` AND o.locality LIKE '${req.body.locality}%'`)
        }
        //locality CONTAINS
        if (req.body.locality !== '' && req.body.optradio === 'contains'){
            materialSampleQuery.push(` AND o.locality LIKE '%${req.body.locality}%'`)
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
    })
    .catch((err) => {
        console.log(err);
      })
}

module.exports = {
    searchMaterialSamples
}