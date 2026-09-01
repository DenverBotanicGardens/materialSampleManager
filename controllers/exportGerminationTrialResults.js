const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const path = require("path")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
var dataForExport

//standard query to return all records from germplasmviabilitytest table. extra where params provided by user are appended via named replacements
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

    let whereClauses = [];
    let replacements = {};

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
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
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
    const fileName = path.basename(req.params.name); // strips any ../ or path separators
    const directoryPath = path.join(__basedir, "/resources/static/assets/downloads/");
    const filePath = path.join(directoryPath, fileName);

    // extra safety: confirm resolved path is still inside the intended directory
    if (!filePath.startsWith(path.resolve(directoryPath))) {
        return res.status(400).send({ message: "Invalid file name" });
    }

    res.download(filePath, fileName, (err) => {
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