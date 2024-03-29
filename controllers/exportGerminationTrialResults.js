const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
var dataForExport

//empty array to populate with parameters that make up where clause
var germplasmTrialQuery = []
//standard query to return all records from germplasmviabilitytest table. extra where params provided by user are concatted to the end of this string
var germplasmTrialSelect = `SELECT
o.scientificName,
o.eventDate,
gvt.id,
gvt.materialSample_catalogNumber,
gvt.testConductedBy,
gvt.sampleFrozen,
gvt.medium,
gvt.scarified,
gvt.stratificationTemperature,
gvt.stratificationStartDate,
gvt.incubationStartDate,
gvt.endDate,
gvt.numberSeedsTested,
gvt.incubationTempDay,
gvt.incubationTempNight,
gvt.numberDead,
gvt.numberViable,
gvt.totalGerminants,
gvt.viabilityAdjustedGermination,
gvt.pretreatments,
vt.numberGerminants,
vt.date,
vt.notes,
ms.dateStored,
o.stateProvince ,
o.county,
o.locality,
o.locationRemarks,
o.recordedBy,
o.decimalLatitude,
o.decimalLongitude,
o.minimumElevationInMeters,
o.locationID,
o.reproductiveCondition,
o.identifiedBy,
o.dateIdentified,
o.occurrenceID,
ms.materialSample_recordNumber,
ms.numberCollected,
ms.numberAvailable,
ms.sourcePlantCount,
ms.preparationDate,
gvt.materialSampleID
FROM occurrences AS o LEFT JOIN materialsamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN germplasmviabilitytests AS gvt ON ms.id = gvt.materialSampleTableID LEFT JOIN viabilitytracking AS vt ON gvt.id = vt.germplasmViabilityTestID WHERE gvt.id IS NOT NULL`

//function to define query and get germination trials
async function getGerminationTrialResults(req, res) {
    for (const key in dataForExport) {
        delete dataForExport[key];
      }
    console.log(dataForExport)
    await new Promise(resolve => setTimeout(() => {
        //catalogNumber
        if (req.body.materialSample_catalogNumber !== '') {
            germplasmTrialQuery.push(` AND gvt.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }
        //scientificName
        if (req.body.scientificName !== '') {
            germplasmTrialQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        //stratificationStartDate
        if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate === '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate BETWEEN '${req.body.stratStartEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate BETWEEN '${req.body.stratStartEarlyDate}' AND '${req.body.stratStartLateDate}'`)
        }
        if (req.body.stratStartEarlyDate === '' && req.body.stratStartLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate BETWEEN '1900-01-01' AND '${req.body.stratStartLateDate}'`)
        }
        //endDate
        if (req.body.endEarlyDate !== '' && req.body.endLateDate === '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '${req.body.endEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.endEarlyDate !== '' && req.body.endLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '${req.body.endEarlyDate}' AND '${req.body.endLateDate}'`)
        }
        if (req.body.endEarlyDate === '' && req.body.endLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '1900-01-01' AND '${req.body.endLateDate}'`)
        }
        //eventDate
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '${req.body.eventLateDate}'`)
        }
        if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.eventLateDate}'`)
        }
        //stateProvince
        if (req.body.stateProvince !== ''){
            germplasmTrialQuery.push(` AND o.stateProvince = '${req.body.stateProvince}'`)
}
        //county
        if (req.body.county !== ''){
            germplasmTrialQuery.push(` AND o.county = '${req.body.county}'`)
        }
        //locality
        if (req.body.locality !== ''){
            germplasmTrialQuery.push(` AND o.locality LIKE '%${req.body.locality}%'`)
        }
        //locationRemarks
        if (req.body.locationRemarks !== ''){
            germplasmTrialQuery.push(` AND o.locationRemarks LIKE '%${req.body.locationRemarks}%'`)
        }
        //recordedBy
        if (req.body.recordedBy !== ''){
            germplasmTrialQuery.push(` AND o.recordedBy LIKE '%${req.body.recordedBy}%'`)
        }

        fullGermplasmTrialQuery = germplasmTrialQuery.join()
        queryParams = fullGermplasmTrialQuery.replaceAll(',','')
        finalQuery = germplasmTrialSelect.concat(queryParams)
        germplasmTrialQuery = []
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

//------------------------------------------------------------------------------
//EXPORTING DATA TO CSV

//function to write the data into a csv and then create the file in the resources dir
async function exportGerminationTrialResults(req, res) {
    //create the date object for the download file name
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
    let filename = `${date}_germinationTrialDataExport.csv`
    //set the path for the file
    const ws = fs.createWriteStream(`./resources/static/assets/downloads/${filename}`)
    await new Promise(resolve => setTimeout(() => {
        console.log(filename)
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
const downloadGerminationTrialsFile = (req, res) => {
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
    getGerminationTrialResults,
    exportGerminationTrialResults,
    downloadGerminationTrialsFile
}