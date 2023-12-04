const db = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
var dataForExport

//empty array to populate with parameters that make up where clause
var materialSampleCollectionsQuery = []
//standard query to return all records from transfers table. extra where params provided by user are concatted to the end of this string
var materialSampleCollecitonsSelect = `SELECT p.id AS projectTableID, p.project, p.principalInvestigator, p.dbgContact, p.PIemail, o.id AS occurrenceTableID, o.occurrenceID, o.recordedBy, o.eventDate, o.scientificName, o.identifiedBy, o.dateIdentified, o.associatedTaxa, o.reproductiveCondition, o.occurrenceRemarks, o.habitat, o.country, o.stateProvince, o.county, o.locality, o.locationRemarks, o.locationID, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, ms.materialSampleType, ms.storageLocation, ms.disposition, SUM(ms.numberCollected) AS totalNumberCollected, SUM(ms.numberAvailable) AS totalNumberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, ps.id AS preservedSpecimenTableID, ps.catalogNumber, ps.recordNumber FROM occurrences AS o LEFT JOIN projects as p ON o.projectTableID = p.id LEFT JOIN materialSamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN preservedSpecimens as ps on o.id = ps.occurrenceTableID WHERE o.id IS NOT NULL`
//group by params
var groupBy = ` GROUP BY ms.materialSampleType, o.scientificName, o.eventDate, o.locality`


//function to define query and get materialSamples and associated metadata
async function searchCollections(req, res) {
    await new Promise(resolve => setTimeout(() => {
        //project
        if (req.body.project !== '') {
            materialSampleCollectionsQuery.push(` AND p.project = '${req.body.project}'`);
        }
        //scientificName
        if (req.body.scientificName !== '') {
            materialSampleCollectionsQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        //eventDate START DATE PROVIDED
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
            materialSampleCollectionsQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '2300-01-01'`)
        }
        //eventDate START DATE AND END DATE PROVIDED
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
            materialSampleCollectionsQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '${req.body.eventLateDate}'`)
        }
        //eventDate END DATE PROVIDED
        if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
            materialSampleCollectionsQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.eventLateDate}'`)
        }
        //stateProvince
        if (req.body.stateProvince !== ''){
            materialSampleCollectionsQuery.push(` AND o.stateProvince = '${req.body.stateProvince}'`)
        }
        //county
        if (req.body.county !== ''){
            materialSampleCollectionsQuery.push(` AND o.county = '${req.body.county}'`)
        }
        //locationID
        if (req.body.locationID !== ''){
            materialSampleCollectionsQuery.push(` AND o.locationID LIKE '%${req.body.locationID}%'`)
        }
        //locationRemarks
        if (req.body.locationRemarks !== ''){
            materialSampleCollectionsQuery.push(` AND o.locationRemarks LIKE '%${req.body.locationRemarks}%'`)
        }
        //recordedBy
        if (req.body.recordedBy !== ''){
            materialSampleCollectionsQuery.push(` AND o.recordedBy LIKE '%${req.body.recordedBy}%'`)
        }
        //recordNumber
        if (req.body.recordNumber !== ''){
            materialSampleCollectionsQuery.push(` AND ps.recordNumber LIKE '%${req.body.recordNumber}%'`)
        }
        //catalogNumber
        if (req.body.catalogNumber !== '') {
            materialSampleCollectionsQuery.push(` AND ps.catalogNumber = '${req.body.catalogNumber}'`);
        }
        //locality IS EXACTLY
        if (req.body.locality !== '' && req.body.optradio === 'isExactly'){
            materialSampleCollectionsQuery.push(` AND o.locality = '${req.body.locality}'`)
        }
        //locality STARTS WITH
        if (req.body.locality !== '' && req.body.optradio === 'startsWith'){
            materialSampleCollectionsQuery.push(` AND o.locality LIKE '${req.body.locality}%'`)
        }
        //locality CONTAINS
        if (req.body.locality !== '' && req.body.optradio === 'contains'){
            materialSampleCollectionsQuery.push(` AND o.locality LIKE '%${req.body.locality}%'`)
        }
        //materialSampleType
        if (req.body.materialSampleType !== ''){
            materialSampleCollectionsQuery.push(` AND ms.materialSampleType = '${req.body.materialSampleType}'`)
        }
        fullMaterialSampleCollectionsQuery = materialSampleCollectionsQuery.join()
        queryParams = fullMaterialSampleCollectionsQuery.replaceAll(',','') //this is a problem when there is a comma in the locality data
        collectionsQuery = materialSampleCollecitonsSelect.concat(queryParams)
        finalCollectionsQuery = collectionsQuery.concat(groupBy)
        materialSampleCollectionsQuery = []
        console.log(finalCollectionsQuery)
        resolve()
    },1000))
    sequelize.query(finalCollectionsQuery, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
      })
}

//------------------------------------------------------------------------------
//EXPORTING DATA TO CSV

//function to write the data into a csv and then create the file in the resources dir
async function exportSearchCollectionsToCSV(req, res) {
    //create the date object for the download file name
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
    let filename = `${date}_collectionsSearchDataExport.csv`
    //set the path for the file
    const ws = fs.createWriteStream(`./resources/static/assets/downloads/${filename}`)
    await new Promise(resolve => setTimeout(() => {
        //console.log(dataForExport)
        csv.write(dataForExport, { headers: true })
        .pipe(ws)
        .on("finish", function(){
            console.log("CSV successfully created")
        })
        resolve()
    },1000))
    .then((data) => {
        res.send(filename)
    })
    .catch((err) => {
        console.log(err);
      })
}

//download the specified file
const downloadSearchCollectionsResultsFile = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/downloads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file" + err,
        })
      }
    })
  }

module.exports = {
    searchCollections,
    exportSearchCollectionsToCSV,
    downloadSearchCollectionsResultsFile
}