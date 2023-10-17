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
async function searchMaterialSamplesForTransfer(req, res) {
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
            materialSampleQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '${req.body.eventLateDate}'`)
        }
        //eventDate END DATE PROVIDED
        if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
            materialSampleQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.eventLateDate}'`)
        }
        //stateProvince
        if (req.body.stateProvince !== ''){
            materialSampleQuery.push(` AND o.stateProvince = '${req.body.stateProvince}'`)
        }
        //county
        if (req.body.county !== ''){
            materialSampleQuery.push(` AND o.county = '${req.body.county}'`)
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

// //------------------------------------------------------------------------------
// //EXPORTING DATA TO CSV

// //function to write the data into a csv and then create the file in the resources dir
// async function exportSearchToCSV(req, res) {
//     //create the date object for the download file name
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
//     //set the path for the file
//     const ws = fs.createWriteStream(`./resources/static/assets/downloads/${date}_materialSampleSearchDataExport.csv`)
//     await new Promise(resolve => setTimeout(() => {
//         console.log(dataForExport)
//         csv.write(dataForExport, { headers: true })
//         .pipe(ws)
//         .on("finish", function(){
//             console.log("CSV successfully created")
//         })
//         resolve()
//     },1000))
//     .then((data) => {
//         res.send(data)
//     })
//     .catch((err) => {
//         console.log(err);
//       })
// }

module.exports = {
    searchMaterialSamplesForTransfer,
    // exportSearchToCSV
}